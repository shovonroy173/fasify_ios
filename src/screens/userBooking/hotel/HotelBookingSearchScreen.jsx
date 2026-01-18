/* eslint-disable react-native/no-inline-styles */

import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import ThemedView from "@/utils/ThemedView";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import { hotelBusinessTypes, localities, sortOptions } from "assets/data/data";
import ThemedText from "@/utils/ThemedText";
import ThemedText4 from "@/utils/ThemeText4";
import GoBackTitle2 from "@/components/GoBackTitle2";
import { useFormContext, useWatch } from "react-hook-form";
import { useGetAllHotelsQuery } from "@/redux/slices/userSlice/hotelbookingSlice";
import Destination from "@/components/Destination";
import { useDebounce } from "use-debounce";
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Feather from 'react-native-vector-icons/Feather';
import { useThemeColor } from "@/utils/useThemeColor";
import { ChevronDown, ChevronUp } from "lucide-react-native";

const HotelBookingSearchScreen = () => {
  const navigation = useNavigation();
  const { getValues, setValue, control } = useFormContext();
  const { icon3 } = useThemeColor();

  // Watch search term and all filter values
  const searchTerm = useWatch({ control, name: "searchTerm" });
  const formSort = useWatch({ control, name: "userSortOptions" });
  const formLocality = useWatch({ control, name: "userSearchLocalities" });
  const formPrice = useWatch({ control, name: "userSearchPrice" });
  const formCategory = useWatch({ control, name: "userSearchCategory" });
  const fromDate = useWatch({ control, name: "bookedFromDate" });
  const toDate = useWatch({ control, name: "bookedToDate" });
  const rooms = useWatch({ control, name: "rooms" }) || 0;
  const adults = useWatch({ control, name: "adults" }) || 0;
  const children = useWatch({ control, name: "children" }) || 0;

  // Debounce all filter values using use-debounce package
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [debouncedSort] = useDebounce(formSort, 500);
  const [debouncedLocality] = useDebounce(formLocality, 500);
  const [debouncedPrice] = useDebounce(formPrice, 500);
  const [debouncedCategory] = useDebounce(formCategory, 500);

  const [page, setPage] = useState(1);
  const [allHotels, setAllHotels] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    sort: false,
    locality: false,
    price: false,
    category: false,
  });

  // Enhanced sort options with price sorting
  const enhancedSortOptions = useMemo(
    () => [
      ...sortOptions,
      { label: "Price: Low to High", value: "price_asc" }, // ✅ Fixed
      { label: "Price: High to Low", value: "price_desc" }, // ✅ Fixed
    ],
    [sortOptions]
  ); // ✅ Added dependency

  // Check if any filter is active
  const hasActiveFilters = useMemo(() => {
    return (
      debouncedSearch?.trim() !== "" ||
      debouncedSort ||
      debouncedLocality ||
      debouncedPrice ||
      debouncedCategory ||
      fromDate ||
      toDate ||
      rooms > 0 ||
      adults > 0 ||
      children > 0
    );
  }, [
    debouncedSearch,
    debouncedSort,
    debouncedLocality,
    debouncedPrice,
    debouncedCategory,
    fromDate,
    toDate,
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

  // Prepare query arguments with all debounced filters
  const queryArgs = useMemo(() => {
    const params = {
      page: page.toString(),
      limit: "10",
    };

    // Only include searchTerm if it has meaningful content
    if (debouncedSearch?.trim() !== "") {
      params.searchTerm = debouncedSearch?.trim();
    }

    // Handle different sort types - FIXED LOGIC
    if (debouncedSort) {
      if (debouncedSort === "price_asc" || debouncedSort === "price_desc") {
        // Price sorting
        params.sortBy = "price";
        params.sortOrder = debouncedSort === "price_asc" ? "asc" : "desc";
      } else if (debouncedSort === "asc" || debouncedSort === "desc") {
        // Name sorting (existing functionality)
        params.sortBy = "hotelBusinessName";
        params.sortOrder = debouncedSort;
      }
      // Add more sort types here if needed
    }

    // Only include filter values if they are selected
    if (debouncedLocality) {
      params.hotelCity = debouncedLocality;
    }
    if (debouncedPrice) {
      params.userSearchPrice = debouncedPrice;
    }
    if (debouncedCategory) {
      params.hotelBusinessType = debouncedCategory;
    }

    // Only include dates if they are selected
    if (fromDate) {
      params.fromDate = fromDate;
    }
    if (toDate) {
      params.toDate = toDate;
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
    debouncedSearch,
    debouncedSort,
    debouncedLocality,
    debouncedPrice,
    debouncedCategory,
    fromDate,
    toDate,
    rooms,
    adults,
    children,
    page,
  ]);

  // console.log('LINE AT 165', queryArgs);

  const {
    data: hotelsData,
    isLoading: hotelsLoading,
    isFetching: isFetchingMore,
    // isError: hotelsError,
    refetch,
  } = useGetAllHotelsQuery(queryArgs, {
    // refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (hotelsData?.data?.data) {
      setAllHotels((prevHotels) => {
        if (page === 1) {
          return hotelsData.data.data;
        } else {
          const existingIds = new Set(prevHotels.map((h) => h.id));
          const newHotels = hotelsData.data.data.filter(
            (h) => !existingIds.has(h.id)
          );
          return [...prevHotels, ...newHotels];
        }
      });
      if (refreshing) setRefreshing(false);
    }
  }, [hotelsData, page, refreshing]);

  // Reset to page 1 when any filter changes
  useEffect(() => {
    setPage(1);
    setAllHotels([]);
  }, [
    debouncedSearch,
    debouncedSort,
    debouncedLocality,
    debouncedPrice,
    debouncedCategory,
    fromDate,
    toDate,
    rooms,
    adults,
    children,
  ]);

  const loadMoreHotels = () => {
    const totalHotels = hotelsData?.data?.meta?.total ?? 0;
    if (!isFetchingMore && allHotels.length < totalHotels) {
      setPage((prev) => prev + 1);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    refetch();
  }, [refetch]);

  const clearFilters = () => {
    // Clear all form values
    setValue("userSortOptions", "");
    setValue("userSearchLocalities", "");
    setValue("userSearchPrice", "");
    setValue("userSearchCategory", "");
    setValue("searchTerm", "");
    setValue("fromDate", null);
    setValue("toDate", null);
    setValue("rooms", 0);
    setValue("adults", 0);
    setValue("children", 0);

    // Refresh data
    setPage(1);
    setRefreshing(true);
    setShowFilters(false);
  };

  const updateFilter = (type, value) => {
    setValue(type, value === getValues(type) ? "" : value);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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
    if (hotelsLoading || isFetchingMore) {
      return null; // Don't show empty state while loading
    }

    if (hasSearchTermsButNoResults) {
      return (
        <View style={{ alignItems: "center", paddingVertical: 40, flex: 1 }}>
          {/* <Feather name="search" size={48} color={icon3} /> */}
          <ThemedText styles="text-lg mt-3 text-center">
            No hotels found matching your criteria
          </ThemedText>
          <ThemedText styles="text-sm mt-2 text-center opacity-70">
            Try adjusting your search filters
          </ThemedText>
          <TouchableOpacity
            onPress={clearFilters}
            style={{
              marginTop: 16,
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: "#3b82f6",
              borderRadius: 8,
            }}
          >
            <ThemedText style={{ color: "white" }}>
              Clear All Filters
            </ThemedText>
          </TouchableOpacity>
        </View>
      );
    }

    if (allHotels.length === 0) {
      return (
        <View style={{ alignItems: "center", paddingVertical: 40 }}>
          <ThemedText styles="text-lg">Loading hotels...</ThemedText>
        </View>
      );
    }

    return null;
  };

  const getActiveFilterLabel = (type, value) => {
    if (!value) return "";

    switch (type) {
      case "userSortOptions":
        return enhancedSortOptions.find((o) => o.value === value)?.label || "";
      case "userSearchLocalities":
        return localities.find((l) => l.value === value)?.label || "";
      case "userSearchCategory":
        return hotelBusinessTypes.find((c) => c.value === value)?.label || "";
      default:
        return "";
    }
  };

  const renderFilters = () => {
    if (!showFilters) return null;

    return (
      <ThemedView
        styles={{
          padding: 16,
          borderRadius: 12,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <ThemedText style={{ fontSize: 20, fontWeight: "bold" }}>
            Filters
          </ThemedText>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            {/* <Icon name="close" size={24} color="#6b7280" /> */}
          </TouchableOpacity>
        </View>

        {/* Sort Filter */}
        <View style={{ marginBottom: 16 }}>
          <TouchableOpacity
            onPress={() => toggleSection("sort")}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <ThemedText style={{ fontWeight: "600", fontSize: 16 }}>
              Sort By
            </ThemedText>
            {/* {expandedSections.sort ? (
              <Icon name="keyboard-arrow-up" size={24} color="#6b7280" />
            ) : (
              <Icon name="keyboard-arrow-down" size={24} color="#6b7280" />
            )} */}
          </TouchableOpacity>

          {expandedSections.sort && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {enhancedSortOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => updateFilter("userSortOptions", option.value)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    backgroundColor:
                      formSort === option.value ? "#3b82f6" : "#f3f4f6",
                  }}
                >
                  <ThemedText
                    style={{
                      color: formSort === option.value ? "white" : "#4b5563",
                      fontSize: 14,
                    }}
                  >
                    {option.label}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Locality Filter */}
        <View style={{ marginBottom: 16 }}>
          <TouchableOpacity
            onPress={() => toggleSection("locality")}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <ThemedText style={{ fontWeight: "600", fontSize: 16 }}>
              Locality
            </ThemedText>
            {/* {expandedSections.locality ? (
              <Icon name="keyboard-arrow-up" size={24} color="#6b7280" />
            ) : (
              <Icon name="keyboard-arrow-down" size={24} color="#6b7280" />
            )} */}
          </TouchableOpacity>

          {expandedSections.locality && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {localities.map((locality) => (
                <TouchableOpacity
                  key={locality.label}
                  onPress={() =>
                    updateFilter("userSearchLocalities", locality.label)
                  }
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    backgroundColor:
                      formLocality === locality.label ? "#3b82f6" : "#f3f4f6",
                  }}
                >
                  <ThemedText
                    style={{
                      color:
                        formLocality === locality.label ? "white" : "#4b5563",
                      fontSize: 14,
                    }}
                  >
                    {locality.label}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Category Filter */}
        <View style={{ marginBottom: 24 }}>
          <TouchableOpacity
            onPress={() => toggleSection("category")}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <ThemedText style={{ fontWeight: "600", fontSize: 16 }}>
              Categories
            </ThemedText>
            {/* {expandedSections.category ? (
              <Icon name="keyboard-arrow-up" size={24} color="#6b7280" />
            ) : (
              <Icon name="keyboard-arrow-down" size={24} color="#6b7280" />
            )} */}
          </TouchableOpacity>

          {expandedSections.category && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {hotelBusinessTypes.map((category) => (
                <TouchableOpacity
                  key={category.value}
                  onPress={() =>
                    updateFilter("userSearchCategory", category.value)
                  }
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    backgroundColor:
                      formCategory === category.value ? "#3b82f6" : "#f3f4f6",
                  }}
                >
                  <ThemedText
                    style={{
                      color:
                        formCategory === category.value ? "white" : "#4b5563",
                      fontSize: 14,
                    }}
                  >
                    {category.label}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Filter Actions */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <TouchableOpacity
            onPress={clearFilters}
            style={{
              flex: 1,
              paddingVertical: 12,
              borderRadius: 8,
              backgroundColor: "#f3f4f6",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {/* <Icon name="clear" size={18} color="#4b5563" /> */}
            <ThemedText style={{ color: "#4b5563", fontWeight: "600" }}>
              Clear All
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowFilters(false)}
            style={{
              flex: 1,
              paddingVertical: 12,
              borderRadius: 8,
              backgroundColor: "#3b82f6",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {/* <Icon name="check" size={18} color="white" /> */}
            <ThemedText style={{ color: "white", fontWeight: "600" }}>
              Apply Filters
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  };

  // Get current filter values from form
  const currentFilters = {
    sort: formSort,
    locality: formLocality,
    price: formPrice,
    category: formCategory,
  };

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(3),
      }}
    >
      <GoBackTitle2 navigation={navigation} title="Search Results" />

      {/* Date Display */}

      {/* Active Filters Summary */}
      {!showFilters && hasActiveFilters && (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {Object.entries(currentFilters).map(([key, value]) => {
            if (!value) return null;

            const filterLabel = getActiveFilterLabel(
              key === "sort"
                ? "userSortOptions"
                : key === "locality"
                  ? "userSearchLocalities"
                  : key === "price"
                    ? "userSearchPrice"
                    : "userSearchCategory",
              value || key
            );

            if (!filterLabel) return null;

            return (
              <View
                key={key}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                  backgroundColor: "#dbeafe",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <ThemedText style={{ color: "#1e40af", fontSize: 12 }}>
                  {key}: {filterLabel}
                </ThemedText>
                <TouchableOpacity
                  onPress={() =>
                    updateFilter(
                      key === "sort"
                        ? "userSortOptions"
                        : key === "locality"
                          ? "userSearchLocalities"
                          : key === "price"
                            ? "userSearchPrice"
                            : "userSearchCategory",
                      ""
                    )
                  }
                >
                  {/* <Icon name="close" size={14} color="#1e40af" /> */}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}

      {/* Hotels List */}
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
            search={true}
          />
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(2),
          gap: responsiveHeight(2),
          flexGrow: 1,
        }}
        onEndReached={loadMoreHotels}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <View
            style={{
              gap: responsiveHeight(3),
            }}
          >
            {(fromDate || toDate) && (
              <View className="gap-2">
                <View className="bg-zinc-200 dark:bg-zinc-400 rounded-full px-6 py-3 flex-row gap-4 self-start">
                  <ThemedText>Date</ThemedText>
                  <ThemedText4>{`${fromDate || ""} - ${toDate || ""}`}</ThemedText4>
                </View>
              </View>
            )}

            {/* Search Term Display */}
            {debouncedSearch && (
              <View className="gap-2">
                <View className="bg-blue-100 dark:bg-blue-200 rounded-full px-6 py-3 flex-row gap-4 self-start">
                  <ThemedText>Searching for:</ThemedText>
                  <ThemedText4>{debouncedSearch}</ThemedText4>
                </View>
              </View>
            )}

            {/* Guest Count Display */}
            {(rooms > 0 || adults > 0 || children > 0) && (
              <View className="gap-2">
                <View className="bg-green-100 dark:bg-green-200 rounded-full px-6 py-3 flex-row gap-4 self-start">
                  <ThemedText>Guests:</ThemedText>
                  <ThemedText4>
                    {rooms > 0 ? `${rooms} Room${rooms > 1 ? "s" : ""}` : ""}
                    {adults > 0
                      ? ` ${adults} Adult${adults > 1 ? "s" : ""}`
                      : ""}
                    {children > 0
                      ? ` ${children} Child${children > 1 ? "ren" : ""}`
                      : ""}
                  </ThemedText4>
                </View>
              </View>
            )}

            {/* Filter Toggle Button */}
            <TouchableOpacity
              onPress={() => setShowFilters(!showFilters)}
              style={{
                padding: 12,
                backgroundColor: "#3b82f6",
                borderRadius: 8,
                alignSelf: "flex-start",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <ThemedText style={{ color: "white" }}>
                {showFilters ? "Hide Filters" : "Show Filters"}
              </ThemedText>
              {showFilters ? (
                <ChevronUp size={18} color="white" />
              ) : (
                <ChevronDown size={18} color="white" />
              )}
            </TouchableOpacity>

            {renderFilters()}
          </View>
        }
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={renderEmptyComponent()}
      />
    </ThemedView>
  );
};

export default HotelBookingSearchScreen;
