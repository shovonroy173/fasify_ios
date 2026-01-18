// /* eslint-disable react/no-unstable-nested-components */
// /* eslint-disable react-native/no-inline-styles */
// import React from "react";
// import { View } from "react-native";
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from "react-native-responsive-dimensions";
// import ThemedText from "../utils/ThemedText";
// import ThemedView from "../utils/ThemedView";

// const PriceBreakdownComponent = ({
//   selectedRoom,
//   bookedFromDate,
//   bookedToDate,
//   rooms,
//   adults,
//   children,
// }) => {
//   // Calculate price details
//   const calculatePriceDetails = () => {
//     if (!selectedRoom || !bookedFromDate || !bookedToDate || !rooms) {
//       return null;
//     }

//     const pricePerNight = selectedRoom?.hotelRoomPriceNight || 0;
//     const discount = selectedRoom.discount || 0;

//     // Calculate number of nights
//     const fromDate = new Date(bookedFromDate);
//     const toDate = new Date(bookedToDate);
//     const nights = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24));

//     // Calculate base price
//     const basePrice = pricePerNight * nights * rooms;

//     // Calculate discount amount
//     const discountAmount = (basePrice * discount) / 100;

//     // Calculate subtotal
//     const subtotal = basePrice - discountAmount;

//     // Calculate tax (assuming 10% tax)
//     const taxRate = 0.05;
//     const taxAmount = subtotal * taxRate;

//     // Calculate service fee (assuming 5% service fee)
//     const serviceFeeRate = 0.05;
//     const serviceFee = subtotal * serviceFeeRate;

//     // Calculate total
//     const total = subtotal + taxAmount;

//     const currency = selectedRoom?.currency;

//     return {
//       nights,
//       pricePerNight,
//       basePrice,
//       discount,
//       discountAmount,
//       subtotal,
//       taxRate: taxRate * 100,
//       taxAmount,
//       serviceFeeRate: serviceFeeRate * 100,
//       serviceFee,
//       total,
//       currency,
//     };
//   };

//   const priceDetails = calculatePriceDetails();

//   const PriceDetailItem = ({
//     label,
//     value,
//     isTotal = false,
//     isDiscount = false,
//   }) => (
//     <View
//       style={{
//         flex: 1,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         paddingVertical: responsiveHeight(0.8),
//         borderBottomWidth: isTotal ? 2 : 1,
//         borderBottomColor: isTotal ? "#000" : "#e5e7eb",
//         width: "100%",
//       }}
//     >
//       <View className="w-1/2">
//         <ThemedText
//           styles={`font-${isTotal ? "Bold" : "Medium"}  ${
//             isTotal ? "text-lg" : "text-md"
//           } ${isDiscount ? "text-red-500" : ""}`}
//         >
//           {label}
//         </ThemedText>
//       </View>
//       <View className="w-1/2 items-end">
//         <ThemedText
//           styles={`font-${isTotal ? "Bold" : "Medium"}  text-wrap text-end ${
//             isTotal ? "text-lg" : "text-md"
//           } ${isDiscount ? "text-red-500" : ""}`}
//         >
//           {value}
//         </ThemedText>
//       </View>
//     </View>
//   );

//   if (!priceDetails) {
//     return (
//       <View
//         style={{
//           backgroundColor: "#f8f9fa",
//           borderRadius: 12,
//           padding: responsiveWidth(4),
//           marginTop: responsiveHeight(2),
//         }}
//       >
//         <ThemedText styles="font-Medium text-md text-center">
//           Complete booking details to see price breakdown
//         </ThemedText>
//       </View>
//     );
//   }

//   return (
//     <ThemedView
//       styles="border rounded-lg"
//       style={{
//         padding: responsiveWidth(4),
//       }}
//     >
//       <ThemedText styles="font-Bold text-xl mb-4">Price Breakdown</ThemedText>

//       <View style={{ gap: responsiveHeight(1) }}>
//         <PriceDetailItem
//           label={`${priceDetails.nights} night(s) × ${rooms} room(s)`}
//           value={`${priceDetails.currency} ${priceDetails.basePrice.toFixed(
//             2
//           )}`}
//         />

//         <PriceDetailItem
//           label={`${priceDetails.currency}${priceDetails.pricePerNight} × ${priceDetails.nights} nights × ${rooms} rooms`}
//           value={`${priceDetails.currency} ${priceDetails.basePrice.toFixed(
//             2
//           )}`}
//         />

