/* eslint-disable react-native/no-inline-styles */
import {
  View,
  // Text,
  FlatList,
  useColorScheme,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
// import Entypo from 'react-native-vector-icons/Entypo';
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import ThemedText from "@/utils/ThemedText";
import ThemedTextColor from "@/utils/ThemedTextColor";
import { useGetProviderAttractionQuery } from "@/redux/slices/providerSlice/attractionSlice";
import ActiveAttractionBusinessCard from "@/components/ActiveAttractionBusinessCard";
import GlobalNoData from "@/components/GlobalNoData";
import GlobalLoading from "@/components/GlobalLoading";
import GlobalError from "@/components/GlobalError";

const ProviderAttractionListingScreen = () => {
  const navigation = useNavigation();
  const theme = useColorScheme();
  const [page, setPage] = useState(1);
  const [allAttractions, setAllAttractions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: attractionsData,
    isLoading: attractionsLoading,
    isFetching: isFetchingMore,
    isError: attractionsError,
    refetch,
  } = useGetProviderAttractionQuery(
    { page },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // Merge unique attractions by ID
  useEffect(() => {
    if (attractionsData?.data?.data) {
      setAllAttractions((prevAttractions) => {
        if (page === 1) {
          return attractionsData.data.data;
        } else {
          const existingIds = new Set(prevAttractions.map((h) => h.id));
          const newAttractions = attractionsData.data.data.filter(
            (h) => !existingIds.has(h.id)
          );
          return [...prevAttractions, ...newAttractions];
        }
      });
      if (refreshing) setRefreshing(false);
    }
  }, [attractionsData, page, refreshing]);

  const loadMoreAttractions = () => {
    const totalAttractions = attractionsData?.data?.meta?.total ?? 0;
    if (!isFetchingMore && allAttractions.length < totalAttractions) {
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

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(5),
        gap: responsiveHeight(5),
      }}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row gap-8 items-center">
          <GoBack navigation={navigation} />
          <ThemedText styles="text-lg font-SemiBold">All Business</ThemedText>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate("Active Listings", {
              screen: "ProviderCreateAttactionBusiness",
            })
          }
          className="flex-row gap-2 items-center"
        >
          {/* <Entypo
            name="plus"
            size={20}
            color={theme === 'dark' ? '#1d4ed8' : '#2563eb'}
          /> */}
          <ThemedTextColor styles="text-lg font-SemiBold">
            Add Business
          </ThemedTextColor>
        </Pressable>
      </View>
      <FlatList
        data={allAttractions}
        renderItem={({ item }) => (
          <ActiveAttractionBusinessCard
            key={item.id}
            item={item}
            name={"selectedActiveListingAttraction"}
            navigation={navigation}
            screen="ProviderAttractionEditBusiness"
            path="Dashboard"
            pathListing="ProviderAttractionDashboardAllListing"
          />
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(2),
          gap: responsiveHeight(2),
        }}
        onEndReached={loadMoreAttractions}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View>
            {attractionsLoading && <GlobalLoading />}

            {/* Inline error */}
            {attractionsError && <GlobalError refetch={refetch} />}

            {/* Inline empty state */}
            {!attractionsLoading &&
              !attractionsError &&
              !attractionsData?.data?.length && <GlobalNoData />}
          </View>
        }
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </ThemedView>
  );
};

export default ProviderAttractionListingScreen;
