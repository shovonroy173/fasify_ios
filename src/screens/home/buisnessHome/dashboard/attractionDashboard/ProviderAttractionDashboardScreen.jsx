/* eslint-disable react-native/no-inline-styles */
import {
  View,
  // Text,
  Image,
  useColorScheme,
  Pressable,
  FlatList,
  // ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { useThemeColor } from "@/utils/useThemeColor";
import { useNavigation } from "@react-navigation/native";
// import { useFormContext } from 'react-hook-form';
import ThemedView from "@/utils/ThemedView";
import ThemedText from "@/utils/ThemedText";
import SalesChart from "@/components/DefaultBar";
// import ProviderAttactionTicketCard from '@/components/ProviderAttactionTicketCard';
import ThemedViewLightBlue from "@/utils/ThemedViewLightBlue";
import {

  useGetAllStaticsAttractionQuery,
  useGetProviderProfileQuery,
} from "@/redux/slices/authSlice";
import { useGetProviderAttractionQuery } from "@/redux/slices/providerSlice/attractionSlice";
import ActiveAttractionBusinessCard from "@/components/ActiveAttractionBusinessCard";
import { Bell } from "lucide-react-native";
import GlobalLoading from "@/components/GlobalLoading";
import GlobalError from "@/components/GlobalError";
import GlobalNoData from "@/components/GlobalNoData";

const ProviderAttractionDashboardScreen = () => {
  const { icon } = useThemeColor();
  const theme = useColorScheme();
  const navigation = useNavigation();
  // const { getValues } = useFormContext();
  // const { businessType } = getValues();
  // console.log(businessType);

  const [page, setPage] = useState(1);
  const [allHotels, setAllHotels] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: profileData,
    // isLoading: profileLoading,
    // isError: profileError,
  } = useGetProviderProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: hotelsData,
    isLoading: hotelsLoading,
    isFetching: isFetchingMore,
    isError: hotelsError,
    refetch,
  } = useGetProviderAttractionQuery(
    { page },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: allStatics, isLoading, isError } = useGetAllStaticsAttractionQuery();

  // Merge unique hotels by ID
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

  const loadMoreHotels = () => {
    const totalHotels = hotelsData?.data?.meta?.total ?? 0;
    if (!isFetchingMore && allHotels.length < totalHotels) {
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
      <ThemedView styles="flex-row items-center justify-between">
        <ThemedView styles="flex-row items-center gap-3">
          <Image
            source={require("assets/images/user.png")}
            style={{
              width: responsiveWidth(13),
              height: responsiveWidth(13),
              borderRadius: 100,
              borderWidth: 1,
              borderColor: theme === "dark" ? "#000000" : "#ffffff",
            }}
          />

          <ThemedView>
            <ThemedText styles="font-Regular text-md">Welcome</ThemedText>
            <ThemedText styles="font-Bold text-xl">
              {" "}
              {profileData?.data?.fullName ||
                profileData?.data?.email.split("@")[0]}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <Pressable onPress={() => navigation.navigate("UserNotification")}>
          <ThemedViewLightBlue styles="p-2 rounded-full">
            {/* <Ionicons name="notifications-outline" size={24} color={icon} /> */}
            <Bell size={24} color={icon} />
          </ThemedViewLightBlue>
        </Pressable>
      </ThemedView>

      <FlatList
        data={allHotels}
        renderItem={({ item }) => (
          <ActiveAttractionBusinessCard
            key={item.id}
            item={item}
            name={"selectedActiveListingAttraction"}
            navigation={navigation}
            path="ProviderAttractionEditBusiness"
            pathListing="ProviderAttractionDashboardAllListing"
          />
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(2),
          gap: responsiveHeight(2),
        }}
        onEndReached={loadMoreHotels}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <SalesChart
            allStatics={allStatics}
            isLoading={isLoading}
            isError={isError}
          />
        }
        ListEmptyComponent={
          <View>
            {hotelsLoading && <GlobalLoading />}

            {/* Inline error */}
            {hotelsError && <GlobalError refetch={refetch} />}

            {/* Inline empty state */}
            {!hotelsLoading && !hotelsError && !hotelsData?.data?.length && (
              <GlobalNoData />
            )}
          </View>
        }
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </ThemedView>
  );
};

export default ProviderAttractionDashboardScreen;
