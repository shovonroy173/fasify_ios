// /* eslint-disable react-native/no-inline-styles */
// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   FlatList,
// } from "react-native";
// // import FontAwesome from 'react-native-vector-icons/FontAwesome';
// // import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// // import Feather from 'react-native-vector-icons/Feather';
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from "react-native-responsive-dimensions";
// import ThemedView from "../utils/ThemedView";
// import ThemedText from "../utils/ThemedText";
// import ThemedText3 from "../utils/ThemedText3";
// import { Star } from "lucide-react-native";
// const { width } = Dimensions.get("window");

// const HotelRoomCard = ({ room, onBookRoom }) => {
//   // console.log('LINE AT 8', room);
//   const renderImage = ({ item }) => (
//     <Image
//       source={{ uri: item }}
//       style={{
//         width: width * 0.8,
//         height: responsiveHeight(22),
//         borderRadius: 16,
//         marginRight: 12,
//       }}
//       resizeMode="cover"
//     />
//   );

//   console.log("LINE AT 39", room);

//   return (
//     <ThemedView
//       styles=" rounded-2xl border border-gray-200 shadow-sm"
//       style={{ padding: responsiveWidth(4), gap: responsiveHeight(1.5) }}
//     >
//       {/* Image */}
//       {room.hotelRoomImages?.length > 0 && (
//         <FlatList
//           data={room.hotelRoomImages}
//           renderItem={renderImage}
//           keyExtractor={(item, index) => index.toString()}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           snapToAlignment="start"
//           decelerationRate="fast"
//           pagingEnabled={false}
//         />
//       )}

//       {/* Title and rating */}
//       <View className="flex-row justify-between items-center mt-2">
//         <ThemedText styles="text-lg font-SemiBold  flex-1">
//           {room.hotelRoomType}
//         </ThemedText>
//         <View className="flex-row items-center">
//           <Star size={18} color="#FE8814" />

//           <ThemedText3 styles=" font-Medium ml-1">
//             {room.hotelRating}
//           </ThemedText3>
//         </View>
//       </View>

//       {/* Location & Category */}
//       <View className="flex-row items-center">
//         <ThemedText3 styles=" font-Medium ml-1">{room.category} </ThemedText3>
//       </View>

//       {/* Price & discount */}
//       <View className="flex-row items-center justify-between">
//         <ThemedText styles="font-Medium">{room?.currency} </ThemedText>
//         <ThemedText styles="text-lg font-SemiBold  flex-1">
//           {room?.hotelRoomPriceNight}/night
//         </ThemedText>

//         {room.discount > 0 && (
//           <Text className="text-sm text-pink-600 font-semibold">
//             {room?.discount}% OFF
//           </Text>
//         )}
//       </View>

//       {/* Availability */}
//       {/* <Text
//         className={`text-sm font-medium ${
//           room.isBooked === 'AVAILABLE' ? 'text-green-600' : 'text-red-500'
//         }`}
//       >
//         {room.isBooked}
//       </Text> */}

//       {/* View Details */}
//       <TouchableOpacity
//         onPress={() => onBookRoom(room)}
//         className="bg-blue-500 rounded-xl py-3 flex-row items-center justify-center mt-2"
//       >
//         <Text className="text-white font-medium text-base mr-2">Book Now</Text>
//         {/* <Feather name="chevron-right" size={20} color="#fff" /> */}
//       </TouchableOpacity>
//     </ThemedView>
//   );
// };

// export default HotelRoomCard;

/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import ThemedView from "../utils/ThemedView";
import ThemedText from "../utils/ThemedText";
import ThemedText3 from "../utils/ThemedText3";
import { Star } from "lucide-react-native";
import {
  getCountryCode,
  getCurrencyFromCountryCode,
} from "@/utils/simpleLocationService";
import { convertPrice } from "@/utils/convertPrice";

const { width } = Dimensions.get("window");

