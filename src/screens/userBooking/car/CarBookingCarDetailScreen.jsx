// import React from "react";
// import { View, Image, ScrollView, Pressable } from "react-native";
// import ThemedView from "@/utils/ThemedView";
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from "react-native-responsive-dimensions";
// import { useNavigation } from "@react-navigation/native";
// import ThemedText from "@/utils/ThemedText";
// import ThemedText2 from "@/utils/ThemeText2";
// import ThemedText3 from "@/utils/ThemedText3";
// import CarImageCarousel from "@/utils/CarImageCarousel";
// import { useFormContext } from "react-hook-form";
// import CarSpecificationsList from "@/components/CarSpecificationList";
// import CarFeaturesList from "@/components/CarFeatureList";
// import ThemedPressable from "@/utils/ThemedPressable";
// import GoBackTitle2 from "@/components/GoBackTitle2";
// import useT from "@/utils/useT";
// import ThemedViewBlue from "@/utils/ThemedViewBlue";
// import { useGetSingleUserQuery } from "@/redux/slices/authSlice";
// import { Star } from "lucide-react-native";

// export default function CarBookingCarDetailScreen() {
//   const navigation = useNavigation();
//   // const carImageRef = useRef(null);
//   const { getValues } = useFormContext();
//   const { selectedCar } = getValues();
//   console.log("Car Details", selectedCar);
//   const specifications = {
//     engine: selectedCar?.carEngineType, // Engine
//     transmission: selectedCar?.carTransmission, // Transmission
//     mileage: selectedCar?.carMileage, // Mileage
//     horsepower: selectedCar?.carPower, // Horsepower
//     drivetrain: selectedCar?.carDrivetrain, // Drivetrain
//     color: selectedCar?.carColor, // Color
//   };
//   const features = {
//     Model: selectedCar?.carModel, // Model
//     Capacity: selectedCar?.carSeats, // Capacity (seats)
//     Color: selectedCar?.carColor, // Color
//     "Fuel type": selectedCar?.fuelType, // Fuel type
//     "Gear type": selectedCar?.carTransmission, // Transmission
//   };

//   const {
//     data: profileData,
//     isLoading: profileLoading,
//     isError: profileError,
//   } = useGetSingleUserQuery({ id: selectedCar?.partnerId });

//   const t = useT();
//   return (
//     <ThemedView
//       styles="flex-1"
//       style={{
//         paddingHorizontal: responsiveWidth(6),
//         paddingVertical: responsiveHeight(5),
//         // gap: responsiveHeight(5),
//       }}
//     >
//       <ScrollView
//         className="flex-1"
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           gap: responsiveHeight(3),
//         }}
//       >
//         {/* Header */}
//         <View
//           className="mt-2"
//           style={{
//             gap: responsiveHeight(3),
//           }}
//         >
//           {/* <GoBack navigation={navigation} /> */}
//           <GoBackTitle2 navigation={navigation} title={t("carDetail.title")} />
//           <View
//             style={{
//               gap: responsiveHeight(1),
//             }}
//           >
//             <ThemedText styles="text-xl font-SemiBold">
//               {selectedCar?.carName} {selectedCar?.carModel}
//             </ThemedText>
//             <View className="flex-row items-center gap-1">
//               {/* <FontAwesome name="star" size={16} color="#3B82F6" /> */}
//               <Star size={16} color="#3B82F6" />
//               <ThemedText3 styles="text-sm font-Regular">
//                 {selectedCar?.rating} ({selectedCar?.carReviewCount}{" "}
//                 {t("carDetail.ratingText")})
//               </ThemedText3>
//             </View>
//             <View className="flex-row items-center">
//               <ThemedText styles="font-SemiBold text-lg">
//                 {selectedCar?.displayCurrency} {selectedCar?.convertedPrice}
//               </ThemedText>
//               <ThemedText3>{t("carDetail.perDay")}</ThemedText3>
//             </View>
//           </View>
//         </View>

