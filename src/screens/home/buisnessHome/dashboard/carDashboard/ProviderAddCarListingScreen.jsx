/* eslint-disable react-native/no-inline-styles */
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
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
import ThemedText from "@/utils/ThemedText";
import ThemedTextInput from "@/utils/ThemedTextInput";
import WeeklySchedule from "@/components/WeeklySchedule";
import Button from "@/components/Button";
import ThemedTextArea from "@/utils/ThemedTextArea";
import MultiImageUploadUI from "@/components/MultiImageUploadUI";
import MultiImagePickerModal from "@/components/MultiImagePickerModal";
import SuccessModal from "@/components/SuccessModal";
import { useCreateCarListingMutation } from "@/redux/slices/providerSlice/carSlice";
import DropdownBox from "@/components/DropdownBox";
import { countries, currencies } from "@/../assets/data/data";

const ProviderAddCarListingScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    formState: { errors },
    reset,
    setValue,
  } = useFormContext();
  // const { pickFromGallery } = useImagePicker();
  const { pickFromGalleryMulti } = useMultiImagePicker();

  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [createCarListing] = useCreateCarListingMutation();

  useEffect(() => {
    // Address Information
    setValue("carAddress", "");
    setValue("carPostalCode", "");
    setValue("carCity", "");
    setValue("carDistrict", "");
    setValue("carCountry", "");

    // Description & Images
    setValue("carDescription", "");
    setValue("carImages", []);

    // Services
    setValue("carServicesOffered", "");

    // Car Specifications
    setValue("carType", "");
    setValue("carSeats", "");
    setValue("fuelType", "");
    setValue("carOilType", "");
    setValue("carEngineType", "");
    setValue("carTransmission", "");
    setValue("carPower", "");
    setValue("carDrivetrain", "");
    setValue("carMileage", "");
    setValue("carModel", "");
    setValue("carCapacity", "");
    setValue("carColor", "");
    setValue("gearType", "");

    // Pricing & Rating
    setValue("currency", "");
    setValue("carRating", "");
    setValue("carPriceDay", "");
    setValue("discount", "");
    setValue("category", "");

    // Booking Availability
    setValue("carBookingAbleDays", "");
  }, [setValue]);

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
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ gap: responsiveHeight(5) }}
          showsVerticalScrollIndicator={false}
        >
          {/* Address Section */}
          <TitleComponent
            title="Set Fare & Schedule"
            subTitle="Please set business information so we can setup our seller account."
          />
          <View style={{ height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="carAddress"
              control={control}
              error={errors?.carAddress?.message}
              label="Address"
              placeholder="Enter full address"
              type="text"
            />
          </View>

          {/* <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}> */}
          <View style={{ flex: 1, height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="carPostalCode"
              control={control}
              error={errors?.carPostalCode?.message}
              label="Postal Code"
              placeholder="Postal code"
              type="text"
            />
          </View>
          <View style={{ flex: 1, height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="carCity"
              control={control}
              error={errors?.carCity?.message}
              label="City"
              placeholder="City"
              type="text"
            />
          </View>
          {/* </View> */}

          {/* <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}> */}
          <View style={{ flex: 1, height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="carDistrict"
              control={control}
              error={errors?.carDistrict?.message}
              label="District/State"
              placeholder="District/State"
              type="text"
            />
          </View>
          {/* <View style={{ flex: 1, height: responsiveHeight(6) }}>
          <ThemedTextInput
            name="carCountry"
            control={control}
            error={errors?.carCountry?.message}
            label="Country"
            placeholder="Country"
            type="text"
          />
        </View> */}

          <View style={{ flex: 1, height: responsiveHeight(6) }}>
            <ThemedText styles={`font-Medium text-md mb-1`}>Country</ThemedText>
            <DropdownBox name="carCountry" options={countries} zIndex={900} />
          </View>
          {/* </View> */}

          {/* Description */}
          <View style={{ flex: 1, height: responsiveHeight(14) }}>
            <ThemedTextArea
              name="carDescription"
              control={control}
              error={errors?.carDescription?.message}
              label="Car Description"
              placeholder="Describe the car features, condition, and special details..."
              type="text"
            />
          </View>

          <Controller
            name="carImages"
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <>
                <MultiImageUploadUI
                  value={value}
                  label="Upload Car Images"
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

          {/* Services Offered */}
          <View style={{ height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="carServicesOffered"
              control={control}
              error={errors?.carServicesOffered?.message}
              label="Services Offered"
              placeholder="Enter services offered"
              type="text"
            />
          </View>

          {/* Car Specifications Section */}
          <ThemedText styles="font-SemiBold text-lg">
            Car Specifications
          </ThemedText>

          <View style={{ height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="carType"
              control={control}
              error={errors?.carType?.message}
              label="Car Type"
              placeholder="Enter car type"
              type="text"
            />
          </View>

          <View style={{ height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="carSeats"
              control={control}
              error={errors?.carSeats?.message}
              label="Car Seats"
              placeholder="Enter car seats"
              type="number"
            />
          </View>

          <View style={{ flexDirection: "row", gap: responsiveWidth(2) }}>
            <View style={{ flex: 1, height: responsiveHeight(6) }}>
              <ThemedTextInput
                name="fuelType"
                control={control}
                error={errors?.fuelType?.message}
                label="Fuel Type"
                placeholder="Petrol, Diesel, etc."
                type="text"
              />
            </View>
            <View style={{ flex: 1, height: responsiveHeight(6) }}>
              <ThemedTextInput
                name="carOilType"
                control={control}
                error={errors?.carOilType?.message}
                label="Fuel Type"
                placeholder="Petrol, Diesel, etc."
                type="text"
              />
            </View>
            <View style={{ flex: 1, height: responsiveHeight(6) }}>
              <ThemedTextInput
                name="carEngineType"
                control={control}
                error={errors?.carEngineType?.message}
                label="Engine Type"
                placeholder="Engine type"
                type="text"
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: responsiveWidth(2) }}>
            <View style={{ flex: 1, height: responsiveHeight(6) }}>
              <ThemedTextInput
                name="carTransmission"
                control={control}
                error={errors?.carTransmission?.message}
                label="Transmission"
                placeholder="Automatic/Manual"
                type="text"
              />
            </View>
            <View style={{ flex: 1, height: responsiveHeight(6) }}>
              <ThemedTextInput
                name="carPower"
                control={control}
                error={errors?.carPower?.message}
                label="Power (HP)"
                placeholder="Horsepower"
                type="text"
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: responsiveWidth(2) }}>
            <View style={{ flex: 1, height: responsiveHeight(6) }}>
              <ThemedTextInput
                name="carDrivetrain"
                control={control}
                error={errors?.carDrivetrain?.message}
                label="Drivetrain"
                placeholder="FWD, RWD, AWD"
                type="text"
              />
            </View>
            <View style={{ flex: 1, height: responsiveHeight(6) }}>
              <ThemedTextInput
                name="carMileage"
                control={control}
                error={errors?.carMileage?.message}
                label="Mileage"
                placeholder="km/l or mpg"
                type="text"
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: responsiveWidth(2) }}>
            <View style={{ flex: 1, height: responsiveHeight(6) }}>
              <ThemedTextInput
                name="carModel"
                control={control}
                error={errors?.carModel?.message}
                label="Car Model"
                placeholder="Model name"
                type="text"
              />
            </View>
            <View style={{ flex: 1, height: responsiveHeight(6) }}>
              <ThemedTextInput
                name="carCapacity"
                control={control}
                error={errors?.carCapacity?.message}
                label="Capacity"
                placeholder="Engine capacity"
                type="text"
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: responsiveWidth(2) }}>
            <View style={{ flex: 1, height: responsiveHeight(6) }}>
              <ThemedTextInput
                name="carColor"
                control={control}
                error={errors?.carColor?.message}
                label="Car Color"
                placeholder="Color"
                type="text"
              />
            </View>
            <View style={{ flex: 1, height: responsiveHeight(6) }}>
              <ThemedTextInput
                name="gearType"
                control={control}
                error={errors?.gearType?.message}
                label="Gear Type"
                placeholder="Gear type"
                type="text"
              />
            </View>
          </View>

          {/* Pricing & Rating Section */}
          <ThemedText styles="font-SemiBold text-lg">
            Pricing & Rating
          </ThemedText>
          <View style={{ flex: 1, height: responsiveHeight(6) }}>
            <ThemedText styles={`  font-Medium text-md mb-1`}>
              Currency
            </ThemedText>
            <DropdownBox name="currency" options={currencies} zIndex={1000} />
          </View>
          <View style={{ flexDirection: "row", gap: responsiveWidth(2) }}>
            <View style={{ flex: 1, height: responsiveHeight(6) }}>
              <ThemedTextInput
                name="carRating"
                control={control}
                error={errors?.carRating?.message}
                label="Rating"
                placeholder="0-5"
                type="number"
              />
            </View>
            <View style={{ flex: 1, height: responsiveHeight(6) }}>
              <ThemedTextInput
                name="carPriceDay"
                control={control}
                error={errors?.carPriceDay?.message}
                label="Price Per Day"
                placeholder="Price per day"
                type="number"
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: responsiveWidth(2) }}>
            <View style={{ flex: 1, height: responsiveHeight(8) }}>
              <ThemedTextInput
                name="discount"
                control={control}
                error={errors?.discount?.message}
                label="Discount %"
                placeholder="Discount percentage"
                type="number"
              />
            </View>
            {/* <View style={{ flex: 1, height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="vat"
              control={control}
              error={errors?.vat?.message}
              label="VAT %"
              placeholder="VAT percentage"
              type="number"
            />
          </View> */}
          </View>

          <View style={{ height: responsiveHeight(6) }}>
            <ThemedTextInput
              name="category"
              control={control}
              error={errors?.category?.message}
              label="Category (Optional)"
              placeholder="Car category"
              type="text"
            />
          </View>

          {/* Booking Availability */}
          <WeeklySchedule name="carBookingAbleDays" control={control} />
        </ScrollView>

        <View
          style={{
            marginVertical: responsiveHeight(3),
          }}
        >
          <Button
            title="Continue"
            navigation={navigation}
            path="ProviderCarDashboard"
            ids={[
              "carAddress",
              "carPostalCode",
              "carCity",
              "carDistrict",
              "carCountry",
              "carDescription",
              "carImages",
              "carServicesOffered",
              "carType",
              "carSeats",
              "fuelType",
              "carOilType",
              "carEngineType",
              "carTransmission",
              "carPower",
              "carDrivetrain",
              "carMileage",
              "carModel",
              "carCapacity",
              "carColor",
              "gearType",
              "carRating",
              "carPriceDay",
              "discount",
              "currency",
              "category",
              "carBookingAbleDays",
            ]}
            noicon={true}
            onComplete={() => setShowModal(true)}
            submission={createCarListing}
            isCarActiveListingCreate={true}
          />
        </View>
      </KeyboardAvoidingView>

      <SuccessModal visible={showModal} setVisible={setShowModal} />
    </ThemedView>
  );
};

export default ProviderAddCarListingScreen;