//         {priceDetails.discount > 0 && (
//           <PriceDetailItem
//             label={`Discount (${priceDetails.discount}%)`}
//             value={`-${
//               priceDetails.currency
//             } ${priceDetails.discountAmount.toFixed(2)}`}
//             isDiscount={true}
//           />
//         )}

//         <PriceDetailItem
//           label="Price"
//           value={`${priceDetails.currency} ${priceDetails.subtotal.toFixed(2)}`}
//         />

//         <PriceDetailItem
//           label={`Vat (${priceDetails.taxRate}%)`}
//           value={`${priceDetails.currency} ${priceDetails.taxAmount.toFixed(
//             2
//           )}`}
//         />

//       </View>

//     </ThemedView>
//   );
// };

// export default PriceBreakdownComponent;

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import ThemedText from "../utils/ThemedText";
import ThemedView from "../utils/ThemedView";
import {
  getCountryCode,
  getCurrencyFromCountryCode,
} from "@/utils/simpleLocationService";
import { convertPrice } from "@/utils/convertPrice";

const PriceBreakdownComponent = ({
  selectedRoom,
  bookedFromDate,
  bookedToDate,
  rooms,
  adults,
  children,
}) => {
  // Price conversion states
  const [convertedPricePerNight, setConvertedPricePerNight] = useState(null);
  const [displayCurrency, setDisplayCurrency] = useState(
    selectedRoom?.currency
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPriceConversion = async () => {
      try {
        setIsLoading(true);

        if (!selectedRoom) {
          setIsLoading(false);
          return;
        }

        // Get user's country code
        const countryCode = await getCountryCode();
        // console.log("Price breakdown - User country code:", countryCode);

        // Get currency for user's country
        const userCurrency = getCurrencyFromCountryCode(countryCode);
        // console.log("Price breakdown - User currency:", userCurrency);

        // Get room's original currency
        const roomCurrency = selectedRoom?.currency || "USD";
        // console.log("Price breakdown - Room currency:", roomCurrency);

        // Convert price if currencies are different
        let newConvertedPrice;
        let newDisplayCurrency;

        if (userCurrency !== roomCurrency) {
          newConvertedPrice = await convertPrice(
            selectedRoom?.hotelRoomPriceNight,
            roomCurrency,
            userCurrency
          );
          console.log("Price breakdown - Converted price per night:", newConvertedPrice);
          newDisplayCurrency = userCurrency;
        } else {
          // Same currency, no conversion needed
          newConvertedPrice = selectedRoom?.hotelRoomPriceNight;
          newDisplayCurrency = roomCurrency;
        }

        setConvertedPricePerNight(newConvertedPrice);
        setDisplayCurrency(newDisplayCurrency);

        // Calculate discounted price
        const discount = selectedRoom.discount || 0;
        const discountedPrice = newConvertedPrice - (newConvertedPrice * discount / 100);

        // ✅ Directly update selectedRoom object with converted values
        selectedRoom.convertedPrice = parseFloat(newConvertedPrice.toFixed(2));
        selectedRoom.displayCurrency = newDisplayCurrency;
        selectedRoom.discountedPrice = parseFloat(discountedPrice.toFixed(2));
        selectedRoom.discount = discount;
        
        console.log("✅ Updated selectedRoom object directly:", {
          convertedPrice: selectedRoom.convertedPrice,
          displayCurrency: selectedRoom.displayCurrency,
          discountedPrice: selectedRoom.discountedPrice,
        });

      } catch (error) {
        console.error("Price breakdown conversion error:", error);
        // Fallback to original price on error
        const fallbackPrice = selectedRoom?.hotelRoomPriceNight;
        const discount = selectedRoom.discount || 0;
        const discountedPrice = fallbackPrice - (fallbackPrice * discount / 100);

        setConvertedPricePerNight(fallbackPrice);
        setDisplayCurrency(selectedRoom?.currency);

        // Update with fallback values
        selectedRoom.convertedPrice = parseFloat(fallbackPrice.toFixed(2));
        selectedRoom.displayCurrency = selectedRoom?.currency;
        selectedRoom.discountedPrice = parseFloat(discountedPrice.toFixed(2));
        selectedRoom.discount = discount;

      } finally {
        setIsLoading(false);
      }
    };

    loadPriceConversion();
  }, [selectedRoom]);

  // Calculate price details
  const calculatePriceDetails = () => {
    if (
      !selectedRoom ||
      !bookedFromDate ||
      !bookedToDate ||
      !rooms ||
      !convertedPricePerNight
    ) {
      return null;
    }

    const pricePerNight = convertedPricePerNight;
    const discount = selectedRoom.discount || 0;

    // Calculate number of nights
    const fromDate = new Date(bookedFromDate);
    const toDate = new Date(bookedToDate);
    const nights = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24));

    // Calculate base price
    const basePrice = pricePerNight * nights * rooms;

    // Calculate discount amount
    const discountAmount = (basePrice * discount) / 100;

    // Calculate subtotal
    const subtotal = basePrice - discountAmount;

    // Calculate tax (5% VAT)
    const taxRate = 0.05;
    const taxAmount = subtotal * taxRate;

    // Calculate service fee (5% service fee)
    const serviceFeeRate = 0.05;
    const serviceFee = subtotal * serviceFeeRate;

    // Calculate total
    const total = subtotal + taxAmount;

    const currency = displayCurrency;

    return {
      nights,
      pricePerNight,
      basePrice,
      discount,
      discountAmount,
      subtotal,
      taxRate: taxRate * 100,
      taxAmount,
      serviceFeeRate: serviceFeeRate * 100,
      serviceFee,
      total,
      currency,
    };
  };

  const priceDetails = calculatePriceDetails();

  const PriceDetailItem = ({
    label,
    value,
    isTotal = false,
    isDiscount = false,
  }) => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: responsiveHeight(0.8),
        borderBottomWidth: isTotal ? 0 : 1,
        borderBottomColor: isTotal ? "#000" : "#e5e7eb",
        width: "100%",
      }}
    >
      <View className="w-1/2">
        <ThemedText
          styles={`font-${isTotal ? "Bold" : "Medium"}  ${
            isTotal ? "text-lg" : "text-md"
          } ${isDiscount ? "text-red-500" : ""}`}
        >
          {label}
        </ThemedText>
      </View>
      <View className="w-1/2 items-end">
        <ThemedText
          styles={`font-${isTotal ? "Bold" : "Medium"}  text-wrap text-end ${
            isTotal ? "text-lg" : "text-md"
          } ${isDiscount ? "text-red-500" : ""}`}
        >
          {value}
        </ThemedText>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: 12,
          padding: responsiveWidth(4),
          marginTop: responsiveHeight(2),
        }}
      >
        <ThemedText styles="font-Medium text-md text-center">
          Loading price breakdown...
        </ThemedText>
      </View>
    );
  }

  if (!priceDetails) {
    return (
      <View
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: 12,
          padding: responsiveWidth(4),
          marginTop: responsiveHeight(2),
        }}
      >
        <ThemedText styles="font-Medium text-md text-center">
          Complete booking details to see price breakdown
        </ThemedText>
      </View>
    );
  }

  return (
    <ThemedView
      styles="border rounded-lg"
      style={{
        padding: responsiveWidth(4),
      }}
    >
      <ThemedText styles="font-Bold text-xl mb-4">Price Breakdown</ThemedText>

      <View style={{ gap: responsiveHeight(1) }}>
        <PriceDetailItem
          label={`${priceDetails.nights} night(s) × ${rooms} room(s)`}
          value={`${priceDetails.currency} ${priceDetails.basePrice.toFixed(
            2
          )}`}
        />

        <PriceDetailItem
          label={`${priceDetails.currency} ${priceDetails.pricePerNight.toFixed(2)} × ${priceDetails.nights} nights × ${rooms} rooms`}
          value={`${priceDetails.currency} ${priceDetails.basePrice.toFixed(
            2
          )}`}
        />

        {priceDetails.discount > 0 && (
          <PriceDetailItem
            label={`Discount (${priceDetails.discount}%)`}
            value={`-${
              priceDetails.currency
            } ${priceDetails.discountAmount.toFixed(2)}`}
            isDiscount={true}
          />
        )}

        <PriceDetailItem
          label="Price"
          value={`${priceDetails.currency} ${priceDetails.subtotal.toFixed(2)}`}
        />

        <PriceDetailItem
          label={`VAT (${priceDetails.taxRate}%)`}
          value={`${priceDetails.currency} ${priceDetails.taxAmount.toFixed(
            2
          )}`}
        />

        <View style={{ marginTop: responsiveHeight(1) }}>
          <PriceDetailItem
            label="Total Amount"
            value={`${priceDetails.currency} ${priceDetails.total.toFixed(2)}`}
            isTotal={true}
          />
        </View>
      </View>
    </ThemedView>
  );
};

export default PriceBreakdownComponent;
