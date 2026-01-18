import { View } from "react-native";
import React from "react";
import { useFormContext } from "react-hook-form";
import ProviderHotelActiveListingStack from "@/stack/ProviderHotelActiveListingStack";
import ProviderCarActiveListingStack from "@/stack/ProviderCarActiveListingStack";
import ProviderSecurityActiveListingStack from "@/stack/ProviderSecurityActiveListingStack";
import ProviderAttractionActiveListingStack from "@/stack/ProviderAttractionActiveListingStack";
import { useSelector } from "react-redux";
import { getBusinessTypeName } from "@/utils/getBusinessType";

const ProviderActiveListingBusinessScreen = () => {
  const res = useSelector((state) => state.auth.res);
  // console.log('LINE AT ', res);
  const { getValues } = useFormContext();
  const { businessType } = getValues();

  return (
    <View className="flex-1">
      {getBusinessTypeName(res) === "hotel" || businessType?.id === "hotel" ? (
        <ProviderHotelActiveListingStack />
      ) : getBusinessTypeName(res) === "car" || businessType?.id === "car" ? (
        <ProviderCarActiveListingStack />
      ) : getBusinessTypeName(res) === "security" ||
        businessType?.id === "security" ? (
        <ProviderSecurityActiveListingStack />
      ) : (
        <ProviderAttractionActiveListingStack />
      )}
    </View>
  );
};

export default ProviderActiveListingBusinessScreen;
