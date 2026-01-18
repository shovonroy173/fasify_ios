// import {
//   View,
//   //   Text,
//   ScrollView,
//   Image,
//   StyleSheet,
//   //   useColorScheme,
// } from "react-native";
// import React from "react";
// import { useNavigation } from "@react-navigation/native";
// import { useFormContext } from "react-hook-form";
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from "react-native-responsive-dimensions";
// import ThemedView from "@/utils/ThemedView";
// import ThemedText from "@/utils/ThemedText";
// import DateRangeSelectorWithModal from "@/components/DateRangeSelectorWithModal";
// import CounterInput from "@/components/ControllerInput";
// import CustomCounterInput from "@/components/CustomControllerInput";
// import Button from "@/components/Button";
// import useT from "@/utils/useT";
// import GoBack from "@/components/GoBack";
// // import ThemedText2 from '@/utils/ThemeText2';

// const HotelBookingHotelBookCredentialScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const { control } = useFormContext();
//   const t = useT();
//   //   const theme = useColorScheme();

//   const { room } = route.params || {};

//   // console.log('Room data:', room);

//   return (
//     <ThemedView
//       styles="flex-1"
//       style={{
//         paddingHorizontal: responsiveWidth(6),
//         paddingVertical: responsiveHeight(5),
//         gap: responsiveHeight(2),
//       }}
//     >
//       <GoBack navigation={navigation} />

//       <ScrollView
//         contentContainerStyle={{
//           gap: responsiveHeight(3),
//         }}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Room Header Section */}
//         <ThemedView styles="flex-row">
//           {room?.hotelRoomImages?.[0] && (
//             <Image
//               source={{ uri: room.hotelRoomImages[0] }}
//               style={styles.roomImage}
//             />
//           )}
//           <View style={styles.roomInfo}>
//             <ThemedText styles="font-Bold text-xl">
//               {room?.hotelRoomType || "Room"}
//             </ThemedText>
//             <ThemedText styles="font-Medium text-gray-600 mt-1">
//               {room?.hotelRoomDescription || "Room description not available"}
//             </ThemedText>
//           </View>
//         </ThemedView>
//         <ThemedView
//           styles="border rounded-lg"
//           style={{
//             width: responsiveWidth(86),
//             padding: responsiveWidth(3),
//           }}
//         >
//           <ThemedText styles="font-SemiBold text-lg mb-2">
//             Room Summary
//           </ThemedText>
//           <View style={styles.roomDetails}>
//             <ThemedText styles="font-Medium">
//               Capacity: {room?.hotelRoomCapacity || "N/A"}
//             </ThemedText>
//           </View>
//           <View style={styles.roomDetails}>
//             <ThemedText styles="font-SemiBold text-lg text-green-600">
//               Price: {room?.currency} {room?.hotelRoomPriceNight || "0"} / night
//             </ThemedText>
//           </View>
//           {room?.discount > 0 && (
//             <ThemedText styles="font-Medium text-red-500">
//               {room.discount}% discount applied
//             </ThemedText>
//           )}
//           <View style={styles.summaryItem}>
//             <ThemedText styles="font-Medium">Room Type:</ThemedText>
//             <ThemedText styles="font-Medium">{room?.hotelRoomType}</ThemedText>
//           </View>
//           <View style={styles.summaryItem}>
//             <ThemedText styles="font-Medium">Category:</ThemedText>
//             <ThemedText styles="font-Medium">{room?.category}</ThemedText>
//           </View>
//           <View style={styles.summaryItem}>
//             <ThemedText styles="font-Medium">Rating:</ThemedText>
//             <ThemedText styles="font-Medium">
//               {room?.hotelRating}/5.0
//             </ThemedText>
//           </View>
//           {/* <View style={styles.summaryItem}>
//             <ThemedText styles="font-Medium">Available Rooms:</ThemedText>
//             <ThemedText styles="font-Medium">
//               {room?.hotelNumberOfRooms}
//             </ThemedText>
//           </View> */}
//         </ThemedView>
//         {/* Booking Details Section */}
//         {/* <ThemedView> */}
//         <ThemedText styles="font-Bold text-2xl mb-4">
//           Booking Details
//         </ThemedText>

//         {/* Date Range Selector */}
//         <ThemedView
//           styles="border rounded-lg"
//           style={{
//             width: responsiveWidth(86),
//             padding: responsiveWidth(3),
//           }}
//         >
//           <ThemedText styles="font-SemiBold text-lg mb-2">
//             Select Dates
//           </ThemedText>
//           <DateRangeSelectorWithModal
//             fromName="bookedFromDate"
//             toName="bookedToDate"
//           />
//         </ThemedView>

