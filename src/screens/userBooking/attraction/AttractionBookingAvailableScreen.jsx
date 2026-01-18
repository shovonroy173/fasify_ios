import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Controller, useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { useGetAllAttractionByCountryQuery } from "@/redux/slices/userSlice/attractionSlice";
import GlobalLoading from "@/components/GlobalLoading";
import GlobalError from "@/components/GlobalError";
import GlobalNoData from "@/components/GlobalNoData";
import { useThemeColor } from "@/utils/useThemeColor";
import ThemedText from "@/utils/ThemedText";
import { goBack } from "@/utils/NavigationService";

const AttractionBookingAvailableScreen = () => {
  const theme = useColorScheme();
  const { control, watch } = useFormContext();
  const navigation = useNavigation();
  const { icon3 } = useThemeColor();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const searchTerm = watch("searchTermAttraction") || "";
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const {
    data: attractionsByCountry,
    isLoading: attractionLoading,
    isError: attractionError,
    isFetching: isFetchingMore,
  } = useGetAllAttractionByCountryQuery(
    { page, searchTerm: debouncedSearchTerm },
    { refetchOnMountOrArgChange: true }
  );

  const loadMoreAttraction = () => {
    const totalAttraction = attractionsByCountry?.data?.meta?.total ?? 0;
    if (!isFetchingMore && attractionsByCountry?.data?.data?.length < totalAttraction) {
      setPage((prev) => prev + 1);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
  }, []);

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  };

  // Safe data transformation
  const flatListData = useCallback(() => {
    if (!attractionsByCountry?.data?.data) {
      return [];
    }
    return Object.keys(attractionsByCountry?.data?.data).map((key) => ({
      key,
      length: Array.isArray(attractionsByCountry?.data?.data[key])
        ? attractionsByCountry?.data?.data[key].length
        : 0,
      items: Array.isArray(attractionsByCountry?.data?.data[key])
        ? attractionsByCountry?.data?.data[key]
        : [],
    }));
  }, [attractionsByCountry]);

  const renderItem = ({ item }) => (
    <Pressable
      className="w-[48%] rounded-lg overflow-hidden"
      style={{
        shadowColor: "#a1a1aa",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 12,
      }}
      onPress={() =>
        navigation.navigate("UserAttractionAllTicket", { item: item?.items })
      }
    >
      <ThemedView>
        <Image
          source={{ uri: item?.items?.[0]?.attractionImages?.[0] }}
          className="w-full h-24"
          resizeMode="cover"
        />
        <View className="p-2">
          <View className="flex-row items-center gap-1">
            <ThemedText styles="text-sm font-Medium">{item.key}</ThemedText>
          </View>
          <Text className="text-xs text-gray-500">
            {item.length} things to do
          </Text>
        </View>
      </ThemedView>
    </Pressable>
  );

  const currentFlatListData = flatListData();

  // Handle no results found case
  const renderNoResults = () => {
    if (debouncedSearchTerm && currentFlatListData.length === 0) {
      return (
        <View className="flex-1 justify-center items-center">
          <Text className="text-center text-gray-500">No results found</Text>
        </View>
      );
    }
    // Display message when searchTerm is empty
    if (!debouncedSearchTerm && currentFlatListData.length === 0) {
      return (
        <View className="flex-1 justify-center items-center">
          <Text className="text-center text-gray-500">Enter a search term</Text>
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
        paddingTop: responsiveHeight(5),
        gap: responsiveHeight(3),
      }}
    >
      {/* Top section */}
      <GoBack navigationRef={goBack} />

      <FlatList
        data={currentFlatListData}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
        onEndReached={loadMoreAttraction}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <View>
            {attractionLoading && <GlobalLoading />}
            {attractionError && <GlobalError />}
            {!attractionLoading &&
              !attractionError &&
              currentFlatListData.length === 0 && <GlobalNoData />}
            {renderNoResults()}
          </View>
        }
      />
    </ThemedView>
  );
};

export default AttractionBookingAvailableScreen;