//         {selectedCar?.carImages && (
//           <CarImageCarousel carImage={selectedCar?.carImages} />
//         )}

//         <Pressable
//           onPress={() =>
//             navigation.navigate("UserChat", {
//               receiverId: selectedCar?.partnerId,
//               receiverName:
//                 profileData?.data?.fullName || profileData?.data?.email,
//             })
//           }
//           className="w-full mb-4"
//         >
//           <ThemedViewBlue styles="px-4 py-3 rounded-xl items-center">
//             <Image source={require("assets/images/chat.webp")} />
//           </ThemedViewBlue>
//         </Pressable>

//         {/* Specifications */}
//         <View className="mt-5 gap-3">
//           <ThemedText styles="text-lg font-SemiBold">
//             {t("carDetail.specifications")}
//           </ThemedText>

//           <CarSpecificationsList specifications={specifications} />
//         </View>

//         {/* Car Features */}
//         <View className="gap-3">
//           <ThemedText styles="text-lg font-SemiBold">
//             {" "}
//             {t("carDetail.features")}
//           </ThemedText>

//           <CarFeaturesList features={features} />
//         </View>

//         {/* Action Buttons */}
//         <View className="flex-row gap-4">
//           <ThemedPressable
//             onPress={() => navigation.navigate("UserCarBookingCredential")}
//             styles="flex-1 p-3 justify-center rounded-xl items-center"
//           >
//             <ThemedText2 styles="font-SemiBold text-center text-lg">
//               {t("carBooking.continue")}
//             </ThemedText2>
//           </ThemedPressable>
//         </View>
//       </ScrollView>
//     </ThemedView>
//   );
// }


import React, { useEffect, useState } from "react";
import { View, Image, ScrollView, Pressable } from "react-native";
import ThemedView from "@/utils/ThemedView";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import ThemedText from "@/utils/ThemedText";
import ThemedText2 from "@/utils/ThemeText2";
import ThemedText3 from "@/utils/ThemedText3";
import CarImageCarousel from "@/utils/CarImageCarousel";
import { useFormContext } from "react-hook-form";
import CarSpecificationsList from "@/components/CarSpecificationList";
import CarFeaturesList from "@/components/CarFeatureList";
import ThemedPressable from "@/utils/ThemedPressable";
import GoBackTitle2 from "@/components/GoBackTitle2";
import useT from "@/utils/useT";
import ThemedViewBlue from "@/utils/ThemedViewBlue";
import { useGetSingleUserQuery } from "@/redux/slices/authSlice";
import { Star } from "lucide-react-native";
import {
  getCountryCode,
  getCurrencyFromCountryCode,
} from "@/utils/simpleLocationService";
import { convertPrice } from "@/utils/convertPrice";

