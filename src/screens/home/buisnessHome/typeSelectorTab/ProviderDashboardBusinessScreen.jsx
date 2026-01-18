import { View } from "react-native";
import React from "react";
import { useFormContext } from "react-hook-form";
import ProviderHotelHomeStack from "@/screens/providerTabs/hotelTabs/ProviderHotelHomeStack";
import ProviderCarHomeStack from "@/screens/providerTabs/carTabs/ProviderCarHomeStack";
import ProviderSecurityHomeStack from "@/screens/providerTabs/securityTabs/ProviderSecurityHomeStack";
import ProviderAttractionHomeStack from "@/screens/providerTabs/attractionTabs/ProviderAttractionHomeStack";
import { useSelector } from "react-redux";
import { getBusinessTypeName } from "@/utils/getBusinessType";

const ProviderDashboardBusinessScreen = () => {
  const res = useSelector((state) => state.auth.res);
  // console.log("LINE AT ", res);
  const { getValues } = useFormContext();
  const { businessType } = getValues();
  return (
    <View className="flex-1">
      {getBusinessTypeName(res) === "hotel" || businessType?.id === "hotel" ? (
        <ProviderHotelHomeStack />
      ) : getBusinessTypeName(res) === "car" || businessType?.id === "car" ? (
        <ProviderCarHomeStack />
      ) : getBusinessTypeName(res) === "security" ||
        businessType?.id === "security" ? (
        <ProviderSecurityHomeStack />
      ) : (
        <ProviderAttractionHomeStack />
      )}
    </View>
  );
};

export default ProviderDashboardBusinessScreen;