const HotelRoomCard = ({ room, onBookRoom }) => {
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [displayCurrency, setDisplayCurrency] = useState(room?.currency);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPriceConversion = async () => {
      try {
        setIsLoading(true);

        // Get user's country code
        const countryCode = await getCountryCode();
        // console.log("Room card - User country code:", countryCode);

        // Get currency for user's country
        const userCurrency = getCurrencyFromCountryCode(countryCode);
        // console.log("Room card - User currency:", userCurrency);

        // Get room's original currency
        const roomCurrency = room?.currency || "USD";
        // console.log("Room card - Room currency:", roomCurrency);

        // Convert price if currencies are different
        if (userCurrency !== roomCurrency) {
          const newPrice = await convertPrice(
            room?.hotelRoomPriceNight,
            roomCurrency,
            userCurrency
          );
          console.log("Room card - Converted price:", newPrice);
          setConvertedPrice(newPrice.toFixed(2));
          setDisplayCurrency(userCurrency);
        } else {
          // Same currency, no conversion needed
          setConvertedPrice(room?.hotelRoomPriceNight);
          setDisplayCurrency(roomCurrency);
        }
      } catch (error) {
        console.error("Room price conversion error:", error);
        // Fallback to original price on error
        setConvertedPrice(room?.hotelRoomPriceNight);
        setDisplayCurrency(room?.currency);
      } finally {
        setIsLoading(false);
      }
    };

    if (room) {
      loadPriceConversion();
    }
  }, [room]);

  const renderImage = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={{
        width: width * 0.8,
        height: responsiveHeight(22),
        borderRadius: 16,
        marginRight: 12,
      }}
      resizeMode="cover"
    />
  );

  console.log("LINE AT 39", room);

  // Display price (use converted if available, otherwise original)
  const priceToDisplay =
    convertedPrice !== null ? convertedPrice : room?.hotelRoomPriceNight;
  const currencyToDisplay = displayCurrency || room?.currency;

  return (
    <ThemedView
      styles="rounded-2xl border border-gray-200 shadow-sm"
      style={{ padding: responsiveWidth(4), gap: responsiveHeight(1.5) }}
    >
      {/* Image */}
      {room.hotelRoomImages?.length > 0 && (
        <FlatList
          data={room.hotelRoomImages}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          decelerationRate="fast"
          pagingEnabled={false}
        />
      )}

      {/* Title and rating */}
      <View className="flex-row justify-between items-center mt-2">
        <ThemedText styles="text-lg font-SemiBold flex-1">
          {room.hotelRoomType}
        </ThemedText>
        <View className="flex-row items-center">
          <Star size={18} color="#FE8814" />
          <ThemedText3 styles="font-Medium ml-1">
            {room.hotelRating}
          </ThemedText3>
        </View>
      </View>

      {/* Location & Category */}
      <View className="flex-row items-center">
        <ThemedText3 styles="font-Medium ml-1">{room.category} </ThemedText3>
      </View>

      {/* Price & discount */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <ThemedText styles="font-Medium">{currencyToDisplay} </ThemedText>
          <ThemedText styles="text-lg font-SemiBold">
            {isLoading ? "..." : priceToDisplay}/night
          </ThemedText>
        </View>

        {room.discount > 0 && (
          <Text className="text-sm text-pink-600 font-semibold">
            {room?.discount}% OFF
          </Text>
        )}
      </View>

      {/* Availability */}
      {/* <Text
        className={`text-sm font-medium ${
          room.isBooked === 'AVAILABLE' ? 'text-green-600' : 'text-red-500'
        }`}
      >
        {room.isBooked}
      </Text> */}

      {/* View Details */}
      <TouchableOpacity
        onPress={() => onBookRoom(room)}
        className="bg-blue-500 rounded-xl py-3 flex-row items-center justify-center mt-2"
      >
        <Text className="text-white font-medium text-base mr-2">Book Now</Text>
        {/* <Feather name="chevron-right" size={20} color="#fff" /> */}
      </TouchableOpacity>
    </ThemedView>
  );
};

export default HotelRoomCard;
