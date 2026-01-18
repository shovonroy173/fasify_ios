import { View } from "react-native";
import React from "react";
import { useFormContext } from "react-hook-form";
import ProviderHotelBookingScreen from "@/screens/providerTabs/hotelTabs/ProviderHotelBookingScreen";
import ProviderCarBookingScreen from "@/screens/providerTabs/carTabs/ProviderCarBookingScreen";
import ProviderSecurityBookingScreen from "@/screens/providerTabs/securityTabs/ProviderSecurityBookingScreen";
import ProviderAttractionBookingScreen from "@/screens/providerTabs/attractionTabs/ProviderAttractionBookingScreen";
import { useSelector } from "react-redux";
import { getBusinessTypeName } from "@/utils/getBusinessType";

const ProviderBookingBusinessScreen = () => {
  // const { getValues } = useFormContext();
  // const { businessType } = getValues();
  // console.log("business type LINE AT 11", businessType);
  const res = useSelector((state) => state.auth.res);
    const { getValues } = useFormContext();
    const { businessType } = getValues();

  return (
    <View className="flex-1">
      {getBusinessTypeName(res) === "hotel" || businessType?.id === "hotel" ? (
        <ProviderHotelBookingScreen />
      ) : getBusinessTypeName(res) === "car" || businessType?.id === "car" ? (
        <ProviderCarBookingScreen />
      ) : getBusinessTypeName(res) === "security" ||  businessType?.id === "security" ? (
        <ProviderSecurityBookingScreen />
      ) : (
        <ProviderAttractionBookingScreen />
      )}
    </View>
  );
};

export default ProviderBookingBusinessScreen;
