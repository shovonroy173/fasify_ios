/* eslint-disable react-native/no-inline-styles */
import {
  View,
  ActivityIndicator,
  TextInput,
  useColorScheme,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ThemedView from "@/utils/ThemedView";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import GoBack from "@/components/GoBack";
import Button from "@/components/Button";
import { FlatList } from "react-native";
import AvailableCar from "@/components/AvailableCar";
import useT from "@/utils/useT";
import { Controller, useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { useGetAllCarQuery } from "@/redux/slices/userSlice/carBookingSlice";

// import Feather from 'react-native-vector-icons/Feather';
import { useThemeColor } from "@/utils/useThemeColor";
import GlobalLoading from "@/components/GlobalLoading";
import GlobalError from "@/components/GlobalError";
import GlobalNoData from "@/components/GlobalNoData";
import DateRangeSelectorWithModal from "@/components/DateRangeSelectorWithModal";
import { Search } from "lucide-react-native";

const CarBookingHomeScreen = () => {
  const navigation = useNavigation();
  const t = useT();
  const { icon3 } = useThemeColor();
  const theme = useColorScheme();

  const { watch, control,  setValue } = useFormContext();
  const [page, setPage] = useState(1);
  const [allCars, setAllCars] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Watch all search parameters including dates
  const searchTerm = watch("searchTermCar") || "";
  const carBookedFromDate = watch("carBookedFromDate");
  const carBookedToDate = watch("carBookedToDate");

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  console.log("LINE AT 50", carBookedFromDate, carBookedToDate);

  // Create search params object - only include filters that have values
  const searchParams = useMemo(() => {
    const params = {
      page: page.toString(),
      limit: "10",
    };

    // Only include searchTerm if it has meaningful content
    if (debouncedSearchTerm.trim() !== "") {
      params.searchTerm = debouncedSearchTerm.trim();
    }

    // Only include dates if they are selected
    if (carBookedFromDate) {
      params.fromDate = carBookedFromDate;
    }
    if (carBookedToDate) {
      params.toDate = carBookedToDate;
    }

    return params;
  }, [debouncedSearchTerm, carBookedFromDate, carBookedToDate, page]);

  const {
    data: carsData,
    isLoading: carsLoading,
    isFetching: isFetchingMore,
    isError: carsError,
    refetch,
  } = useGetAllCarQuery(searchParams, {
    refetchOnMountOrArgChange: true,
  });

  // Merge unique cars by ID
  useEffect(() => {
    if (carsData?.data?.data) {
      setAllCars((prevCars) => {
        if (page === 1) {
          return carsData?.data?.data;
        } else {
          const existingIds = new Set(prevCars.map((h) => h.id));
          const newCars = carsData?.data?.data.filter(
            (h) => !existingIds.has(h.id)
          );
          return [...prevCars, ...newCars];
        }
      });
      if (refreshing) setRefreshing(false);
    }
  }, [carsData, page, refreshing]);

  // Reset to page 1 when search params change (excluding page changes)
  useEffect(() => {
    setPage(1);
    setAllCars([]);
  }, [debouncedSearchTerm, carBookedFromDate, carBookedToDate]);

  const loadMoreCars = () => {
    const totalCars = carsData?.data?.meta?.total ?? 0;
    // console.log('LINE AT 79', totalcars);

    if (!isFetchingMore && allCars.length < totalCars) {
      setPage((prev) => prev + 1);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    refetch();
  }, [refetch]);

  useEffect(() => {
    // Reset the form to clear all fields

    setValue("carBookedFromDate", null);
    setValue("carBookedToDate", null);
    setValue("searchTermCar", "");
  }, []);

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  };

  console.log("allCars", allCars);

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(3),
      }}
    >
      {/* Map Image */}

      {/* Location Input (Positioned at Top) */}

      <GoBack navigation={navigation} />
      {/* <LocationSearchInput /> */}

      <FlatList
        data={allCars}
        renderItem={({ item }) => (
          <AvailableCar
            key={item.id}
            item={item}
            name="selectedCar"
            navigation={navigation}
            path="UserCarDetail"
          />
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: responsiveHeight(2),
        }}
        onEndReached={loadMoreCars}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <View className="gap-2">
            <ThemedView
              styles="relative p-1  rounded-md"
              style={{
                shadowColor: "#a1a1aa", // neutral-400 gray shadow
                shadowOffset: {
                  width: 0,
                  height: 8, // more vertical offset
                },
                shadowOpacity: 0.4, // slightly more visible
                shadowRadius: 10, // more blur/spread

                // Android shadow
                elevation: 12, // stronger elevation
              }}
            >
              <Search
                // name="search"
                size={22}
                color={icon3}
                style={{ position: "absolute", left: 10, top: 12 }}
              />
              <Controller
                control={control}
                name="searchTermCar"
                defaultValue="" // optional, ensures controlled input
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    style={{
                      paddingLeft: 40,
                      color: theme === "dark" ? "#f4f4f4" : "#000000",
                    }}
                    // placeholder={t('search')}
                    placeholder={"Searching.."}
                    placeholderTextColor={
                      theme === "dark" ? "#f4f4f4" : "#000000"
                    }
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </ThemedView>

            <DateRangeSelectorWithModal
              fromName="carBookedFromDate"
              toName="carBookedToDate"
            />

            <Button
              title={t("search")}
              navigation={navigation}
              path="UserCarAvailable"
              noicon={true}
            />
          </View>
        }
        ListEmptyComponent={
          <View>
            {carsLoading && <GlobalLoading />}

            {carsError && <GlobalError refetch={refetch} />}

            {!carsLoading && !carsError && !allCars?.length && <GlobalNoData />}
          </View>
        }
      />
    </ThemedView>
  );
};

export default CarBookingHomeScreen;