//         {/* Guest Information */}
//         <ThemedView
//           styles="border rounded-lg"
//           style={{
//             width: responsiveWidth(86),
//             padding: responsiveWidth(3),
//           }}
//         >
//           <ThemedText styles="font-SemiBold text-lg mb-3">
//             Guest Information
//           </ThemedText>

//           <CustomCounterInput
//             control={control}
//             name="rooms"
//             label={t("hotelBooking.rooms")}
//             min={1}
//           />

//           {/* <CounterInput
//                         control={control}
//                         name="adults"
//                         label={t('attractionBooking.adults')}
//                       /> */}
//           <CustomCounterInput
//             control={control}
//             name="adults"
//             label={t("attractionBooking.adults")}
//             min={2}
//           />

//           <CounterInput
//             control={control}
//             name="children"
//             label={t("attractionBooking.children")}
//             minValue={0}
//             maxValue={10}
//           />
//         </ThemedView>

//         {/* Room Details Summary */}

//         {/* Search Button */}
//         {/* <View style={styles.buttonContainer}> */}
//         <Button
//           title={t("hotelDetails.select")}
//           noicon={true}
//           navigation={navigation}
//           path="UserHotelHotelBook"
//           ids={[
//             "bookedFromDate",
//             "bookedToDate",
//             "rooms",
//             "adults",
//             // 'children',
//           ]}
//         />
//         {/* </View> */}
//         {/* </ThemedView> */}
//       </ScrollView>
//     </ThemedView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: responsiveWidth(6),
//     paddingTop: responsiveHeight(2),
//   },
//   roomHeader: {
//     flexDirection: "row",
//     marginBottom: responsiveHeight(3),
//     backgroundColor: "#f8f9fa",
//     borderRadius: 12,
//     padding: responsiveWidth(4),
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   roomImage: {
//     width: responsiveWidth(30),
//     height: responsiveHeight(15),
//     borderRadius: 8,
//     marginRight: responsiveWidth(4),
//   },
//   roomInfo: {
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   roomDetails: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: responsiveHeight(1),
//   },
//   bookingSection: {
//     marginBottom: responsiveHeight(4),
//   },
//   section: {
//     marginBottom: responsiveHeight(3),
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     padding: responsiveWidth(4),
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   summarySection: {
//     backgroundColor: "#f8f9fa",
//     borderRadius: 12,
//     padding: responsiveWidth(4),
//     marginBottom: responsiveHeight(3),
//   },
//   summaryItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: responsiveHeight(0.5),
//     borderBottomWidth: 1,
//     borderBottomColor: "#e9ecef",
//   },
//   buttonContainer: {
//     marginTop: responsiveHeight(2),
//   },
//   searchButton: {
//     width: "100%",
//   },
// });

// export default HotelBookingHotelBookCredentialScreen;

import { View, ScrollView, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormContext } from "react-hook-form";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import ThemedView from "@/utils/ThemedView";
import ThemedText from "@/utils/ThemedText";
import DateRangeSelectorWithModal from "@/components/DateRangeSelectorWithModal";
import CounterInput from "@/components/ControllerInput";
import CustomCounterInput from "@/components/CustomControllerInput";
import Button from "@/components/Button";
import useT from "@/utils/useT";
import GoBack from "@/components/GoBack";
import {
  getCountryCode,
  getCurrencyFromCountryCode,
} from "@/utils/simpleLocationService";
import { convertPrice } from "@/utils/convertPrice";

const HotelBookingHotelBookCredentialScreen = ({ route }) => {
  const navigation = useNavigation();
  const { control } = useFormContext();
  const t = useT();

  const { room } = route.params || {};

  // Price conversion states
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [displayCurrency, setDisplayCurrency] = useState(room?.currency);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const loadPriceConversion = async () => {
      try {
        setIsLoading(true);

        // Get user's country code
        const countryCode = await getCountryCode();
        // console.log("Credential screen - User country code:", countryCode);

        // Get currency for user's country
        const userCurrency = getCurrencyFromCountryCode(countryCode);
        // console.log("Credential screen - User currency:", userCurrency);

        // Get room's original currency
        const roomCurrency = room?.currency || "USD";
        // console.log("Credential screen - Room currency:", roomCurrency);

        // Convert price if currencies are different
        if (userCurrency !== roomCurrency) {
          const newPrice = await convertPrice(
            room?.hotelRoomPriceNight,
            roomCurrency,
            userCurrency
          );
          console.log("Credential screen - Converted price:", newPrice);
          setConvertedPrice(newPrice.toFixed(2));
          setDisplayCurrency(userCurrency);
        } else {
          // Same currency, no conversion needed
          setConvertedPrice(room?.hotelRoomPriceNight);
          setDisplayCurrency(roomCurrency);
        }
      } catch (error) {
        console.error("Credential screen price conversion error:", error);
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

  // Display price (use converted if available, otherwise original)
  const priceToDisplay =
    convertedPrice !== null ? convertedPrice : room?.hotelRoomPriceNight;
  const currencyToDisplay = displayCurrency || room?.currency;

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(2),
      }}
    >
      <GoBack navigation={navigation} />

      <ScrollView
        contentContainerStyle={{
          gap: responsiveHeight(3),
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Room Header Section */}
        <ThemedView styles="flex-row">
          {room?.hotelRoomImages?.[0] && (
            <Image
              source={{ uri: room.hotelRoomImages[0] }}
              style={styles.roomImage}
            />
          )}
          <View style={styles.roomInfo}>
            <ThemedText styles="font-Bold text-xl">
              {room?.hotelRoomType || "Room"}
            </ThemedText>
            <ThemedText styles="font-Medium text-gray-600 mt-1">
              {room?.hotelRoomDescription || "Room description not available"}
            </ThemedText>
          </View>
        </ThemedView>

        {/* Room Summary Section */}
        <ThemedView
          styles="border rounded-lg"
          style={{
            width: responsiveWidth(86),
            padding: responsiveWidth(3),
          }}
        >
          <ThemedText styles="font-SemiBold text-lg mb-2">
            Room Summary
          </ThemedText>
          <View style={styles.roomDetails}>
            <ThemedText styles="font-Medium">
              Capacity: {room?.hotelRoomCapacity || "N/A"}
            </ThemedText>
          </View>
          <View style={styles.roomDetails}>
            <ThemedText styles="font-SemiBold text-lg text-green-600">
              Price: {currencyToDisplay} {isLoading ? "..." : priceToDisplay} /
              night
            </ThemedText>
          </View>
          {room?.discount > 0 && (
            <ThemedText styles="font-Medium text-red-500">
              {room.discount}% discount applied
            </ThemedText>
          )}
          <View style={styles.summaryItem}>
            <ThemedText styles="font-Medium">Room Type:</ThemedText>
            <ThemedText styles="font-Medium">{room?.hotelRoomType}</ThemedText>
          </View>
          <View style={styles.summaryItem}>
            <ThemedText styles="font-Medium">Category:</ThemedText>
            <ThemedText styles="font-Medium">{room?.category}</ThemedText>
          </View>
          <View style={styles.summaryItem}>
            <ThemedText styles="font-Medium">Rating:</ThemedText>
            <ThemedText styles="font-Medium">
              {room?.hotelRating}/5.0
            </ThemedText>
          </View>
        </ThemedView>

        {/* Booking Details Section */}
        <ThemedText styles="font-Bold text-2xl mb-4">
          Booking Details
        </ThemedText>

        {/* Date Range Selector */}
        <ThemedView
          styles="border rounded-lg"
          style={{
            width: responsiveWidth(86),
            padding: responsiveWidth(3),
          }}
        >
          <ThemedText styles="font-SemiBold text-lg mb-2">
            Select Dates
          </ThemedText>
          <DateRangeSelectorWithModal
            fromName="bookedFromDate"
            toName="bookedToDate"
          />
        </ThemedView>

        {/* Guest Information */}
        <ThemedView
          styles="border rounded-lg"
          style={{
            width: responsiveWidth(86),
            padding: responsiveWidth(3),
          }}
        >
          <ThemedText styles="font-SemiBold text-lg mb-3">
            Guest Information
          </ThemedText>

          <CustomCounterInput
            control={control}
            name="rooms"
            label={t("hotelBooking.rooms")}
            min={1}
          />

          <CustomCounterInput
            control={control}
            name="adults"
            label={t("attractionBooking.adults")}
            min={2}
          />

          <CounterInput
            control={control}
            name="children"
            label={t("attractionBooking.children")}
            minValue={0}
            maxValue={10}
          />
        </ThemedView>

        {/* Search Button */}
        <Button
          title={t("hotelDetails.select")}
          noicon={true}
          navigation={navigation}
          path="UserHotelHotelBook"
          ids={["bookedFromDate", "bookedToDate", "rooms", "adults"]}
        />
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(2),
  },
  roomHeader: {
    flexDirection: "row",
    marginBottom: responsiveHeight(3),
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: responsiveWidth(4),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roomImage: {
    width: responsiveWidth(30),
    height: responsiveHeight(15),
    borderRadius: 8,
    marginRight: responsiveWidth(4),
  },
  roomInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  roomDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: responsiveHeight(1),
  },
  bookingSection: {
    marginBottom: responsiveHeight(4),
  },
  section: {
    marginBottom: responsiveHeight(3),
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: responsiveWidth(4),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summarySection: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: responsiveWidth(4),
    marginBottom: responsiveHeight(3),
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: responsiveHeight(0.5),
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  buttonContainer: {
    marginTop: responsiveHeight(2),
  },
  searchButton: {
    width: "100%",
  },
});

export default HotelBookingHotelBookCredentialScreen;
