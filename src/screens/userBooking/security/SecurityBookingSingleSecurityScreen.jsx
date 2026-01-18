
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import ThemedView from "@/utils/ThemedView";
import ThemedText from "@/utils/ThemedText";
import ThemedText3 from "@/utils/ThemedText3";
import GoBackTitle2 from "@/components/GoBackTitle2";
import DateRangeSelectorWithModal from "@/components/DateRangeSelectorWithModal";
import useT from "@/utils/useT";
import { useFormContext } from "react-hook-form";
import CounterInput from "@/components/ControllerInput";
import ThemedViewBlue from "@/utils/ThemedViewBlue";
import Button from "@/components/Button";
import { useCreateBookingSecurityMutation } from "@/redux/slices/userSlice/securityBookingSlice";
import { Star } from "lucide-react-native";
import {
  getCountryCode,
  getCurrencyFromCountryCode,
} from "@/utils/simpleLocationService";
import { convertPrice } from "@/utils/convertPrice";

const SecurityBookingSingleSecurityScreen = () => {
  const navigation = useNavigation();
  const t = useT();
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Store the security ID to track changes
  const [securityId, setSecurityId] = useState(null);

  // Price conversion states
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [displayCurrency, setDisplayCurrency] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [createBookingSecurity] = useCreateBookingSecurityMutation();
  const { control } = useFormContext();

  // Get current selectedSecurity
  const selectedSecurity = getValues().selectedSecurity;

  // Track when selectedSecurity changes
  useEffect(() => {
    if (selectedSecurity?.id !== securityId) {
      setSecurityId(selectedSecurity?.id);
      setIsLoading(true);
    }
  }, [selectedSecurity]);

  // Load price conversion - THIS IS THE KEY FUNCTION
  const loadPriceConversion = async (security) => {
    try {
      if (!security) return;

      console.log("🚀 Starting price conversion for:", security.id);

      // Get user's country code
      const countryCode = await getCountryCode();
      // console.log("📍 User country code:", countryCode);

      // Get currency for user's country
      const userCurrency = getCurrencyFromCountryCode(countryCode);
      // console.log("💰 User currency:", userCurrency);

      // Get security's original currency
      const securityCurrency = security?.currency || "USD";
      // console.log("🏦 Security currency:", securityCurrency);

      const discount = selectedSecurity?.discount || 0;

      // Convert price if currencies are different
      let newConvertedPrice;
      let newDisplayCurrency;

      if (userCurrency !== securityCurrency) {
        console.log(
          `🔄 Converting from ${securityCurrency} to ${userCurrency}`
        );
        newConvertedPrice = await convertPrice(
          security?.securityPriceDay,
          securityCurrency,
          userCurrency
        );
        console.log("✅ Converted price:", newConvertedPrice);
        newDisplayCurrency = userCurrency;
      } else {
        // Same currency, no conversion needed
        console.log("✅ Same currency, no conversion needed");
        newConvertedPrice = security?.securityPriceDay;
        newDisplayCurrency = securityCurrency;
      }

      // Round to 2 decimal places
      const roundedConvertedPrice = parseFloat(newConvertedPrice.toFixed(2));

      // Update local state for UI
      setConvertedPrice(roundedConvertedPrice);
      setDisplayCurrency(newDisplayCurrency);

      // 🚨 CRITICAL: Update the form with BOTH methods for maximum compatibility

      // Method 1: Try direct modification first (works in some cases)
      try {
        console.log("🔄 Attempting direct modification...");
        security.convertedPrice = roundedConvertedPrice;
        security.displayCurrency = newDisplayCurrency;
        security.discountedPrice = discount;
        console.log("✅ Direct modification successful");
      } catch (error) {
        console.log("⚠️ Direct modification failed, error:", error.message);
      }

      // Method 2: ALWAYS use setValue to ensure form state is updated
      const updatedSecurity = {
        ...security,
        convertedPrice: roundedConvertedPrice,
        displayCurrency: newDisplayCurrency,
      };

      console.log("🔄 Updating form via setValue...");
      setValue("selectedSecurity", updatedSecurity, {
        shouldValidate: false,
        shouldDirty: false,
      });

      console.log("✅ Form updated successfully");
      console.log("📊 Final object in form:", {
        convertedPrice: updatedSecurity.convertedPrice,
        displayCurrency: updatedSecurity.displayCurrency,
      });

      // Verify the update worked
      const verifySecurity = getValues().selectedSecurity;
      console.log("🔍 Verification - Current form values:", {
        hasConvertedPrice: !!verifySecurity?.convertedPrice,
        convertedPrice: verifySecurity?.convertedPrice,
        displayCurrency: verifySecurity?.displayCurrency,
      });
    } catch (error) {
      console.error("❌ Price conversion error:", error);
      const discount = selectedSecurity?.discount || 0;

      // Fallback: Set original values
      const fallbackConvertedPrice = parseFloat(
        security?.securityPriceDay?.toFixed(2) || 0
      );

      setConvertedPrice(fallbackConvertedPrice);
      setDisplayCurrency(security?.currency || "USD");

      // Update form with fallback
      try {
        security.convertedPrice = fallbackConvertedPrice;
        security.displayCurrency = security?.currency || "USD";
        security.discountedPrice = discount;
      } catch (e) {
        console.log("Fallback direct modification failed:", e);
      }

      const fallbackSecurity = {
        ...security,
        convertedPrice: fallbackConvertedPrice,
        displayCurrency: security?.currency || "USD",
        discountedPrice: discount,
      };

      setValue("selectedSecurity", fallbackSecurity, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  };

  // Run conversion when security changes
  useEffect(() => {
    if (selectedSecurity && isLoading) {
      loadPriceConversion(selectedSecurity);
      setIsLoading(false);
    }
  }, [selectedSecurity, isLoading]);

  // Display price - use whatever is available
  const hasConvertedInObject =
    selectedSecurity?.convertedPrice && selectedSecurity?.displayCurrency;

  const displayPrice = hasConvertedInObject
    ? selectedSecurity.convertedPrice
    : convertedPrice !== null
      ? convertedPrice
      : selectedSecurity?.securityPriceDay;

  const displayCurrencySymbol = hasConvertedInObject
    ? selectedSecurity.displayCurrency
    : displayCurrency || selectedSecurity?.currency;

  // Debug: Check what's available
  console.log("🎯 Current display values:", {
    fromObject: {
      convertedPrice: selectedSecurity?.convertedPrice,
      displayCurrency: selectedSecurity?.displayCurrency,
    },
    fromState: {
      convertedPrice: convertedPrice,
      displayCurrency: displayCurrency,
    },
    finalDisplay: {
      price: displayPrice,
      currency: displayCurrencySymbol,
    },
  });

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(5),
      }}
    >
      <GoBackTitle2 navigation={navigation} title={t("securityDetail.title")} />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: responsiveHeight(3),
        }}
      >
        {/* Profile Section */}
        <View className="items-center">
          <View
            className="rounded-full overflow-hidden"
            style={{
              width: responsiveWidth(20),
              height: responsiveWidth(20),
            }}
          >
            <Image
              source={{
                uri: selectedSecurity?.securityImages?.[0],
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <ThemedText styles="text-2xl font-SemiBold mb-1">
            {selectedSecurity?.securityGuardName}
          </ThemedText>
          <ThemedText3 styles="mb-2">
            {selectedSecurity?.securityGuardName}
          </ThemedText3>
          <View className="flex-row items-center gap-1">
            <Star size={16} color="#FE8814" />
            <ThemedText3 styles="text-md font-Regular">
              {selectedSecurity?.securityRating}
            </ThemedText3>
          </View>
        </View>

        <Pressable
          onPress={() =>
            navigation.navigate("UserChat", {
              receiverId: selectedSecurity?.partnerId,
              receiverName: selectedSecurity?.securityName,
            })
          }
          className="w-full"
        >
          <ThemedViewBlue styles="px-4 py-3 rounded-xl items-center">
            <Image source={require("assets/images/chat.webp")} />
          </ThemedViewBlue>
        </Pressable>

        {/* Stats Section */}
        <View className="flex-row">
          <View className="bg-blue-50 dark:bg-blue-300 rounded-lg p-4 mr-2">
            <Text className="text-blue-600 font-semibold mb-1">Daily Rate</Text>
            <View className="flex-row items-baseline">
              <Text className="text-2xl font-bold text-gray-900">
                {displayCurrencySymbol}{" "}
                {isLoading ? "..." : displayPrice?.toFixed(2)}
              </Text>
              <Text className="text-gray-500 text-sm ml-1">per day</Text>
            </View>

            {/* Show conversion note if different */}
            {/* {selectedSecurity?.currency !== displayCurrencySymbol && (
              <Text className="text-gray-500 text-sm mt-1">
                Converted from {selectedSecurity?.currency}{" "}
                {selectedSecurity?.securityPriceDay?.toFixed(2)}
              </Text>
            )} */}
          </View>

          <View className="flex-1 bg-blue-50 dark:bg-blue-300 rounded-lg p-4 ml-2">
            <Text className="text-blue-600 font-semibold mb-1">Hired</Text>
            <View className="flex-row items-baseline">
              <Text className="text-2xl font-bold text-gray-900">
                {selectedSecurity?.hiredCount || 0}
              </Text>
              <Text className="text-gray-500 text-sm ml-1">Times</Text>
            </View>
          </View>
        </View>

        {/* Photos Section */}
        {selectedSecurity?.securityImages?.length > 0 ? (
          <View className="">
            <ThemedText styles="text-xl font-SemiBold mb-4">
              {t("securityDetail.photos")}
            </ThemedText>
            <View className="flex-row gap-3">
              {selectedSecurity?.securityImages.map((image, index) => (
                <View
                  key={index}
                  className="w-24 h-24 rounded-lg overflow-hidden"
                >
                  <Image
                    source={{ uri: image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              ))}
            </View>
          </View>
        ) : (
          <ThemedText styles="text-xl font-SemiBold mb-4">
            No Photos Available
          </ThemedText>
        )}

        {/* Description Section */}
        {selectedSecurity?.securityDescription ? (
          <View className="">
            <ThemedText styles="text-xl font-SemiBold mb-4">
              {t("securityDetail.description")}
            </ThemedText>
            <Text className="text-gray-500 font-Regular leading-6">
              {selectedSecurity?.securityDescription}
            </Text>
          </View>
        ) : (
          <ThemedText styles="text-xl font-SemiBold mb-4">
            No Description
          </ThemedText>
        )}

        {/* Number of Security */}
        <CounterInput
          control={control}
          name="number_of_security"
          label="Number of Security"
        />

        {/* Schedule Section */}
        <ThemedText styles="font-SemiBold text-xl">
          {t("securityDetail.setSchedule")}
        </ThemedText>
        <DateRangeSelectorWithModal
          fromName="securityBookedFromDate"
          toName="securityBookedToDate"
        />

        {/* Services Offered */}
        {selectedSecurity?.securityServicesOffered?.length > 0 && (
          <View className="">
            <ThemedText styles="text-xl font-SemiBold mb-4">
              {t("securityDetail.servicesOffered")}
            </ThemedText>
            <View className="space-y-2">
              {selectedSecurity?.securityServicesOffered.map(
                (service, index) => (
                  <Text key={index} className="text-gray-500 font-Regular py-1">
                    • {service}
                  </Text>
                )
              )}
            </View>
          </View>
        )}

        {/* Error Message */}
        {errors?.root?.message && (
          <Text className="text-red-500">{errors.root.message}</Text>
        )}

        {/* Reserve Button with test */}
        <Button
          title={t("securityDetail.reserve")}
          navigation={navigation}
          path="Payment"
          ids={[
            "number_of_security",
            "securityBookedFromDate",
            "securityBookedToDate",
            "selectedSecurity", // Make sure this is included
          ]}
          noicon={true}
          submission={createBookingSecurity}
          isCreateBookingSecurity={true}
        />
      </ScrollView>
    </ThemedView>
  );
};

export default SecurityBookingSingleSecurityScreen;
