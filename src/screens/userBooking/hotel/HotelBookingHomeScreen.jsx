/* eslint-disable react-native/no-inline-styles */

import {
  View,
  Text,
  TextInput,
  useColorScheme,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import { useNavigation } from "@react-navigation/native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
// import Feather from 'react-native-vector-icons/Feather';
import { useThemeColor } from "@/utils/useThemeColor";
import { goBack } from "@/utils/NavigationService";
import DateRangeSelectorWithModal from "@/components/DateRangeSelectorWithModal";
import Destination from "@/components/Destination";
import ThemedText from "@/utils/ThemedText";
import useT from "@/utils/useT";
import CounterInput from "@/components/ControllerInput";
import CustomCounterInput from "@/components/CustomControllerInput";
import { Controller, useFormContext } from "react-hook-form";
import {
  useGetAllHotelsQuery,
  useGetPopularHotelsQuery,
} from "@/redux/slices/userSlice/hotelbookingSlice";
import { useDebounce } from "use-debounce";
import Button from "@/components/Button";
import { Search } from "lucide-react-native";

const HotelBookingHomeScreen = () => {
  const navigation = useNavigation();
  const { icon3 } = useThemeColor();
  const theme = useColorScheme();
  const t = useT();

  const { control, watch, reset, setValue } = useFormContext();

  const [page, setPage] = useState(1);
  const [allHotels, setAllHotels] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Watch all search parameters
  const searchTerm = watch("searchTerm") || "";
  const bookedFromDate = watch("bookedFromDate");
  const bookedToDate = watch("bookedToDate");
  const rooms = watch("rooms") || 0;
  const adults = watch("adults") || 0;
  const children = watch("children") || 0;

  // Debounce only the search term
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // Check if any filter is active (excluding pagination)
  const hasActiveFilters = useMemo(() => {
    return (
      debouncedSearchTerm.trim() !== "" ||
      bookedFromDate !== null ||
      bookedToDate !== null ||
      rooms > 0 ||
      adults > 0 ||
      children > 0
    );
  }, [
    debouncedSearchTerm,
    bookedFromDate,
    bookedToDate,
    rooms,
    adults,
    children,
  ]);

  // Check if we have search terms but no results
  const hasSearchTermsButNoResults = useMemo(() => {
    return (
      hasActiveFilters &&
      allHotels.length === 0 &&
      !hotelsLoading &&
      !isFetchingMore
    );
  }, [hasActiveFilters, allHotels.length, hotelsLoading, isFetchingMore]);

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
    if (bookedFromDate) {
      params.fromDate = bookedFromDate;
    }
    if (bookedToDate) {
      params.toDate = bookedToDate;
    }

    // Only include room/guest counts if they are greater than 0
    if (rooms > 0) {
      params.hotelNumberOfRooms = rooms.toString();
    }
    if (adults > 0) {
      params.hotelNumAdults = adults.toString();
    }
    if (children > 0) {
      params.hotelNumChildren = children.toString();
    }

    return params;
  }, [
    debouncedSearchTerm,
    bookedFromDate,
    bookedToDate,
    rooms,
    adults,
    children,
    page,
  ]);

  const {
    data: hotelsData,
    isLoading: hotelsLoading,
    isFetching: isFetchingMore,
    isError: hotelsError,
    error,
    refetch,
  } = useGetAllHotelsQuery(searchParams, {
    // refetchOnMountOrArgChange: true,
  });

  console.log("LINE AT 140", hotelsData);

  // Merge unique hotels by ID - FIXED: added proper dependency array
  useEffect(() => {
    if (hotelsData?.data?.data) {
      setAllHotels((prevHotels) => {
        if (page === 1) {
          // Reset for first page
          setHasMore(hotelsData.data.data.length === 10); // Assuming limit is 10
          return hotelsData.data.data;
        } else {
          // Append for subsequent pages
          const existingIds = new Set(prevHotels.map((h) => h.id));
          const newHotels = hotelsData.data.data.filter(
            (h) => !existingIds.has(h.id)
          );

          // Update hasMore based on whether we got a full page
          setHasMore(newHotels.length === 10);

          return [...prevHotels, ...newHotels];
        }
      });

      if (refreshing) {
        setRefreshing(false);
      }
    }
  }, [hotelsData, page, refreshing]); // FIXED: added refreshing to dependencies

  // Reset to page 1 when search params change (excluding page changes)
  useEffect(() => {
    setPage(1);
    setAllHotels([]);
    setHasMore(true);
  }, [
    debouncedSearchTerm,
    bookedFromDate,
    bookedToDate,
    rooms,
    adults,
    children,
  ]);

  useEffect(() => {
    // Reset the form to clear all fields

    setValue("bookedFromDate", null);
    setValue("bookedToDate", null);
    setValue("searchTerm", "");
  }, []);

  const loadMoreHotels = () => {
    // Prevent multiple calls and check if there's more data
    if (!isFetchingMore && hasMore && allHotels.length > 0) {
      setPage((prev) => prev + 1);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    // The refetch will happen automatically due to page change
  }, []);

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  };

  const {
    data: popularHotelsData,
    // isLoading: popularHotelsLoading,
    // isError: popularHotelsError,
  } = useGetPopularHotelsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Render empty component based on different states
  const renderEmptyComponent = () => {
    if (hotelsLoading && page === 1) {
      return (
        <View style={{ alignItems: "center", paddingVertical: 40 }}>
          <ActivityIndicator color="blue" size="large" />
          <ThemedText styles="text-lg mt-3">
            {t("hotelBookingHome.loadingHotels") || "Loading hotels..."}
          </ThemedText>
        </View>
      );
    }

    if (hotelsError) {
      return (
        <View style={{ alignItems: "center", paddingVertical: 40 }}>
          {/* <Feather name="alert-circle" size={48} color={icon3} /> */}
          <ThemedText styles="text-lg mt-3 text-center">
            Error loading hotels
          </ThemedText>
          <ThemedText styles="text-sm mt-2 text-center opacity-70">
            Please try again
          </ThemedText>
        </View>
      );
    }

    if (hasSearchTermsButNoResults) {
      return (
        <View style={{ alignItems: "center", paddingVertical: 40 }}>
          {/* <Feather name="search" size={48} color={icon3} /> */}
          <ThemedText styles="text-lg mt-3 text-center">
            {"No hotels found"}
          </ThemedText>
          <ThemedText styles="text-sm mt-2 text-center opacity-70">
            {"Try adjusting your search criteria"}
          </ThemedText>
        </View>
      );
    }

    if (allHotels.length === 0 && !hotelsLoading) {
      return (
        <View style={{ alignItems: "center", paddingVertical: 40 }}>
          <ThemedText styles="text-lg">No hotels available</ThemedText>
        </View>
      );
    }

    return null;
  };

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(2),
      }}
    >
      <View className="mb-3">
        <GoBack navigationRef={goBack} />
      </View>

      <FlatList
        data={allHotels}
        renderItem={({ item }) => (
          <Destination
            key={item.id}
            item={item}
            name={"selectedHotel"}
            navigation={navigation}
            path="UserHotelBooking"
            screen="UserHotelHotelDetail"
            normal={true}
          />
        )}
        keyExtractor={(item, index) => `${item.id}_${index}`} // Improved key extractor
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(2),
          gap: responsiveHeight(2),
          flexGrow: 1,
        }}
        onEndReached={loadMoreHotels}
        onEndReachedThreshold={0.3} // Slightly reduced threshold for better UX
        ListHeaderComponent={
          <View style={{ gap: responsiveHeight(2) }}>
            <ThemedView
              styles="relative p-1 rounded-md"
              style={{
                shadowColor: "#a1a1aa",
                shadowOffset: {
                  width: 0,
                  height: 8,
                },
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 12,
              }}
            >
              {/* <Feather
                name="search"
                size={24}
                color={icon3}
                style={{ position: 'absolute', left: 10, top: 10 }}
              /> */}
              <Search
                size={24}
                color={icon3}
                style={{ position: "absolute", left: 10, top: 10 }}
              />
              <Controller
                control={control}
                name="searchTerm"
                defaultValue=""
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    style={{
                      paddingLeft: 40,
                      color: theme === "dark" ? "#f4f4f4" : "#000000",
                    }}
                    // placeholder={t('search')}
                    placeholder="Searching.."
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
              fromName="bookedFromDate"
              toName="bookedToDate"
            />

            {/* <CounterInput
              control={control}
              name="rooms"
              label={t('hotelBooking.rooms')}
            /> */}
            <CustomCounterInput
              control={control}
              name="rooms"
              label={t("hotelBooking.rooms")}
              min={1}
            />

            {/* <CounterInput
              control={control}
              name="adults"
              label={t('attractionBooking.adults')}
            /> */}
            <CustomCounterInput
              control={control}
              name="adults"
              label={t("attractionBooking.adults")}
              min={2}
            />
            <CounterInput
              control={control}
              name="children"
              label={t("attractionBooking.children")}
            />

            <Button
              title="Search"
              noicon={true}
              navigation={navigation}
              path="UserHotelSearch"
            />

            <View className="gap-3">
              <View className="flex-row justify-between items-center">
                <ThemedText styles="font-Bold text-md">
                  {t("hotelBookingHome.popularHotels")}
                </ThemedText>

                <Pressable
                  onPress={() =>
                    navigation.navigate("UserHotelAllHotel", "Popular Hotels")
                  }
                  className="flex-row"
                >
                  <Text className="text-yellow-600">
                    {t("hotelBookingHome.seeAll")}
                  </Text>
                  {/* <Feather name="chevron-right" size={18} color={'#ca8a04'} /> */}
                </Pressable>
              </View>

              <FlatList
                data={popularHotelsData?.data}
                horizontal
                renderItem={({ item }) => (
                  <Destination
                    key={item.id}
                    item={item}
                    name={"selectedHotel"}
                    navigation={navigation}
                    path="UserHotelBooking"
                    screen="UserHotelHotelDetail"
                    popular={true}
                  />
                )}
                keyExtractor={(item, index) => `${item.id}_${index}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: responsiveWidth(4),
                  paddingRight: responsiveWidth(6),
                }}
              />
            </View>
            <ThemedText styles="font-Bold text-md">
              {t("hotelBookingHome.hotels")}
            </ThemedText>
          </View>
        }
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={renderEmptyComponent}
      />
    </ThemedView>
  );
};

export default HotelBookingHomeScreen;
