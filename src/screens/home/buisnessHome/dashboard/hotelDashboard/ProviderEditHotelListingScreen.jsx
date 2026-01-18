import {
  View,
  KeyboardAvoidingView,
  Platform,
  // TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  useColorScheme,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useImagePicker } from "@/utils/useImagePicker";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import ThemedText from "@/utils/ThemedText";
import ThemedText3 from "@/utils/ThemedText3";
import DropdownBox from "@/components/DropdownBox";
import {
  countries,
  hotelAccomodationTypes,
  hotelBusinessTypes,
} from "assets/data/data";
import ThemedTextInput from "@/utils/ThemedTextInput";
import ThemedTextArea from "@/utils/ThemedTextArea";
import ImageUploadUI from "@/components/ImageUploadUI";
import ImagePickerModal from "@/utils/ImagePickerModal";
import Button from "@/components/Button";
import SuccessModal from "@/components/SuccessModal";
import DatePicker from "@/components/DatePicker";
import DocumentsUploadUI from "@/components/DocumentUploadUI";
import { useDocumentsPicker } from "@/utils/useDocumentsPicker";
import { useUpdateProviderHotelMutation } from "@/redux/slices/providerSlice/hotelSlice";
import ThemedCheckbox from "@/utils/ThemedCheckbox";

const ProviderEditHotelListingScreen = () => {
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext();

  const theme = useColorScheme();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { pickFromGallery } = useImagePicker();
  const { pickDocuments } = useDocumentsPicker();

  const [updateProviderHotel] = useUpdateProviderHotelMutation();

  const providerHotel = getValues("selectedActiveListing");

  // console.log("Hotel Data:", providerHotel);

  // Get placeholder text for each field
  const getPlaceholder = (fieldName) => {
    const value = providerHotel?.[fieldName];
    if (value) return value;
    return "Type here...";
  };

  // Get checkbox default checked state
  const getCheckboxDefault = (fieldName) => {
    const value = Boolean(providerHotel?.[fieldName]) || false;
    console.log("LINE AT value", value);
    return value;
  };

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(5),
        // paddingBottom: responsiveHeight(2),
        gap: responsiveHeight(5),
      }}
    >
      <View className="gap-5">
        <GoBack navigation={navigation} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={{ flex: 1 }}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1"> */}
        <ScrollView
          className="flex-grow"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: responsiveHeight(2),
          }}
        >
          <ThemedText styles="font-SemiBold text-xl">
            Edit Business Details
          </ThemedText>

          {/* Business Information */}
          <ThemedTextInput
            name="hotelBusinessName"
            control={control}
            error={errors?.hotelBusinessName?.message}
            label="Business Name"
            placeholder={getPlaceholder("hotelBusinessName")}
            type="text"
          />

          <ThemedTextInput
            name="hotelName"
            control={control}
            error={errors?.hotelName?.message}
            label="Full Name"
            placeholder={getPlaceholder("hotelName")}
            type="text"
          />

          <View>
            <ThemedText styles={`font-Medium text-md mb-1`}>
              Business Type
            </ThemedText>
            <DropdownBox
              name="hotelBusinessType"
              options={hotelBusinessTypes}
              zIndex={1000}
              placeholder={getPlaceholder("hotelBusinessType")}
            />
          </View>

          <ThemedTextInput
            name="hotelRegNum"
            control={control}
            error={errors?.hotelRegNum?.message}
            label="Government Registration Number"
            placeholder={getPlaceholder("hotelRegNum")}
            type="text"
          />

          <DatePicker
            name="hotelRegDate"
            control={control}
            label="Date of Business Registration (DOB)"
            error={errors?.hotelRegDate?.message}
            placeholder={getPlaceholder("hotelRegDate")}
          />

          <ThemedTextInput
            name="hotelPhone"
            control={control}
            error={errors?.hotelPhone?.message}
            label="Phone"
            placeholder={getPlaceholder("hotelPhone")}
            type="number"
          />

          <ThemedTextInput
            name="hotelEmail"
            control={control}
            error={errors?.hotelEmail?.message}
            label="Email"
            placeholder={getPlaceholder("hotelEmail")}
            type="email"
          />

          {/* Business Branding */}
          <ThemedTextInput
            name="businessTagline"
            control={control}
            error={errors?.businessTagline?.message}
            label="Business Tagline"
            placeholder={getPlaceholder("businessTagline")}
            type="text"
          />

          <ThemedTextArea
            name="businessDescription"
            control={control}
            error={errors?.businessDescription?.message}
            label="Business Description"
            placeholder={getPlaceholder("businessDescription")}
            type="text"
          />

          <View>
            <ThemedText styles={`font-Medium text-md mb-1`}>
              Accommodation Type
            </ThemedText>
            <DropdownBox
              name="hotelAccommodationType"
              options={hotelAccomodationTypes}
              zIndex={900}
              placeholder={getPlaceholder("hotelAccommodationType")}
            />
          </View>

          <Controller
            name="businessLogo"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <ImageUploadUI
                  value={value || providerHotel?.businessLogo}
                  label="Upload Hotel Picture"
                  onPress={() => setModalVisible(true)}
                />

                <ImagePickerModal
                  visible={modalVisible}
                  onClose={() => setModalVisible(false)}
                  onPickGallery={() =>
                    pickFromGallery(onChange, () => setModalVisible(false))
                  }
                />
              </>
            )}
          />

          {/* Policies */}
          <ThemedTextInput
            name="hotelBookingCondition"
            control={control}
            error={errors?.hotelBookingCondition?.message}
            label="Booking Condition"
            placeholder={getPlaceholder("hotelBookingCondition")}
            type="text"
          />

          <ThemedTextArea
            name="hotelCancelationPolicy"
            control={control}
            error={errors?.hotelCancelationPolicy?.message}
            label="Cancelation Policy"
            placeholder={getPlaceholder("hotelCancelationPolicy")}
            type="text"
          />

          {/* Documents */}
          <Controller
            name="hotelDocs"
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <DocumentsUploadUI
                label="Business Registration and Policy Docs"
                docs={value.length > 0 ? value : providerHotel?.hotelDocs || []}
                onPick={() =>
                  pickDocuments((files) => {
                    const combined = [...value, ...files].slice(0, 5);
                    onChange(combined);
                  })
                }
                onRemove={(idx) => {
                  const updated = [...value];
                  updated.splice(idx, 1);
                  onChange(updated);
                }}
              />
            )}
          />

          {/* Location Details */}
          <ThemedTextInput
            name="hotelAddress"
            control={control}
            error={errors?.hotelAddress?.message}
            label="Address"
            placeholder={getPlaceholder("hotelAddress")}
            type="text"
          />

          <ThemedTextInput
            name="hotelCity"
            control={control}
            error={errors?.hotelCity?.message}
            label="City"
            placeholder={getPlaceholder("hotelCity")}
            type="text"
          />

          <ThemedTextInput
            name="hotelPostalCode"
            control={control}
            error={errors?.hotelPostalCode?.message}
            label="Postal Code"
            placeholder={getPlaceholder("hotelPostalCode")}
            type="text"
          />

          <ThemedTextInput
            name="hotelDistrict"
            control={control}
            error={errors?.hotelDistrict?.message}
            label="District / State / Province"
            placeholder={getPlaceholder("hotelDistrict")}
            type="text"
          />

          <View>
            <ThemedText styles={`font-Medium text-md mb-1`}>Country</ThemedText>
            <DropdownBox
              name="hotelCountry"
              options={countries}
              zIndex={900}
              placeholder={getPlaceholder("hotelCountry")}
            />
          </View>

          {/* Amenities */}
          <View className="flex-row flex-wrap justify-between">
            <View className="w-1/2">
              <ThemedCheckbox
                label="Air Conditioning"
                name="hotelAC"
                control={control}
                error={errors?.hotelAC?.message}
                defaultChecked={getCheckboxDefault("hotelAC")}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Parking"
                name="hotelParking"
                control={control}
                error={errors?.hotelParking?.message}
                defaultChecked={getCheckboxDefault("hotelParking")}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="WiFi"
                name="hoitelWifi"
                control={control}
                error={errors?.hoitelWifi?.message}
                defaultChecked={getCheckboxDefault("hoitelWifi")}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Breakfast"
                name="hotelBreakfast"
                control={control}
                error={errors?.hotelBreakfast?.message}
                defaultChecked={getCheckboxDefault("hotelBreakfast")}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Swimming Pool"
                name="hotelPool"
                control={control}
                error={errors?.hotelPool?.message}
                defaultChecked={getCheckboxDefault("hotelPool")}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="TV"
                name="hotelTv"
                control={control}
                error={errors?.hotelTv?.message}
                defaultChecked={getCheckboxDefault("hotelTv")}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Washing Machine"
                name="hotelWashing"
                control={control}
                error={errors?.hotelWashing?.message}
                defaultChecked={getCheckboxDefault("hotelWashing")}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Kitchen"
                name="hotelKitchen"
                control={control}
                error={errors?.hotelKitchen?.message}
                defaultChecked={getCheckboxDefault("hotelKitchen")}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Restaurant"
                name="hotelRestaurant"
                control={control}
                error={errors?.hotelRestaurant?.message}
                defaultChecked={getCheckboxDefault("hotelRestaurant")}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Gym"
                name="hotelGym"
                control={control}
                error={errors?.hotelGym?.message}
                defaultChecked={getCheckboxDefault("hotelGym")}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Spa"
                name="hotelSpa"
                control={control}
                error={errors?.hotelSpa?.message}
                defaultChecked={getCheckboxDefault("hotelSpa")}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="24-Hour Front Desk"
                name="hotel24HourFrontDesk"
                control={control}
                error={errors?.hotel24HourFrontDesk?.message}
                defaultChecked={getCheckboxDefault("hotel24HourFrontDesk")}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Airport Shuttle"
                name="hotelAirportShuttle"
                control={control}
                error={errors?.hotelAirportShuttle?.message}
                defaultChecked={getCheckboxDefault("hotelAirportShuttle")}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Coffee Bar"
                name="hotelCoffeeBar"
                control={control}
                error={errors?.hotelCoffeeBar?.message}
                defaultChecked={getCheckboxDefault("hotelCoffeeBar")}
              />
            </View>
          </View>

          {/* Smoking Preferences */}
          <ThemedText3 styles={`text-lg font-Bold mb-2`}>
            Smoking Preferences
          </ThemedText3>

          <View className="flex-row flex-wrap justify-between">
            <View className="w-1/2">
              <ThemedCheckbox
                label="Smoking Allowed"
                name="hotelSmoking"
                control={control}
                error={errors?.hotelSmoking?.message}
                defaultChecked={getCheckboxDefault("hotelSmoking")}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="No Smoking Preference"
                name="hotelNoSmokingPreference"
                control={control}
                error={errors?.hotelNoSmokingPreference?.message}
                defaultChecked={getCheckboxDefault("hotelNoSmokingPreference")}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="No Smoking"
                name="hotelNoNSmoking"
                control={control}
                error={errors?.hotelNoNSmoking?.message}
                defaultChecked={getCheckboxDefault("hotelNoNSmoking")}
              />
            </View>
          </View>

          {/* Pet Policies */}
          <ThemedText3 styles={`text-lg font-Bold mb-2`}>
            Pet Policies
          </ThemedText3>

          <View className="flex-row flex-wrap justify-between">
            <View className="w-1/2">
              <ThemedCheckbox
                label="Pets Allowed"
                name="hotelPetsAllowed"
                control={control}
                error={errors?.hotelPetsAllowed?.message}
                defaultChecked={getCheckboxDefault("hotelPetsAllowed")}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="No Pets Preference"
                name="hotelNoPetsPreferences"
                control={control}
                error={errors?.hotelNoPetsPreferences?.message}
                defaultChecked={getCheckboxDefault("hotelNoPetsPreferences")}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Pets Not Allowed"
                name="hotelPetsNotAllowed"
                control={control}
                error={errors?.hotelPetsNotAllowed?.message}
                defaultChecked={getCheckboxDefault("hotelPetsNotAllowed")}
              />
            </View>
          </View>

          {/* Location Features */}
          <ThemedText3 styles={`text-lg font-Bold mb-2`}>
            Location Features
          </ThemedText3>

          <View className="flex-row flex-wrap justify-between">
            <View className="w-1/2">
              <ThemedCheckbox
                label="Water View"
                name="hotelLocationFeatureWaterView"
                control={control}
                error={errors?.hotelLocationFeatureWaterView?.message}
                defaultChecked={getCheckboxDefault(
                  "hotelLocationFeatureWaterView"
                )}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Island Location"
                name="hotelLocationFeatureIsland"
                control={control}
                error={errors?.hotelLocationFeatureIsland?.message}
                defaultChecked={getCheckboxDefault(
                  "hotelLocationFeatureIsland"
                )}
              />
            </View>
          </View>
        </ScrollView>
        {/* </TouchableWithoutFeedback> */}
        <View
          style={{
            marginVertical: responsiveHeight(3),
          }}
        >
          <Button
            title="Submit"
            navigation={navigation}
            path={null}
            submission={updateProviderHotel}
            onComplete={() => setShowModal(true)}
            isUpdateProviderHotel={true}
          />
        </View>
        <SuccessModal visible={showModal} setVisible={setShowModal} />
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderEditHotelListingScreen;
