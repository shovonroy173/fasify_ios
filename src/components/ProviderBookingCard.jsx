import React from "react";
import { View, Text } from "react-native";
import ThemedView from "../utils/ThemedView";
import ThemedText from "../utils/ThemedText";
import ThemedText3 from "../utils/ThemedText3";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { getBusinessTypeName } from "@/utils/getBusinessType";

export default function ProviderBookingCard({ item, onAccept, onReject }) {
  // map API status → UI styles
  const getStatusClasses = () => {
    switch (item?.bookingStatus) {
      case "PENDING":
        return "bg-[#FF8A0033] text-[#FF8A00]";
      case "CONFIRMED":
        return "bg-green-100 text-green-600";
      case "REJECTED":
        return "bg-red-100 text-red-500";
      default:
        return "bg-yellow-100 text-orange-500";
    }
  };

  const getStatusText = () => {
    switch (item?.bookingStatus) {
      case "PENDING":
        return "Pending";
      case "CONFIRMED":
        return "Confirmed";
      case "CANCELLED":
        return "Cancelled";
      default:
        return "Pending";
    }
  };

  // const { getValues } = useFormContext();
  // const { businessType } = getValues();
  console.log("business type LINE AT 11", item);

  const res = useSelector((state) => state.auth.res);

  return (
    <ThemedView styles="border rounded-2xl p-6">
      {/* Header */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <ThemedText3 styles="text-xs font-Medium mb-0.5">
            {getBusinessTypeName(res) === "hotel"
              ? "Hotel"
              : getBusinessTypeName(res) === "car"
                ? "Car"
                : getBusinessTypeName(res) === "security"
                  ? "Security"
                  : "Attraction"}
          </ThemedText3>
          <ThemedText styles="text-base font-SemiBold">
            {getBusinessTypeName(res) === "hotel"
              ? item?.hotel?.hotelBusinessName
              : getBusinessTypeName(res) === "car"
                ? item?.car?.carName
                : getBusinessTypeName(res) === "security"
                  ? item?.security?.securityName
                  : "Atraction"}
          </ThemedText>
        </View>

        <Text
          className={`text-xs font-SemiBold self-start px-4 py-1.5 rounded-lg ${getStatusClasses()}`}
        >
          {getStatusText()}
        </Text>
      </View>

      {/* Content */}
      <View className="gap-4">
        <View className="flex-row justify-between">
          <View className="flex-1 mr-4">
            <ThemedText3 styles="text-xs font-Medium mb-1">
              Booking ID
            </ThemedText3>
            <ThemedText styles="text-base font-SemiBold">
              #{item?.id}
            </ThemedText>
          </View>
          <View className="flex-1">
            <ThemedText3 styles="text-xs font-Medium mb-1 text-right">
              Category
            </ThemedText3>
            <ThemedText styles="text-base font-Medium text-right">
              {item?.category || "—"}
            </ThemedText>
          </View>
        </View>

        <View className="flex-row justify-between">
          {getBusinessTypeName(res) === "hotel" && (
            <View className="flex-1 mr-4">
              <ThemedText3 styles="text-xs font-Medium mb-1">Rooms</ThemedText3>
              <ThemedText styles="text-base font-Medium">
                {item?.rooms} ({item?.adults} Adults, {item?.children} Children)
              </ThemedText>
            </View>
          )}

          <View className="flex-1">
            <ThemedText3 styles="text-xs font-Medium mb-1 text-right">
              Price
            </ThemedText3>
            <ThemedText styles="text-base font-Bold text-right">
              {item?.displayCurrency} {item?.totalPrice}
            </ThemedText>
          </View>
        </View>
        {getBusinessTypeName(res) === "attractions" && (
          <View className="flex-row justify-between">
            <ThemedText3 styles="text-base font-Medium mb-1">
              {item?.date}
            </ThemedText3>
            <ThemedText3 styles="text-base font-Medium mb-1">
              {item?.day}
            </ThemedText3>
          </View>
        )}

        <View className="flex-row justify-between">
          <View className="flex-1 mr-4">
            <ThemedText3 styles="text-xs font-Medium mb-1">
              {getBusinessTypeName(res) === "hotel" ? "Check-in" : "From"}
            </ThemedText3>
            <ThemedText styles="text-base font-Medium">
              {getBusinessTypeName(res) === "hotel"
                ? item?.bookedFromDate
                : getBusinessTypeName(res) === "car"
                  ? item?.carBookedFromDate
                  : getBusinessTypeName(res) === "security"
                    ? item?.securityBookedFromDate
                    : item?.timeSlot?.from}

              {/* {item?.bookedFromDate} */}
            </ThemedText>
          </View>
          <View className="flex-1">
            <ThemedText3 styles="text-xs font-Medium mb-1 text-right">
              {getBusinessTypeName(res) === "hotel" ? "Check-out" : "To"}
            </ThemedText3>
            <ThemedText styles="text-base font-Medium text-right">
              {getBusinessTypeName(res) === "hotel"
                ? item?.bookedToDate
                : getBusinessTypeName(res) === "car"
                  ? item?.carBookedToDate
                  : getBusinessTypeName(res) === "security"
                    ? item?.securityBookedToDate
                    : item?.timeSlot?.to}
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Actions (only if pending) */}
      {/* {item?.bookingStatus === 'PENDING' && (
        <View className="flex-row gap-3 mt-6">
          <Text
            onPress={onReject}
            className="flex-1 py-3 rounded-xl border text-center font-SemiBold"
          >
            Reject
          </Text>
          <Text
            onPress={onAccept}
            className="flex-1 py-3 rounded-xl bg-green-600 text-white text-center font-SemiBold"
          >
            Accept
          </Text>
        </View>
      )} */}
    </ThemedView>
  );
}
