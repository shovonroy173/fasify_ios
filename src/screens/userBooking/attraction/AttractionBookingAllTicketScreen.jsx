// import React from 'react';
// import { View, Text, Image, FlatList } from 'react-native';
// // import FontAwesome from 'react-native-vector-icons/FontAwesome';
// // import Entypo from 'react-native-vector-icons/Entypo';
// import ThemedView from '@/utils/ThemedView';
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import GoBack from '@/components/GoBack';
// import { useNavigation } from '@react-navigation/native';
// // import Octicons from 'react-native-vector-icons/Octicons';
// import { useThemeColor } from '@/utils/useThemeColor';
// import ThemedText from '@/utils/ThemedText';
// import ThemedText3 from '@/utils/ThemedText3';
// import ThemedPressableWhite from '@/utils/ThemedPressableWhite';
// import useT from '@/utils/useT';
// import { Controller, useFormContext } from 'react-hook-form';

// const TicketCard = ({ data, field }) => {
//   const { icon2 } = useThemeColor();
//   const navigation = useNavigation();
//   const t = useT();
//   console.log('LINE ATV 24', data);

//   return (
//     <ThemedView styles="flex-row p-3 rounded-md border mb-3">
//       <Image
//         source={{ uri: data?.attractionImages[0] }}
//         className="w-24 h-42 rounded-md"
//         resizeMode="cover"
//       />
//       <View className="flex-1 ml-3 gap-2">
//         <ThemedText styles="font-SemiBold text-base">
//           {data?.attractionDestinationType}
//         </ThemedText>
//         <ThemedText3 styles="text-sm mt-1">
//           {data?.attractionDescription}
//         </ThemedText3>

//         <View className="flex-row gap-[0.5] datas-center mt-2">
//           {/* <Entypo name="location-pin" size={14} color="gray" /> */}
//           <ThemedText3 styles="text-sm mr-2">
//             {data?.attractionAddress}, {data?.attractionCity}
//           </ThemedText3>
//         </View>

//         <View className="flex-row gap-[0.5] items-center mt-2">
//           {/* <FontAwesome name="star" size={14} color="#f59e0b" /> */}
//           <Text className="text-yellow-600 text-xs ml-1">
//             {data?.attractionRating} ({data?.attractionReviewCount}{' '}
//             {t('attractionBooking.ratingLabel')})
//           </Text>
//         </View>

//         <ThemedText3 styles="text-sm font-Medium ml-1">
//           {t('from')} {data?.displayCurrency} {data?.convertedAdultPrice}
//         </ThemedText3>

//         <ThemedPressableWhite
//           onPress={() => {
//             navigation.navigate('UserAttractionBooking', {
//               screen: 'UserAttractionDetail',
//             });
//             field.onChange(data);
//           }}
//           styles="p-2 border rounded-md flex-1 flex-row gap-2 justify-center items-center"
//         >
//           <ThemedText styles="font-Medium text-sm">
//             {t('seeAvailability')}
//           </ThemedText>
//           {/* <Octicons name="arrow-right" size={16} color={icon2} /> */}
//         </ThemedPressableWhite>
//       </View>
//     </ThemedView>
//   );
// };

// export default function AttractionBookingAllTicketScreen({ route }) {
//   const navigation = useNavigation();
//   const { item } = route.params;
//   const { control } = useFormContext();

//   return (
//     <ThemedView
//       styles="flex-1"
//       style={{
//         paddingHorizontal: responsiveWidth(6),
//         paddingTop: responsiveHeight(5),
//         gap: responsiveHeight(3),
//       }}
//     >
//       <GoBack navigation={navigation} />
//       <FlatList
//         data={item}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <Controller
//             control={control}
//             name="selectedAttraction"
//             render={({ field }) => <TicketCard data={item} field={field} />}
//           />
//         )}
//         showsVerticalScrollIndicator={false}
//       />
//     </ThemedView>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { View, Text, Image, FlatList } from "react-native";
// import ThemedView from "@/utils/ThemedView";
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from "react-native-responsive-dimensions";
// import GoBack from "@/components/GoBack";
// import { useNavigation } from "@react-navigation/native";
// import { useThemeColor } from "@/utils/useThemeColor";
// import ThemedText from "@/utils/ThemedText";
// import ThemedText3 from "@/utils/ThemedText3";
// import ThemedPressableWhite from "@/utils/ThemedPressableWhite";
// import useT from "@/utils/useT";
// import { Controller, useFormContext } from "react-hook-form";
// import {
//   getCountryCode,
//   getCurrencyFromCountryCode,
// } from "@/utils/simpleLocationService";
// import { convertPrice } from "@/utils/convertPrice";