export default function CarBookingCarDetailScreen() {
  const navigation = useNavigation();
  const { getValues, setValue } = useFormContext();
  const { selectedCar: originalCar } = getValues();
  
  // Price conversion states
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [displayCurrency, setDisplayCurrency] = useState(originalCar?.currency);
  const [isLoading, setIsLoading] = useState(true);
  const [car, setCar] = useState(originalCar);

  console.log("Car Details", originalCar);

  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
  } = useGetSingleUserQuery({ id: originalCar?.partnerId });

  const t = useT();

  // Load price conversion
  useEffect(() => {
    const loadPriceConversion = async () => {
      try {
        setIsLoading(true);

        if (!originalCar) {
          setIsLoading(false);
          return;
        }

        // console.log("🚗 Starting car price conversion for:", originalCar.id);

        // Get user's country code
        const countryCode = await getCountryCode();
        // console.log("📍 User country code:", countryCode);

        // Get currency for user's country
        const userCurrency = getCurrencyFromCountryCode(countryCode);
        // console.log("💰 User currency:", userCurrency);

        // Get car's original currency
        const carCurrency = originalCar?.currency || "USD";
        // console.log("🏦 Car currency:", carCurrency);

        // Convert price if currencies are different
        let newConvertedPrice;
        let newDisplayCurrency;

        if (userCurrency !== carCurrency) {
          console.log(`🔄 Converting from ${carCurrency} to ${userCurrency}`);
          newConvertedPrice = await convertPrice(
            originalCar?.carPriceDay,
            carCurrency,
            userCurrency
          );
          console.log("✅ Converted car price:", newConvertedPrice);
          newDisplayCurrency = userCurrency;
        } else {
          // Same currency, no conversion needed
          console.log("✅ Same currency, no conversion needed");
          newConvertedPrice = originalCar?.carPriceDay;
          newDisplayCurrency = carCurrency;
        }

        // Round to 2 decimal places
        const roundedConvertedPrice = parseFloat(newConvertedPrice.toFixed(2));

        // Calculate discounted price
        const discount = originalCar?.discount || 0;
        // let discountedPrice = roundedConvertedPrice;
        
        // if (discount > 0) {
        //   discountedPrice = parseFloat(
        //     (roundedConvertedPrice - (roundedConvertedPrice * discount) / 100).toFixed(2)
        //   );
        //   console.log("🎯 Discounted car price:", discountedPrice);
        // }

        // Update local state
        setConvertedPrice(roundedConvertedPrice);
        setDisplayCurrency(newDisplayCurrency);

        // Update car object with converted values
        try {
          console.log("🔄 Updating car object directly...");
          originalCar.convertedPrice = roundedConvertedPrice;
          originalCar.displayCurrency = newDisplayCurrency;
          originalCar.discountedPrice = discount;
          console.log("✅ Direct update successful");
        } catch (directError) {
          console.log("⚠️ Direct update failed:", directError.message);
        }

        // Create updated car object
        const updatedCar = {
          ...originalCar,
          convertedPrice: roundedConvertedPrice,
          displayCurrency: newDisplayCurrency,
          discountedPrice: discount,
        };

        // Update form
        setValue("selectedCar", updatedCar, {
          shouldValidate: false,
          shouldDirty: false,
        });

        // Update local state for display
        setCar(updatedCar);

        console.log("✅ Final car object:", {
          originalPrice: originalCar?.carPriceDay,
          originalCurrency: originalCar?.currency,
          convertedPrice: updatedCar.convertedPrice,
          displayCurrency: updatedCar.displayCurrency,
          discountedPrice: updatedCar.discount,
          discount: originalCar?.discount,
        });

      } catch (error) {
        console.error("❌ Car price conversion error:", error);
        
        // Fallback to original values
        const fallbackConvertedPrice = parseFloat(originalCar?.carPriceDay?.toFixed(2) || 0);
        const discount = originalCar?.discount || 0;
       
        
        setConvertedPrice(fallbackConvertedPrice);
        setDisplayCurrency(originalCar?.currency || "USD");

        // Update with fallback
        const fallbackCar = {
          ...originalCar,
          convertedPrice: fallbackConvertedPrice,
          displayCurrency: originalCar?.currency || "USD",
          discountedPrice: discount,
        };
        
        setValue("selectedCar", fallbackCar, {
          shouldValidate: false,
          shouldDirty: false,
        });
        
        setCar(fallbackCar);

      } finally {
        setIsLoading(false);
      }
    };

    if (originalCar) {
      loadPriceConversion();
    }
  }, [originalCar?.id, originalCar?.carPriceDay, setValue]);

  // Determine display values
  const hasConvertedValues = car?.convertedPrice && car?.displayCurrency;
  
  const displayPrice = hasConvertedValues 
    ? car.convertedPrice 
    : convertedPrice !== null 
      ? convertedPrice 
      : car?.carPriceDay;
  
  const displayCurrencySymbol = hasConvertedValues 
    ? car.displayCurrency 
    : displayCurrency || car?.currency;

  const specifications = {
    engine: car?.carEngineType,
    transmission: car?.carTransmission,
    mileage: car?.carMileage,
    horsepower: car?.carPower,
    drivetrain: car?.carDrivetrain,
    color: car?.carColor,
  };

  const features = {
    Model: car?.carModel,
    Capacity: car?.carSeats,
    Color: car?.carColor,
    "Fuel type": car?.fuelType,
    "Gear type": car?.carTransmission,
  };

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
      }}
    >
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: responsiveHeight(3),
        }}
      >
        {/* Header */}
        <View
          className="mt-2"
          style={{
            gap: responsiveHeight(3),
          }}
        >
          <GoBackTitle2 navigation={navigation} title={t("carDetail.title")} />
          <View
            style={{
              gap: responsiveHeight(1),
            }}
          >
            <ThemedText styles="text-xl font-SemiBold">
              {car?.carName} {car?.carModel}
            </ThemedText>
            <View className="flex-row items-center gap-1">
              <Star size={16} color="#3B82F6" />
              <ThemedText3 styles="text-sm font-Regular">
                {car?.rating} ({car?.carReviewCount}{" "}
                {t("carDetail.ratingText")})
              </ThemedText3>
            </View>
            <View className="flex-row items-center gap-2">
              <ThemedText styles="font-SemiBold text-lg">
                {displayCurrencySymbol}{" "}
                {isLoading ? "..." : displayPrice?.toFixed(2)}
              </ThemedText>
              <ThemedText3>{t("carDetail.perDay")}</ThemedText3>
              
              {/* Show discount if available */}
              {/* {car?.discount > 0 && car?.discountedPrice && (
                <>
                  <ThemedText3 styles="text-gray-500 line-through">
                    {displayCurrencySymbol} {displayPrice?.toFixed(2)}
                  </ThemedText3>
                  <ThemedText styles="text-green-600 font-SemiBold text-lg">
                    {displayCurrencySymbol} {car.discountedPrice?.toFixed(2)}
                  </ThemedText>
                  <ThemedText3 styles="text-red-500">
                    ({car.discount}% OFF)
                  </ThemedText3>
                </>
              )} */}
            </View>
            
            {/* Show conversion note if different */}
            {/* {car?.currency !== displayCurrencySymbol && (
              <ThemedText3 styles="text-gray-500 text-sm">
                Converted from {car?.currency} {car?.carPriceDay?.toFixed(2)}
              </ThemedText3>
            )} */}
          </View>
        </View>

        {car?.carImages && (
          <CarImageCarousel carImage={car?.carImages} />
        )}

        <Pressable
          onPress={() =>
            navigation.navigate("UserChat", {
              receiverId: car?.partnerId,
              receiverName:
                profileData?.data?.fullName || profileData?.data?.email,
            })
          }
          className="w-full mb-4"
        >
          <ThemedViewBlue styles="px-4 py-3 rounded-xl items-center">
            <Image source={require("assets/images/chat.webp")} />
          </ThemedViewBlue>
        </Pressable>

        {/* Specifications */}
        <View className="mt-5 gap-3">
          <ThemedText styles="text-lg font-SemiBold">
            {t("carDetail.specifications")}
          </ThemedText>

          <CarSpecificationsList specifications={specifications} />
        </View>

        {/* Car Features */}
        <View className="gap-3">
          <ThemedText styles="text-lg font-SemiBold">
            {t("carDetail.features")}
          </ThemedText>

          <CarFeaturesList features={features} />
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-4">
          <ThemedPressable
            onPress={() => {
              // Test if converted values are available
              // const testValues = getValues();
              // console.log("🚗 Continue button pressed - Car values:", {
              //   convertedPrice: testValues.selectedCar?.convertedPrice,
              //   displayCurrency: testValues.selectedCar?.displayCurrency,
              //   discountedPrice: testValues.selectedCar?.discountedPrice,
              // });
              navigation.navigate("UserCarBookingCredential");
            }}
            styles="flex-1 p-3 justify-center rounded-xl items-center"
          >
            <ThemedText2 styles="font-SemiBold text-center text-lg">
              {t("carBooking.continue")}
            </ThemedText2>
          </ThemedPressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}