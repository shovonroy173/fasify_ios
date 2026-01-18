/* eslint-disable react-native/no-inline-styles */
import {
  View,
  ActivityIndicator,
  FlatList,
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
import useT from "@/utils/useT";
import { useGetAllSecurityQuery } from "@/redux/slices/userSlice/securityBookingSlice";
import SingleSecurityBooking from "@/components/SingleSecurityBooking";
// import Feather from 'react-native-vector-icons/Feather';
import { useThemeColor } from "@/utils/useThemeColor";
import { Controller, useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";
import GlobalLoading from "@/components/GlobalLoading";
import GlobalError from "@/components/GlobalError";
import GlobalNoData from "@/components/GlobalNoData";
import DateRangeSelectorWithModal from "@/components/DateRangeSelectorWithModal";
import { Search } from "lucide-react-native";

const SecurityBookingMapScreen = () => {
  const navigation = useNavigation();
  const t = useT();
  const { icon3 } = useThemeColor();
  const { control, watch, setValue } = useFormContext();
  const theme = useColorScheme();

  const [page, setPage] = useState(1);
  const [allSecurity, setAllSecurity] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Watch all search parameters including dates
  const searchTerm = watch("searchTermSecurity") || "";
  const bookedFromDate = watch("securityBookedFromDate");
  const bookedToDate = watch("securityBookedToDate");

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // Check if any filter is active (excluding pagination)
  const hasActiveFilters = useMemo(() => {
    return (
      debouncedSearchTerm.trim() !== "" ||
      bookedFromDate !== null ||
      bookedToDate !== null
    );
  }, [debouncedSearchTerm, bookedFromDate, bookedToDate]);

  // Check if we have search terms but no results
  const hasSearchTermsButNoResults = useMemo(() => {
    return (
      hasActiveFilters &&
      allSecurity.length === 0 &&
      !securityLoading &&
      !isFetchingMore
    );
  }, [hasActiveFilters, allSecurity.length, securityLoading, isFetchingMore]);

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

    return params;
  }, [debouncedSearchTerm, bookedFromDate, bookedToDate, page]);

  const {
    data: securityData,
    isLoading: securityLoading,
    isFetching: isFetchingMore,
    isError: securityError,
    refetch,
  } = useGetAllSecurityQuery(searchParams, {
    refetchOnMountOrArgChange: true,
  });

  // console.log('LINE AT 57', allSecurity, page, searchParams, bookedFromDate, bookedToDate);

  // Merge unique Security by ID
  useEffect(() => {
    if (securityData?.data?.data) {
      setAllSecurity((prevSecurity) => {
        if (page === 1) {
          return securityData?.data?.data;
        } else {
          const existingIds = new Set(prevSecurity.map((h) => h.id));
          const newSecurity = securityData?.data?.data.filter(
            (h) => !existingIds.has(h.id)
          );
          return [...prevSecurity, ...newSecurity];
        }
      });
      if (refreshing) setRefreshing(false);
    }
  }, [securityData, page, refreshing]);

  // Reset to page 1 when search params change (excluding page changes)
  useEffect(() => {
    setPage(1);
    setAllSecurity([]);
  }, [debouncedSearchTerm, bookedFromDate, bookedToDate]);

  const loadMoreSecurity = () => {
    const totalSecurity = securityData?.data?.meta?.total ?? 0;
    console.log("LINE AT 79", totalSecurity, allSecurity?.length);

    if (!isFetchingMore && allSecurity?.length < totalSecurity) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    // Reset the form to clear all fields

    setValue("bookedFromDate", null);
    setValue("bookedToDate", null);
    setValue("searchTermSecurity", "");
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    refetch();
  }, [refetch]);

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  };

  // Render empty component based on different states
  const renderEmptyComponent = () => {
    if (securityLoading || isFetchingMore) {
      return <GlobalLoading />;
    }

    if (securityError) {
      return <GlobalError refetch={refetch} />;
    }

    if (hasSearchTermsButNoResults) {
      return (
        <View style={{ alignItems: "center", paddingVertical: 40 }}>
          {/* <Feather name="search" size={48} color={icon3} /> */}
          <GlobalNoData
            title={
              t("securityBooking.noResults") || "No security services found"
            }
            message={
              t("securityBooking.tryDifferentSearch") ||
              "Try adjusting your search criteria"
            }
          />
        </View>
      );
    }

    if (!securityLoading && !securityError && !allSecurity?.length) {
      return <GlobalNoData />;
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
      <GoBack navigation={navigation} />

      <FlatList
        data={allSecurity}
        renderItem={({ item }) => (
          <SingleSecurityBooking
            key={item.id}
            booking={item}
            name="selectedSecurity"
            path="UserSingleSecurity"
          />
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(2),
          gap: responsiveHeight(2),
          flexGrow: 1, // Ensure empty state is properly centered
        }}
        onEndReached={loadMoreSecurity}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <View className="gap-2">
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
                name="searchTermSecurity"
                defaultValue=""
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

            {/* <DateRangeSelectorWithModal
              fromName="bookedFromDate"
              toName="bookedToDate"
            /> */}
            <DateRangeSelectorWithModal
              fromName="securityBookedFromDate"
              toName="securityBookedToDate"
            />
            <Button
              title={t("search")}
              navigation={navigation}
              path="UserSecurityHome"
              noicon={true}
            />
          </View>
        }
        ListEmptyComponent={renderEmptyComponent}
      />
    </ThemedView>
  );
};

export default SecurityBookingMapScreen;