// const TicketCard = ({ data, field }) => {
//   const { icon2 } = useThemeColor();
//   const navigation = useNavigation();
//   const t = useT();

//   // Price conversion states for this specific attraction
//   const [convertedAdultPrice, setConvertedAdultPrice] = useState(null);
//   const [convertedChildPrice, setConvertedChildPrice] = useState(null);
//   const [displayCurrency, setDisplayCurrency] = useState(data?.currency);
//   const [isLoading, setIsLoading] = useState(true);

//   // Load price conversion for this attraction
//   useEffect(() => {
//     const loadPriceConversion = async () => {
//       try {
//         setIsLoading(true);

//         if (!data) {
//           setIsLoading(false);
//           return;
//         }

//         // Get user's country code
//         const countryCode = await getCountryCode();

//         // Get currency for user's country
//         const userCurrency = getCurrencyFromCountryCode(countryCode);

//         // Get attraction's original currency
//         const attractionCurrency = data?.currency || "USD";

//         // Convert adult price if currencies are different
//         let newConvertedAdultPrice;
//         let newConvertedChildPrice;
//         let newDisplayCurrency;

//         if (userCurrency !== attractionCurrency) {
//           // Convert both adult and child prices
//           newConvertedAdultPrice = await convertPrice(
//             data?.attractionAdultPrice,
//             attractionCurrency,
//             userCurrency
//           );

//           newConvertedChildPrice = await convertPrice(
//             data?.attractionChildPrice,
//             attractionCurrency,
//             userCurrency
//           );

//           newDisplayCurrency = userCurrency;
//         } else {
//           // Same currency, no conversion needed
//           newConvertedAdultPrice = data?.attractionAdultPrice;
//           newConvertedChildPrice = data?.attractionChildPrice;
//           newDisplayCurrency = attractionCurrency;
//         }

//         // Update local state
//         setConvertedAdultPrice(newConvertedAdultPrice);
//         setConvertedChildPrice(newConvertedChildPrice);
//         setDisplayCurrency(newDisplayCurrency);

//         // ✅ Directly update the data object with converted values
//         data.convertedAdultPrice = parseFloat(
//           newConvertedAdultPrice.toFixed(2)
//         );
//         data.convertedChildPrice = parseFloat(
//           newConvertedChildPrice.toFixed(2)
//         );
//         data.displayCurrency = newDisplayCurrency;
//       } catch (error) {
//         console.error("Attraction price conversion error:", error);

//         // Fallback to original values
//         setConvertedAdultPrice(data?.attractionAdultPrice);
//         setConvertedChildPrice(data?.attractionChildPrice);
//         setDisplayCurrency(data?.currency);

//         // Update with fallback values
//         data.convertedAdultPrice = parseFloat(
//           data?.attractionAdultPrice?.toFixed(2) || 0
//         );
//         data.convertedChildPrice = parseFloat(
//           data?.attractionChildPrice?.toFixed(2) || 0
//         );
//         data.displayCurrency = data?.currency || "USD";
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadPriceConversion();
//   }, [data?.id]);

//   // Determine display values
//   const displayAdultPrice =
//     data?.convertedAdultPrice ||
//     convertedAdultPrice ||
//     data?.attractionAdultPrice;
//   const displayChildPrice =
//     data?.convertedChildPrice ||
//     convertedChildPrice ||
//     data?.attractionChildPrice;
//   const displayCurrencySymbol =
//     data?.displayCurrency || displayCurrency || data?.currency;

