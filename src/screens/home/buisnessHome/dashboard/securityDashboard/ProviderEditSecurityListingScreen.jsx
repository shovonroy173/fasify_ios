import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import React, { useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import { Controller, useFormContext } from "react-hook-form";
import { useMultiImagePicker } from "@/utils/useMultiImagePicker";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import TitleComponent from "@/components/TitleComponent";
import ThemedTextInput from "@/utils/ThemedTextInput";
import WeeklySchedule from "@/components/WeeklySchedule";
import Button from "@/components/Button";
import MultiImageUploadUI from "@/components/MultiImageUploadUI";
import MultiImagePickerModal from "@/components/MultiImagePickerModal";
import SuccessModal from "@/components/SuccessModal";
import { useUpdateProviderSecurityListingMutation } from "@/redux/slices/providerSlice/securitySlice";
import ThemedText from "@/utils/ThemedText";
import DropdownBox from "@/components/DropdownBox";
import { countries, currencies } from "@/../assets/data/data";

const ProviderEditSecurityListingScreen = () => {
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { pickFromGalleryMulti } = useMultiImagePicker();
  const [showModal, setShowModal] = useState(false);
  const [updateSecurityListing] = useUpdateProviderSecurityListingMutation();
  const providerSecurityGuard = getValues("selectedActiveListingSecurityGuard");
  console.log("LIN E AT 36", providerSecurityGuard);

  const getPlaceholder = (fieldName) => {
    const value = providerSecurityGuard?.[fieldName];
    if (value) return value;
    return "Type here...";
  };

  const getPlaceholderNumber = (fieldName) => {
    const value = providerSecurityGuard?.[fieldName];
    if (value) return value.toString();
    return "0";
  };

  const getPlaceholderPrice = (fieldName) => {
    const value = providerSecurityGuard?.[fieldName];
    if (value) return value.toString();
    return "0.00";
  };

  const getPlaceholderRating = (fieldName) => {
    const value = providerSecurityGuard?.[fieldName];
    if (value) return value.toString();
    return "0.0 to 5.0";
  };

  function arrayToString(arr, separator = ", ") {
    return arr.join(separator);
  }

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(5),
        gap: responsiveHeight(5),
      }}
    >
      <GoBack navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            gap: responsiveHeight(5),
          }}
          showsVerticalScrollIndicator={false}
        >
          <TitleComponent
            title="Edit Security Details"
            subTitle="Please set business information so we can setup our seller account."
          />
          {/* Basic Information */}
          <View style={{ height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="securityGuardName"
              control={control}
              error={errors?.securityGuardName?.message}
              label="Security Guard Name"
              placeholder={getPlaceholder("securityGuardName")}
            />
          </View>

          <View style={{ height: responsiveHeight(8) }}>
            <ThemedTextInput
              name="securityGuardDescription"
              control={control}
              error={errors?.securityGuardDescription?.message}
              label="Description"
              placeholder={getPlaceholder("securityGuardDescription")}
              multiline
              numberOfLines={3}
            />
          </View>

          <Controller
            name="securityImages"
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <>
                <MultiImageUploadUI
                  value={
                    value.length > 0
                      ? value
                      : providerSecurityGuard?.securityImages || []
                  }
                  label="Upload Security Images"
                  onPress={() => setModalVisible(true)}
                  onRemove={(idx) => {
                    const updated = [...value];
                    updated.splice(idx, 1);
                    onChange(updated);
                  }}
                />

                <MultiImagePickerModal
                  visible={modalVisible}
                  onClose={() => setModalVisible(false)}
                  onPickGallery={() =>
                    pickFromGalleryMulti(
                      (newUris) => {
                        const combined = [...value, ...newUris].slice(0, 5);
                        onChange(combined);
                      },
                      () => setModalVisible(false)
                    )
                  }
                />
              </>
            )}
          />

          {/* Address Information */}
          <View style={{ height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="securityAddress"
              control={control}
              error={errors?.securityAddress?.message}
              label="Address"
              placeholder={getPlaceholder("securityAddress")}
            />
          </View>

          {/* <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}> */}
          <View style={{ height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="securityPostalCode"
              control={control}
              error={errors?.securityPostalCode?.message}
              label="Postal Code"
              placeholder={getPlaceholder("securityPostalCode")}
            />
          </View>
          <View style={{ height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="securityDistrict"
              control={control}
              error={errors?.securityDistrict?.message}
              label="District"
              placeholder={getPlaceholder("securityDistrict")}
            />
          </View>
          {/* </View> */}

          {/* <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}> */}
          <View style={{ height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="securityCity"
              control={control}
              error={errors?.securityCity?.message}
              label="City"
              placeholder={getPlaceholder("securityCity")}
            />
          </View>

          <View style={{ height: responsiveHeight(6) }}>
            <ThemedText styles={`font-Medium text-md mb-1`}>Country</ThemedText>
            <DropdownBox
              name="securityCountry"
              options={countries}
              zIndex={900}
            />
          </View>
          {/* </View> */}

          {/* Professional Information */}
          <View style={{ height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="experience"
              control={control}
              error={errors?.experience?.message}
              label="Experience (Years)"
              placeholder={getPlaceholderNumber("experience")}
              type="number"
            />
          </View>

          <View style={{ height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="certification"
              control={control}
              error={errors?.certification?.message}
              label="Certification"
              placeholder={getPlaceholder("certification")}
            />
          </View>

          {/* Services & Languages */}
          <View style={{ height: responsiveHeight(8) }}>
            <ThemedTextInput
              name="securityServicesOffered"
              control={control}
              error={errors?.securityServicesOffered?.message}
              label="Services Offered"
              placeholder={arrayToString(
                getPlaceholder("securityServicesOffered")
              )}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={{ height: responsiveHeight(8) }}>
            <ThemedTextInput
              name="languages"
              control={control}
              error={errors?.languages?.message}
              label="Languages Spoken"
              placeholder={arrayToString(getPlaceholder("languages"))}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Availability */}
          <View style={{ height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="availability"
              control={control}
              error={errors?.availability?.message}
              label="Availability"
              placeholder={getPlaceholder("availability")}
            />
          </View>

          {/* Pricing & Rating */}
          <View style={{ height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="securityRating"
              control={control}
              error={errors?.securityRating?.message}
              label="Rating"
              placeholder={getPlaceholderRating("securityRating")}
              type="number"
            />
          </View>

          <View style={{ height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="securityPriceDay"
              control={control}
              error={errors?.securityPriceDay?.message}
              label="Price Per Day"
              placeholder={getPlaceholderNumber("securityPriceDay")}
              type="number"
            />
          </View>

          <View>
            <ThemedText styles={`  font-Medium text-md mb-1`}>
              Currency
            </ThemedText>
            <DropdownBox name="currency" options={currencies} zIndex={1000} />
          </View>

          <View style={{ height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="discount"
              control={control}
              error={errors?.discount?.message}
              label="Security Discount"
              placeholder={getPlaceholderNumber("discount")}
              type="number"
            />
          </View>

          {/* Category (Optional) */}
          <View style={{ height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="category"
              control={control}
              error={errors?.category?.message}
              label="Category (Optional)"
              placeholder={getPlaceholder("category")}
            />
          </View>

          {/* Weekly Schedule */}
          <WeeklySchedule name="securityBookingAbleDays" control={control} />
        </ScrollView>
        <View
          style={{
            marginVertical: responsiveHeight(3),
          }}
        >

        <Button
          title="Continue"
          navigation={navigation}
          // path="ProviderBottomTab"
          path={null}
          // ids={[
          //   "securityGuardName",
          //   "securityGuardDescription",
          //   "securityAddress",
          //   "securityPostalCode",
          //   "securityDistrict",
          //   "securityCity",
          //   "securityCountry",
          //   "experience",
          //   "certification",
          //   "securityServicesOffered",
          //   "languages",
          //   "availability",
          //   "securityRating",
          //   "securityPriceDay",
          //   "discount",
          //   // 'vat',
          //   "category",
          //   "securityBookingAbleDays",
          // ]}
          noicon={true}
          onComplete={() => setShowModal(true)}
          submission={updateSecurityListing}
          isSecurityProfileUpdate={true}
        />
        </View>

      </KeyboardAvoidingView>

      <SuccessModal visible={showModal} setVisible={setShowModal} />
    </ThemedView>
  );
};

export default ProviderEditSecurityListingScreen;
