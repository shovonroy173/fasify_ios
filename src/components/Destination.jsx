
/* eslint-disable react-native/no-inline-styles */
import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import ThemedViewOrange from "../utils/ThemedViewOrange";
import ThemedText2 from "../utils/ThemeText2";

import { useThemeColor } from "../utils/useThemeColor";
import { Controller, useFormContext } from "react-hook-form";
import { useAddFavouriteHotelMutation } from "../redux/slices/userSlice/hotelbookingSlice";
import { Heart, Star } from "lucide-react-native";
import {
  getCountryCode,
  getCurrencyFromCountryCode,
} from "@/utils/simpleLocationService";
import { convertPrice } from "@/utils/convertPrice";

const Destination = ({
  item,
  name,
  screen,
  navigation,
  path,
  popular,
  search,
  normal,
}) => {
  const { icon } = useThemeColor();
  const { control } = useFormContext();

  const [liked, setLiked] = useState(false);
  const [addFavouriteHotel] = useAddFavouriteHotelMutation();
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [displayCurrency, setDisplayCurrency] = useState(item?.roomCurrency);
  const [isLoading, setIsLoading] = useState(true);

  // console.log("LINE AT 266", item);

  const handleFavourite = async () => {
    try {
      setLiked((prev) => !prev);
      const res = await addFavouriteHotel({ hotelId: item.id }).unwrap();
      console.log("Added to favourites ✅:", res);
    } catch (error) {
      console.error("Error adding favourite ❌:", error);
    }
  };

  useEffect(() => {
    const loadPriceConversion = async () => {
      try {
        setIsLoading(true);

        // Get user's country code
        const countryCode = await getCountryCode();
        // console.log("User country code:", countryCode);

        // Get currency for user's country
        const userCurrency = getCurrencyFromCountryCode(countryCode);
        // console.log("User currency:", userCurrency);
// 
        // Get hotel's original currency
        const hotelCurrency = item?.roomCurrency;
        // console.log("Hotel currency:", hotelCurrency);

        // Convert price if currencies are different
        if (userCurrency !== hotelCurrency) {
          const newPrice = await convertPrice(
            item?.averagePrice,
            hotelCurrency,
            userCurrency
          );
          // console.log("Converted price:", newPrice);
          setConvertedPrice(newPrice.toFixed(2)); // Round to whole number
          setDisplayCurrency(userCurrency);
        } else {
          // Same currency, no conversion needed
          setConvertedPrice(item?.averagePrice);
          setDisplayCurrency(hotelCurrency);
        }
      } catch (error) {
        console.error("Price conversion error:", error);
        // Fallback to original price on error
        setConvertedPrice(item?.averagePrice);
        setDisplayCurrency(item?.displayCurrency);
      } finally {
        setIsLoading(false);
      }
    };

    loadPriceConversion();
  }, [item]);

  // Display price (use converted if available, otherwise original)
  const priceToDisplay =
    convertedPrice !== null ? convertedPrice : item?.averagePrice;
  const currencyToDisplay = displayCurrency || item?.roomCurrency;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Pressable
          onPress={() => {
            onChange(item);
            navigation.navigate(path, { screen: screen, params: { item } });
          }}
          className="relative"
          style={{
            overflow: "hidden",
            borderRadius: 10,
            width: popular ? responsiveWidth(40) : responsiveWidth(88),
            height: responsiveHeight(30),
          }}
        >
          {normal && (
            <ThemedViewOrange
              styles="rounded-full absolute top-3 left-3 z-20"
              style={{
                paddingHorizontal: responsiveWidth(7),
                paddingVertical: responsiveHeight(1),
              }}
            >
              <ThemedText2 styles="font-Medium text-sm">
                {item?.room[0]?.discount}% OFF
              </ThemedText2>
            </ThemedViewOrange>
          )}

          {search && (
            <Pressable
              className="absolute top-3 left-3 z-20"
              onPress={handleFavourite}
            >
              {liked || item?.isFavorite ? (
                <ThemedViewOrange
                  styles="rounded-full"
                  style={{
                    paddingHorizontal: responsiveWidth(2),
                    paddingVertical: responsiveHeight(1),
                  }}
                >
                  <Heart size={20} color={"white"} fill={"white"} />
                </ThemedViewOrange>
              ) : (
                <ThemedViewOrange
                  styles="rounded-full"
                  style={{
                    paddingHorizontal: responsiveWidth(2),
                    paddingVertical: responsiveHeight(1),
                  }}
                >
                  <Heart size={20} color={"white"} />
                </ThemedViewOrange>
              )}
            </Pressable>
          )}

          <ImageBackground
            source={{
              uri:
                item?.room[0]?.hotelImages[0] ||
                item?.businessLogo ||
                "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode="cover"
          >
            {!popular ? (
              <View
                className="absolute bottom-2 left-3 flex-row items-center justify-between"
                style={{
                  width: responsiveWidth(82),
                }}
              >
                <View className="w-1/2">
                  <ThemedText2 styles="font-Bold text-lg">
                    {item?.hotelBusinessName}
                  </ThemedText2>
                  <View className="flex-row items-center">
                    <Text className="text-zinc-200">
                      {item?.hotelCity}, {item?.hotelCountry}
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <View className="flex-row items-center gap-1">
                    <Star size={18} color="#FE8814" />
                    <ThemedText2 styles="font-Medium">
                      {item?.averageRating}
                    </ThemedText2>
                  </View>
                  <View className="flex-row items-center">
                    <ThemedText2 styles="font-Medium">
                      {currencyToDisplay}{" "}
                    </ThemedText2>
                    <ThemedText2 styles="font-Medium text-lg">
                      {isLoading ? "..." : priceToDisplay}
                      <ThemedText2 styles="font-Regular text-sm">
                        /night
                      </ThemedText2>
                    </ThemedText2>
                  </View>
                </View>
              </View>
            ) : (
              <View
                className="absolute items-start"
                style={{
                  left: responsiveWidth(2),
                  top: responsiveHeight(2),
                }}
              >
                <View className="w-4/5">
                  <ThemedText2 styles="font-Bold text-lg">
                    {item?.hotelBusinessName}
                  </ThemedText2>
                  <Text className="text-zinc-200">{item?.hotelCountry}</Text>
                </View>
                <View className="w-full items-start gap-1">
                  <View className="flex-row items-center gap-1">
                    <Star size={18} color="#FE8814" />
                    <ThemedText2 styles="font-Medium">
                      {item?.averageRating}
                    </ThemedText2>
                  </View>
                  <View className="flex-row items-center w-2/3">
                    <ThemedText2 styles="font-Medium">
                      {currencyToDisplay}{" "}
                    </ThemedText2>
                    <ThemedText2 styles="font-Medium text-sm">
                      {isLoading ? "..." : priceToDisplay}
                      <ThemedText2 styles="font-Regular text-sm">
                        /night
                      </ThemedText2>
                    </ThemedText2>
                  </View>
                </View>
              </View>
            )}
          </ImageBackground>
        </Pressable>
      )}
    />
  );
};

export default Destination;