//   console.log("Attraction Details:", {
//     name: data?.attractionDestinationType,
//     originalPrices: {
//       adult: data?.attractionAdultPrice,
//       child: data?.attractionChildPrice,
//       currency: data?.currency,
//     },
//     convertedPrices: {
//       adult: displayAdultPrice,
//       child: displayChildPrice,
//       currency: displayCurrencySymbol,
//     },
//     discount: data?.discount,
//   });

//   return (
//     <ThemedView styles="flex-row p-3 rounded-md border mb-3">
//       <Image
//         source={{ uri: data?.attractionImages?.[0] }}
//         className="w-24 h-42 rounded-md"
//         resizeMode="cover"
//       />
//       <View className="flex-1 ml-3 gap-2">
//         <ThemedText styles="font-SemiBold text-base">
//           {data?.attractionDestinationType}
//         </ThemedText>
//         <ThemedText3 styles="text-sm mt-1">
//           {data?.attractionDescription}
//         </ThemedText3>

//         <View className="flex-row gap-[0.5] datas-center mt-2">
//           <ThemedText3 styles="text-sm mr-2">
//             {data?.attractionAddress}, {data?.attractionCity}
//           </ThemedText3>
//         </View>

//         <View className="flex-row gap-[0.5] items-center mt-2">
//           <Text className="text-yellow-600 text-xs ml-1">
//             {data?.attractionRating} ({data?.attractionReviewCount}{" "}
//             {t("attractionBooking.ratingLabel")})
//           </Text>
//         </View>

//         {/* Price Display */}
//         <View className="gap-1">
//           <ThemedText3 styles="text-sm font-Medium">
//             {t("from")} {displayCurrencySymbol}{" "}
//             {isLoading ? "..." : displayAdultPrice?.toFixed(2)}
//             {/* <Text className="text-gray-500 text-xs">
//               {" "}
//               {t("attractionBooking.perAdult")}
//             </Text> */}
//           </ThemedText3>

//           {/* <ThemedText3 styles="text-sm font-Medium">
//             {displayCurrencySymbol}{" "}
//             {isLoading ? "..." : displayChildPrice?.toFixed(2)}
//             <Text className="text-gray-500 text-xs">
//               {" "}
//               {t("attractionBooking.perChild")}
//             </Text>
//           </ThemedText3> */}

//           {/* Show discount if available */}
//           {/* {data?.discount > 0 && (
//             <View className="mt-1">
//               <Text className="text-green-600 text-sm font-Medium">
//                 {data?.discount}% OFF Available
//               </Text>
//               <View className="flex-row items-center gap-1">
//                 <Text className="text-gray-500 text-xs line-through">
//                   Original: {data?.currency}{" "}
//                   {data?.attractionAdultPrice?.toFixed(2)} /{" "}
//                   {data?.attractionChildPrice?.toFixed(2)}
//                 </Text>
//               </View>
//             </View>
//           )} */}
//         </View>

//         <ThemedPressableWhite
//           onPress={() => {
//             navigation.navigate("UserAttractionBooking", {
//               screen: "UserAttractionDetail",
//             });
//             field.onChange(data);
//           }}
//           styles="p-2 border rounded-md flex-1 flex-row gap-2 justify-center items-center mt-2"
//         >
//           <ThemedText styles="font-Medium text-sm">
//             {t("seeAvailability")}
//           </ThemedText>
//         </ThemedPressableWhite>
//       </View>
//     </ThemedView>
//   );
// };

// export default function AttractionBookingAllTicketScreen({ route }) {
//   const navigation = useNavigation();
//   const { item } = route.params;
//   const { control, setValue } = useFormContext();

//   // Process all attractions with price conversion
//   const [attractions, setAttractions] = useState(item);

//   // Update all attractions with converted prices
//   useEffect(() => {
//     const updateAllAttractions = async () => {
//       try {
//         // Get user's country code once
//         const countryCode = await getCountryCode();
//         const userCurrency = getCurrencyFromCountryCode(countryCode);

//         // Update each attraction
//         const updatedAttractions = attractions.map((attraction) => {
//           const attractionCurrency = attraction?.currency || "USD";

//           let convertedAdultPrice = attraction?.attractionAdultPrice;
//           let convertedChildPrice = attraction?.attractionChildPrice;
//           let displayCurrency = attractionCurrency;

