/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback, useEffect } from "react";
import {
  FlatList,
  Image,
  TextInput,
  useColorScheme,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import ThemedView from "@/utils/ThemedView";
import ThemedViewBlue from "@/utils/ThemedViewBlue";
import ThemedViewLightBlue from "@/utils/ThemedViewLightBlue";
import ThemedText2 from "@/utils/ThemeText2";
import ThemedText from "@/utils/ThemedText";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
import { useThemeColor } from "@/utils/useThemeColor";
import { categories } from "@/../assets/data/data";
import Category from "@/components/Category";
import Destination from "@/components/Destination";
import { useNavigation } from "@react-navigation/native";
import useT from "@/utils/useT";
import { useGetProviderProfileQuery } from "@/redux/slices/authSlice";
import { useGetPopularHotelsQuery } from "@/redux/slices/userSlice/hotelbookingSlice";
import { Controller, useFormContext } from "react-hook-form";
import { useDebounce } from "use-debounce";
import GlobalError from "@/components/GlobalError";
import GlobalLoading from "@/components/GlobalLoading";
import GlobalNoData from "@/components/GlobalNoData";
import GlobalRenderFooter from "@/components/GlobalRenderFooter";

import { Search, Bell } from "lucide-react-native";

const UserHomeScreen = () => {
  const theme = useColorScheme();
  const { icon } = useThemeColor();
  const navigation = useNavigation();

  const { watch, control } = useFormContext();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
    refetch: profileRefetch,
  } = useGetProviderProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const searchTerm = watch("searchHome");
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const queryArgs = debouncedSearch?.trim()
    ? { page: 1, limit: 10, searchTerm: debouncedSearch }
    : { page: 1, limit: 10 };

  const {
    data: hotelsData,
    isLoading: hotelsLoading,
    isFetching: isFetchingMore,
    isError: hotelsError,
    refetch,
  } = useGetPopularHotelsQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const t = useT();

  // console.log("LINE AT 79", hotelsData);

  return (
    <ThemedView styles="flex-1">
      {/* Fixed Header */}

      <ThemedViewBlue
        style={{
          paddingHorizontal: responsiveWidth(6),
          paddingVertical: responsiveHeight(3),
          gap: responsiveHeight(5),
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <ThemedViewBlue styles="flex-row items-center justify-between">
          <ThemedViewBlue styles="flex-row items-center gap-3">
            <Image
              source={
                profileData?.data?.profileImage
                  ? { uri: profileData.data.profileImage }
                  : require("assets/images/user.png") // fallback image
              }
              style={{
                width: responsiveWidth(13),
                height: responsiveWidth(13),
                borderRadius: 100,
                borderWidth: 1,
                borderColor: theme === "dark" ? "#000000" : "#ffffff",
              }}
            />

            <ThemedViewBlue>
              <ThemedText2 styles="font-SemiBold text-md">
                {t("welcomeTo.text")}
              </ThemedText2>

              <ThemedText2 styles="font-Bold text-xl">
                {profileLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={theme === "dark" ? "#fff" : "#000"}
                  />
                ) : profileError ? (
                  <Pressable
                    onPress={() => profileRefetch()}
                    style={{
                      marginTop: 4,
                      backgroundColor: "blue",
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderRadius: 6,
                    }}
                  >
                    <ThemedText2 styles="font-Regular text-white">
                      {t("retry")}
                    </ThemedText2>
                  </Pressable>
                ) : profileData?.data?.fullName ? (
                  profileData.data.fullName
                ) : profileData?.data?.email ? (
                  profileData.data.email.split(`@`)[0]
                ) : (
                  t("noNameAvailable")
                )}
              </ThemedText2>
            </ThemedViewBlue>
          </ThemedViewBlue>

          <Pressable onPress={() => navigation.navigate("UserNotification")}>
            <ThemedViewLightBlue styles="p-2 rounded-full">
              <Bell size={18} color={icon} />
            </ThemedViewLightBlue>
          </Pressable>
        </ThemedViewBlue>

        <ThemedViewLightBlue styles="relative p-1 border rounded-md">
          <Search
            size={22}
            color={icon}
            style={{ position: "absolute", left: 10, top: 12 }}
          />
          <Controller
            control={control}
            name="searchHome"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{
                  paddingLeft: 40,
                  padding: 10,
                  color: theme === "dark" ? "#000" : "#fff",
                }}
                // placeholder={t("search")}
                placeholder={"Searching.."}
                placeholderTextColor={theme === "dark" ? "#52525b" : "#e4e4e7"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </ThemedViewLightBlue>
      </ThemedViewBlue>

      <FlatList
        data={hotelsData?.data}
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
        keyExtractor={(item, index) => item.id || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: responsiveWidth(6),
          paddingVertical: responsiveHeight(3),
          gap: responsiveHeight(2),
        }}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <View
            style={{
              gap: responsiveHeight(2),
            }}
          >
            <View className="flex-row items-center justify-between ">
              {categories.map((item) => (
                <Category key={item.id} item={item} />
              ))}
            </View>
            <ThemedText styles="font-Bold text-md">
              {t("hotelBookingHome.popularHotels")}
            </ThemedText>

            {/* Inline loading */}
            {hotelsLoading && <GlobalLoading />}

            {/* Inline error */}
            {hotelsError && <GlobalError refetch={refetch} />}

            {/* Inline empty state */}
            {!hotelsLoading && !hotelsError && !hotelsData?.data?.length && (
              <GlobalNoData />
            )}
          </View>
        }
        ListFooterComponent={
          <GlobalRenderFooter isFetchingMore={isFetchingMore} />
        }
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </ThemedView>
  );
};

export default UserHomeScreen;
