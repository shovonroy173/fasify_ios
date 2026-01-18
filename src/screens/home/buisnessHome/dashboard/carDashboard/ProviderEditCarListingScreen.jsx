/* eslint-disable react-native/no-inline-styles */
import {
  View,
  KeyboardAvoidingView,
  Platform,
  // TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
// import ThemedText3 from '@/utils/ThemedText3';
// import DropdownBox from '@/components/DropdownBox';
import ThemedText from "@/utils/ThemedText";
import ThemedTextInput from "@/utils/ThemedTextInput";
import Button from "@/components/Button";
import SuccessModal from "@/components/SuccessModal";
import WeeklySchedule from "@/components/WeeklySchedule";
import ThemedTextArea from "@/utils/ThemedTextArea";
// import DatePicker from '@/components/DatePicker';
import { countries, currencies } from "@/../assets/data/data";
import MultiImageUploadUI from "@/components/MultiImageUploadUI";
import MultiImagePickerModal from "@/components/MultiImagePickerModal";
import { useMultiImagePicker } from "@/utils/useMultiImagePicker";
// import DocumentsUploadUI from '@/components/DocumentUploadUI';
// import { useDocumentsPicker } from '@/utils/useDocumentsPicker';
import { useUpdateProviderCarListingMutation } from "@/redux/slices/providerSlice/carSlice";
import DropdownBox from "@/components/DropdownBox";

const ProviderEditCarListingScreen = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const { pickFromGalleryMulti } = useMultiImagePicker();
  // const { pickDocuments } = useDocumentsPicker();

  const [showModal, setShowModal] = useState(false);

  const [updateProviderCarListing] = useUpdateProviderCarListingMutation();

  const providerListingCar = watch("selectedActiveListingCar");

  const getPlaceholder = (fieldName) => {
    const value = providerListingCar?.[fieldName];
    if (value) return value;
    return "Type here...";
  };

  const getPlaceholderNumber = (fieldName) => {
    const value = providerListingCar?.[fieldName];
    if (value) return value.toString();
    return "0";
  };

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(5),
        paddingBottom: responsiveHeight(2),
        gap: responsiveHeight(5),
      }}
    >
      <View className="gap-5">
        <GoBack navigation={navigation} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={{ flex: 1 }}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1"> */}

        <ScrollView
          // className="flex-grow"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: responsiveHeight(2),
          }}
        >
          <ThemedText styles="font-SemiBold text-xl">
            Edit Car Listing Details
          </ThemedText>
          <ThemedText styles="font-SemiBold text-lg">
            Location Details
          </ThemedText>

          <View style={{ height: responsiveHeight(8) }}>
            <ThemedTextInput
              name="carAddress"
              control={control}
              error={errors?.carAddress?.message}
              label="Address"
              placeholder={getPlaceholder("carAddress")}
              type="text"
            />
          </View>

          <View style={{ flex: 1, height: responsiveHeight(8) }}>
            <ThemedTextInput
              name="carPostalCode"
              control={control}
              error={errors?.carPostalCode?.message}
              label="Postal Code"
              placeholder={getPlaceholder("carPostalCode")}
              type="text"
            />
          </View>
          <View style={{ flex: 1, height: responsiveHeight(8) }}>
            <ThemedTextInput
              name="carCity"
              control={control}
              error={errors?.carCity?.message}
              label="City"
              placeholder={getPlaceholder("carCity")}
              type="text"
            />
          </View>

          <View style={{ flex: 1, height: responsiveHeight(8) }}>
            <ThemedTextInput
              name="carDistrict"
              control={control}
              error={errors?.carDistrict?.message}
              label="District/State"
              placeholder={getPlaceholder("carDistrict")}
              type="text"
            />
          </View>

          <View style={{ flex: 1, height: responsiveHeight(6) }}>
            <ThemedText styles={`font-Medium text-md mb-1`}>Country</ThemedText>
            <DropdownBox name="carCountry" options={countries} zIndex={900} />
          </View>

          {/* Description */}
          <View>
            <ThemedTextArea
              name="carDescription"
              control={control}
              error={errors?.carDescription?.message}
              label="Car Description"
              placeholder={getPlaceholder("carDescription")}
              type="text"
            />
          </View>

          <Controller
            name="carImages"
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <>
                <MultiImageUploadUI
                  value={
                    value.length > 0
                      ? value
                      : providerListingCar?.carImages || []
                  }
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
          <View style={{ height: responsiveHeight(8) }}>
            <ThemedTextInput
              name="carServicesOffered"
              control={control}
              error={errors?.carServicesOffered?.message}
              label="Services Offered"
              // placeholder={getPlaceholder("carServicesOffered")}
              placeholder={"Service1, Service2.."}
              type="text"
            />
          </View>

          {/* Car Specifications Section */}
          <ThemedText styles="font-SemiBold text-lg">
            Car Specifications
          </ThemedText>

          <View style={{ height: responsiveHeight(8) }}>
            <ThemedTextInput
              name="carType"
              control={control}
              error={errors?.carType?.message}
              label="Car Type"
              placeholder={getPlaceholder("carType")}
              type="text"
            />
          </View>

          <View style={{ height: responsiveHeight(8) }}>
            <ThemedTextInput
              name="carSeats"
              control={control}
              error={errors?.carSeats?.message}
              label="Car Seats"
              placeholder={getPlaceholderNumber("carSeats")}
              type="number"
            />
          </View>

          <View style={{ flexDirection: "row", gap: responsiveWidth(2) }}>
            <View style={{ flex: 1, height: responsiveHeight(8) }}>
              <ThemedTextInput
                name="fuelType"
                control={control}
                error={errors?.fuelType?.message}
                label="Fuel Type"
                placeholder={getPlaceholder("fuelType")}
                type="text"
              />
            </View>
            <View style={{ flex: 1, height: responsiveHeight(8) }}>
              <ThemedTextInput
                name="carOilType"
                control={control}
                error={errors?.carOilType?.message}
                label="Oil Type"
                placeholder={getPlaceholder("carOilType")}
                type="text"
              />
            </View>
            <View style={{ flex: 1, height: responsiveHeight(8) }}>
              <ThemedTextInput
                name="carEngineType"
                control={control}
                error={errors?.carEngineType?.message}
                label="Engine Type"
                placeholder={getPlaceholder("carEngineType")}
                type="text"
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: responsiveWidth(2) }}>
            <View style={{ flex: 1, height: responsiveHeight(8) }}>
              <ThemedTextInput
                name="carTransmission"
                control={control}
                error={errors?.carTransmission?.message}
                label="Transmission"
                placeholder={getPlaceholder("carTransmission")}
                type="text"
              />
            </View>
            <View style={{ flex: 1, height: responsiveHeight(8) }}>
              <ThemedTextInput
                name="carPower"
                control={control}
                error={errors?.carPower?.message}
                label="Power (HP)"
                placeholder={getPlaceholder("carPower")}
                type="text"
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: responsiveWidth(2) }}>
            <View style={{ flex: 1, height: responsiveHeight(8) }}>
              <ThemedTextInput
                name="carDrivetrain"
                control={control}
                error={errors?.carDrivetrain?.message}
                label="Drivetrain"
                placeholder={getPlaceholder("carDrivetrain")}
                type="text"
              />
            </View>
            <View style={{ flex: 1, height: responsiveHeight(8) }}>
              <ThemedTextInput
                name="carMileage"
                control={control}
                error={errors?.carMileage?.message}
                label="Mileage"
                placeholder={getPlaceholder("carMileage")}
                type="text"
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: responsiveWidth(2) }}>
            <View style={{ flex: 1, height: responsiveHeight(8) }}>
              <ThemedTextInput
                name="carModel"
                control={control}
                error={errors?.carModel?.message}
                label="Car Model"
                placeholder={getPlaceholder("carModel")}
                type="text"
              />
            </View>
            <View style={{ flex: 1, height: responsiveHeight(8) }}>
              <ThemedTextInput
                name="carCapacity"
                control={control}
                error={errors?.carCapacity?.message}
                label="Capacity"
                placeholder={getPlaceholder("carCapacity")}
                type="text"
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: responsiveWidth(2) }}>
            <View style={{ flex: 1, height: responsiveHeight(8) }}>
              <ThemedTextInput
                name="carColor"
                control={control}
                error={errors?.carColor?.message}
                label="Car Color"
                placeholder={getPlaceholder("carColor")}
                type="text"
              />
            </View>
            <View style={{ flex: 1, height: responsiveHeight(8) }}>
              <ThemedTextInput
                name="gearType"
                control={control}
                error={errors?.gearType?.message}
                label="Gear Type"
                placeholder={getPlaceholder("gearType")}
                type="text"
              />
            </View>
          </View>

          {/* Pricing & Rating Section */}
          <ThemedText styles="font-SemiBold text-lg">
            Pricing & Rating
          </ThemedText>
          <View style={{ flex: 1, height: responsiveHeight(8) }}>
            <ThemedText styles={`font-Medium text-md mb-1`}>
              Currency
            </ThemedText>
            <DropdownBox name="currency" options={currencies} zIndex={1000} />
          </View>
          <View style={{ flexDirection: "row", gap: responsiveWidth(2) }}>
            <View style={{ flex: 1, height: responsiveHeight(8) }}>
              <ThemedTextInput
                name="carRating"
                control={control}
                error={errors?.carRating?.message}
                label="Rating"
                placeholder={getPlaceholderNumber("carRating")}
                type="number"
              />
            </View>
            <View style={{ flex: 1, height: responsiveHeight(8) }}>
              <ThemedTextInput
                name="carPriceDay"
                control={control}
                error={errors?.carPriceDay?.message}
                label="Price Per Day"
                placeholder={getPlaceholderNumber("carPriceDay")}
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
                placeholder={getPlaceholderNumber("discount")}
                type="number"
              />
            </View>
          </View>

          <View style={{ height: responsiveHeight(8) }}>
            <ThemedTextInput
              name="category"
              control={control}
              error={errors?.category?.message}
              label="Category (Optional)"
              placeholder={getPlaceholder("category")}
              type="text"
            />
          </View>

          {/* Booking Availability */}
          <WeeklySchedule name="carBookingAbleDays" control={control} />
        </ScrollView>
        {/* </TouchableWithoutFeedback> */}

        <View style={{ marginVertical: responsiveHeight(3) }}>
          <Button
            title="Submit"
            navigation={navigation}
            path={null} // Or string / object if you want navigation
            // ids={[
            //   "carAddress",
            //   "carPostalCode",
            //   "carCity",
            //   "carDistrict",
            //   "carCountry",
            //   "carDescription",
            //   "carImages",
            //   "carServicesOffered",
            //   "carType",
            //   "carSeats",
            //   "fuelType",
            //   "carOilType",
            //   "carEngineType",
            //   "carTransmission",
            //   "carPower",
            //   "carDrivetrain",
            //   "carMileage",
            //   "carModel",
            //   "carCapacity",
            //   "carColor",
            //   "gearType",
            //   "carRating",
            //   "carPriceDay",
            //   "discount",
            //   "currency",
            //   "category",
            //   "carBookingAbleDays",
            // ]}
            onComplete={() => setShowModal(true)}
            submission={updateProviderCarListing}
            isUpdateProviderListing={true}
          />
        </View>
        <SuccessModal visible={showModal} setVisible={setShowModal} />
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderEditCarListingScreen;
