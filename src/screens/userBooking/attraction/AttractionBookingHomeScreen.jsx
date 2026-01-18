/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  useColorScheme,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ThemedView from "@/utils/ThemedView";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { goBack } from "@/utils/NavigationService";
import GoBack from "@/components/GoBack";
// import Feather from 'react-native-vector-icons/Feather';
import { Controller, useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import Button from "@/components/Button";
import { useThemeColor } from "@/utils/useThemeColor";
import ThemedText from "@/utils/ThemedText";
import useT from "@/utils/useT";
import { useGetAllAttractionByCountryQuery } from "@/redux/slices/userSlice/attractionSlice";
import { useDebounce } from "use-debounce";
import GlobalLoading from "@/components/GlobalLoading";
import GlobalError from "@/components/GlobalError";
import GlobalNoData from "@/components/GlobalNoData";
import { Search } from "lucide-react-native";

const AttractionBookingHomeScreen = () => {
  const theme = useColorScheme();
  const { control, watch } = useFormContext();
  const navigation = useNavigation();
  const { icon3 } = useThemeColor();
  const t = useT();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  // ✅ Initialize as empty array instead of empty state
  // const [allAttractionByCountry, setAllAttractionByCountry] = useState([]);

  const searchTerm = watch("searchTermAttraction") || "";
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const {
    data: attractionsByCountry,
    isLoading: attractionLoading,
    isError: attractionError,
    isFetching: isFetchingMore,
  } = useGetAllAttractionByCountryQuery(
    { page, searchTerm: debouncedSearchTerm },
    {
      refetchOnMountOrArgChange: true,
    }
  );

 

  const loadMoreAttraction = () => {
    const totalAttraction = attractionsByCountry?.data?.meta?.total ?? 0;
    if (
      !isFetchingMore &&
      attractionsByCountry?.data?.data?.length < totalAttraction
    ) {
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

  // ✅ Safe data transformation with null checks
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
            {/* <Feather name="map-pin" size={12} color="gray" /> */}
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

  console.log("LINE AT 403", attractionsByCountry?.data?.data);



  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(5),
        gap: responsiveHeight(3),
      }}
    >
      {/* Top section (not scrollable) */}
      <View style={{ height: responsiveHeight(25), gap: responsiveHeight(3) }}>
        <GoBack navigationRef={goBack} />

        <ThemedView
          styles="relative p-1 rounded-md"
          style={{
            shadowColor: "#a1a1aa",
            shadowOffset: { width: 0, height: 8 },
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
            name="searchTermAttraction"
            defaultValue=""
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={{
                  paddingLeft: 40,
                  color: theme === "dark" ? "#f4f4f4" : "#000000",
                }}
                placeholder={"Searching.."}
                // placeholder={t('search')}
                placeholderTextColor={theme === "dark" ? "#f4f4f4" : "#000000"}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </ThemedView>

        <Button
          title={t("search")}
          noicon={true}
          navigation={navigation}
          path={"UserAttractionBookingAvailable"}
        />
      </View>

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
          </View>
        }
      />
    </ThemedView>
  );
};

export default AttractionBookingHomeScreen;
