import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import TitleComponent from "@/components/TitleComponent";
import Button from "@/components/Button";
import WeeklySchedule from "@/components/WeeklySchedule";
import { Controller, useFormContext } from "react-hook-form";
import ThemedTextInput from "@/utils/ThemedTextInput";
import MultiImageUploadUI from "@/components/MultiImageUploadUI";
import MultiImagePickerModal from "@/components/MultiImagePickerModal";
import { useMultiImagePicker } from "@/utils/useMultiImagePicker";
import ThemedText from "@/utils/ThemedText";
import DropdownBox from "@/components/DropdownBox";
import { countries, currencies } from "@/../assets/data/data";

const ProviderSecurityBusinessListingScreen = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { pickFromGalleryMulti } = useMultiImagePicker();

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(5),
      }}
    >
      <GoBack navigation={navigation} />

      <ScrollView
        contentContainerStyle={{
          gap: responsiveHeight(5),
        }}
        showsVerticalScrollIndicator={false}
      >
        <TitleComponent
          title="Set Fare & Schedule"
          subTitle="Please set business information so we can setup our seller account."
        />
        {/* Basic Information */}
        <View style={{ height: responsiveHeight(6) }}>
          <ThemedTextInput
            name="securityGuardName"
            control={control}
            error={errors?.securityGuardName?.message}
            label="Security Guard Name"
            placeholder="Type here.."
          />
        </View>

        <View style={{ height: responsiveHeight(8) }}>
          <ThemedTextInput
            name="securityGuardDescription"
            control={control}
            error={errors?.securityGuardDescription?.message}
            label="Description"
            placeholder="Type here.."
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
                value={value}
                label="Upload Guard Images"
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
            placeholder="Enter full address"
          />
        </View>

        {/* <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}> */}
        <View style={{ height: responsiveHeight(6) }}>
          <ThemedTextInput
            name="securityPostalCode"
            control={control}
            error={errors?.securityPostalCode?.message}
            label="Postal Code"
            placeholder="Postal code"
          />
        </View>
        <View style={{ height: responsiveHeight(6) }}>
          <ThemedTextInput
            name="securityDistrict"
            control={control}
            error={errors?.securityDistrict?.message}
            label="District"
            placeholder="District"
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
            placeholder="City"
          />
        </View>
        {/* <View style={{ height: responsiveHeight(6) }}>
          <ThemedTextInput
            name="securityCountry"
            control={control}
            error={errors?.securityCountry?.message}
            label="Country"
            placeholder="Country"
          />
        </View> */}

        <View>
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
            placeholder="Years of experience"
            type="number"
          />
        </View>

        <View style={{ height: responsiveHeight(6) }}>
          <ThemedTextInput
            name="certification"
            control={control}
            error={errors?.certification?.message}
            label="Certification"
            placeholder="Enter certifications"
          />
        </View>

        {/* Services & Languages */}
        <View style={{ height: responsiveHeight(8) }}>
          <ThemedTextInput
            name="securityServicesOffered"
            control={control}
            error={errors?.securityServicesOffered?.message}
            label="Services Offered"
            placeholder="Enter services (comma separated)"
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
            placeholder="Enter languages (comma separated)"
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
            placeholder="e.g., 24/7, Weekdays only"
          />
        </View>

        {/* Pricing & Rating */}
        <View style={{ height: responsiveHeight(6) }}>
          <ThemedTextInput
            name="securityRating"
            control={control}
            error={errors?.securityRating?.message}
            label="Rating"
            placeholder="Under 5.."
            type="number"
          />
        </View>

        <View style={{ height: responsiveHeight(6) }}>
          <ThemedTextInput
            name="securityPriceDay"
            control={control}
            error={errors?.securityPriceDay?.message}
            label="Price Per Day"
            placeholder="Enter your price"
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
            placeholder="Enter discount"
            type="number"
          />
        </View>

        {/* <View style={{ height: responsiveHeight(6) }}>
          <ThemedTextInput
            name="vat"
            control={control}
            error={errors?.vat?.message}
            label="Security VAT"
            placeholder="Enter VAT"
            type="number"
          />
        </View> */}

        {/* Category (Optional) */}
        <View style={{ height: responsiveHeight(6) }}>
          <ThemedTextInput
            name="category"
            control={control}
            error={errors?.category?.message}
            label="Category (Optional)"
            placeholder="Enter category"
          />
        </View>

        {/* Weekly Schedule */}
        <WeeklySchedule name="securityBookingAbleDays" control={control} />
      </ScrollView>
      <View
        style={{
          marginBottom: responsiveHeight(3),
        }}
      >
        <Button
          title="Continue"
          navigation={navigation}
          // path="ProviderBottomTab"
          path="ProviderCarBusinessListingReview"
          ids={[
            "securityGuardName",
            "securityGuardDescription",
            "securityAddress",
            "securityPostalCode",
            "securityDistrict",
            "securityCity",
            "securityCountry",
            "experience",
            "certification",
            "securityServicesOffered",
            "languages",
            "availability",
            "securityRating",
            "securityPriceDay",
            "discount",
            // 'vat',
            "category",
            "securityBookingAbleDays",
            "currency",
          ]}
          noicon={true}
        />
      </View>
    </ThemedView>
  );
};

export default ProviderSecurityBusinessListingScreen;