//           // If currencies are different, we'll mark them for conversion
//           // Actual conversion happens in each TicketCard component
//           if (userCurrency !== attractionCurrency) {
//             // We'll let each TicketCard handle its own conversion
//             // This is just for setting initial state
//             displayCurrency = userCurrency;
//           }

//           return {
//             ...attraction,
//             displayCurrency,
//             // convertedAdultPrice and convertedChildPrice will be set by each TicketCard
//           };
//         });

//         setAttractions(updatedAttractions);
//       } catch (error) {
//         console.error("Error updating attractions:", error);
//       }
//     };

//     if (attractions?.length > 0) {
//       updateAllAttractions();
//     }
//   }, []);

//   return (
//     <ThemedView
//       styles="flex-1"
//       style={{
//         paddingHorizontal: responsiveWidth(6),
//         paddingTop: responsiveHeight(5),
//         gap: responsiveHeight(3),
//       }}
//     >
//       <GoBack navigation={navigation} />
//       <FlatList
//         data={attractions}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <Controller
//             control={control}
//             name="selectedAttraction"
//             render={({ field }) => <TicketCard data={item} field={field} />}
//           />
//         )}
//         showsVerticalScrollIndicator={false}
//       />
//     </ThemedView>
//   );
// }

import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import ThemedView from "@/utils/ThemedView";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import GoBack from "@/components/GoBack";
import { useNavigation } from "@react-navigation/native";
import { useThemeColor } from "@/utils/useThemeColor";
import ThemedText from "@/utils/ThemedText";
import ThemedText3 from "@/utils/ThemedText3";
import ThemedPressableWhite from "@/utils/ThemedPressableWhite";
import useT from "@/utils/useT";
import { Controller, useFormContext } from "react-hook-form";
import {
  getCountryCode,
  getCurrencyFromCountryCode,
} from "@/utils/simpleLocationService";
import { convertPrice } from "@/utils/convertPrice";

const TicketCard = ({ data, field }) => {
  const { icon2 } = useThemeColor();
  const navigation = useNavigation();
  const t = useT();
  const { setValue } = useFormContext();

  // Store converted data separately
  const [convertedData, setConvertedData] = useState({
    ...data,
    convertedAdultPrice: null,
    convertedChildPrice: null,
    displayCurrency: data?.currency,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load price conversion for this attraction
  useEffect(() => {
    const loadPriceConversion = async () => {
      try {
        setIsLoading(true);

        if (!data) {
          setIsLoading(false);
          return;
        }

        // Get user's country code
        const countryCode = await getCountryCode();

        // Get currency for user's country
        const userCurrency = getCurrencyFromCountryCode(countryCode);

        // Get attraction's original currency
        const attractionCurrency = data?.currency || "USD";

        // Convert adult price if currencies are different
        let newConvertedAdultPrice;
        let newConvertedChildPrice;
        let newDisplayCurrency;

        if (userCurrency !== attractionCurrency) {
          // Convert both adult and child prices
          newConvertedAdultPrice = await convertPrice(
            data?.attractionAdultPrice,
            attractionCurrency,
            userCurrency
          );

          newConvertedChildPrice = await convertPrice(
            data?.attractionChildPrice,
            attractionCurrency,
            userCurrency
          );

          newDisplayCurrency = userCurrency;
        } else {
          // Same currency, no conversion needed
          newConvertedAdultPrice = data?.attractionAdultPrice;
          newConvertedChildPrice = data?.attractionChildPrice;
          newDisplayCurrency = attractionCurrency;
        }

        // Create updated object
        const updatedConvertedData = {
          ...data,
          convertedAdultPrice: parseFloat(newConvertedAdultPrice.toFixed(2)),
          convertedChildPrice: parseFloat(newConvertedChildPrice.toFixed(2)),
          displayCurrency: newDisplayCurrency,
        };

        // Update local state
        setConvertedData(updatedConvertedData);

        // Update form value for this attraction
        // We'll update when the card is selected
        console.log("✅ Converted attraction data:", updatedConvertedData);
      } catch (error) {
        console.error("Attraction price conversion error:", error);

        // Fallback to original values
        const fallbackConvertedData = {
          ...data,
          convertedAdultPrice: parseFloat(
            data?.attractionAdultPrice?.toFixed(2) || 0
          ),
          convertedChildPrice: parseFloat(
            data?.attractionChildPrice?.toFixed(2) || 0
          ),
          displayCurrency: data?.currency || "USD",
        };

        setConvertedData(fallbackConvertedData);
      } finally {
        setIsLoading(false);
      }
    };

    loadPriceConversion();
  }, [data?.id]);

  // Determine display values
  const displayAdultPrice =
    convertedData?.convertedAdultPrice || data?.attractionAdultPrice;
  const displayChildPrice =
    convertedData?.convertedChildPrice || data?.attractionChildPrice;
  const displayCurrencySymbol =
    convertedData?.displayCurrency || data?.currency;

  const handlePress = () => {
    // Update form with the converted data
    setValue("selectedAttraction", convertedData, {
      shouldValidate: false,
      shouldDirty: false,
    });

    console.log("🔄 Setting selectedAttraction:", {
      convertedAdultPrice: convertedData.convertedAdultPrice,
      convertedChildPrice: convertedData.convertedChildPrice,
      displayCurrency: convertedData.displayCurrency,
    });

    navigation.navigate("UserAttractionBooking", {
      screen: "UserAttractionDetail",
    });
  };

  return (
    <ThemedView styles="flex-row p-3 rounded-md border mb-3">
      <Image
        source={{ uri: convertedData?.attractionImages?.[0] }}
        className="w-24 h-42 rounded-md"
        resizeMode="cover"
      />
      <View className="flex-1 ml-3 gap-2">
        <ThemedText styles="font-SemiBold text-base">
          {convertedData?.attractionDestinationType}
        </ThemedText>
        <ThemedText3 styles="text-sm mt-1">
          {convertedData?.attractionDescription}
        </ThemedText3>

        <View className="flex-row gap-[0.5] datas-center mt-2">
          <ThemedText3 styles="text-sm mr-2">
            {convertedData?.attractionAddress}, {convertedData?.attractionCity}
          </ThemedText3>
        </View>

        <View className="flex-row gap-[0.5] items-center mt-2">
          <Text className="text-yellow-600 text-xs ml-1">
            {convertedData?.attractionRating} (
            {convertedData?.attractionReviewCount}{" "}
            {t("attractionBooking.ratingLabel")})
          </Text>
        </View>

        {/* Price Display */}
        <View className="gap-1">
          <ThemedText3 styles="text-sm font-Medium">
            {t("from")} {displayCurrencySymbol}{" "}
            {isLoading ? "..." : displayAdultPrice?.toFixed(2)}
          </ThemedText3>

          {/* Show original currency if different */}
          {/* {convertedData?.currency !== displayCurrencySymbol && (
            <ThemedText3 styles="text-xs text-gray-500">
              Original: {convertedData?.currency}{" "}
              {convertedData?.attractionAdultPrice?.toFixed(2)}
            </ThemedText3>
          )} */}

          {/* Show discount */}
          {/* {convertedData?.discount > 0 && (
            <ThemedText3 styles="text-sm text-green-600 font-Medium">
              {convertedData?.discount}% OFF Available
            </ThemedText3>
          )} */}
        </View>

        <ThemedPressableWhite
          onPress={handlePress}
          styles="p-2 border rounded-md flex-1 flex-row gap-2 justify-center items-center mt-2"
        >
          <ThemedText styles="font-Medium text-sm">
            {t("seeAvailability")}
          </ThemedText>
        </ThemedPressableWhite>
      </View>
    </ThemedView>
  );
};

export default function AttractionBookingAllTicketScreen({ route }) {
  const navigation = useNavigation();
  const { item } = route.params;
  const { control } = useFormContext();

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(5),
        gap: responsiveHeight(3),
      }}
    >
      <GoBack navigation={navigation} />
      <FlatList
        data={item}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Controller
            control={control}
            name="selectedAttraction"
            render={({ field }) => <TicketCard data={item} field={field} />}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}
