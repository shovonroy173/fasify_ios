import {
  View,
  KeyboardAvoidingView,
  Platform,
  // TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  useColorScheme,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import ThemedText from "@/utils/ThemedText";
import ThemedText3 from "@/utils/ThemedText3";
import DropdownBox from "@/components/DropdownBox";
import {
  countries,
  hotelAccomodationTypes,
  hotelBusinessTypes,

  // roomTypes,
} from "assets/data/data";
import ThemedTextInput from "@/utils/ThemedTextInput";
import ThemedTextArea from "@/utils/ThemedTextArea";
import ImageUploadUI from "@/components/ImageUploadUI";
import ImagePickerModal from "@/utils/ImagePickerModal";
import Button from "@/components/Button";
import SuccessModal from "@/components/SuccessModal";
import { useImagePicker } from "@/utils/useImagePicker";
import DatePicker from "@/components/DatePicker";
// import MultiImageUploadUI from '@/components/MultiImageUploadUI';
// import MultiImagePickerModal from '@/components/MultiImagePickerModal';
// import { useMultiImagePicker } from '@/utils/useMultiImagePicker';
import DocumentsUploadUI from "@/components/DocumentUploadUI";
import { useDocumentsPicker } from "@/utils/useDocumentsPicker";
// import ThemedCheckbox from '@/utils/ThemedCheckbox';
import { useCreateHotelMutation } from "@/redux/slices/providerSlice/hotelSlice";
import ThemedCheckbox from "@/utils/ThemedCheckbox";

const ProviderCreateHotelListingScreen = () => {
  const {
    control,
    formState: { errors },
    // watch,
    reset,
    setValue,
  } = useFormContext();

  const theme = useColorScheme();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  // const [modalVisible2, setModalVisible2] = useState(false);
  const { pickFromGallery } = useImagePicker();
  // const { pickFromGalleryMulti } = useMultiImagePicker();
  const { pickDocuments } = useDocumentsPicker();

  const [showModal, setShowModal] = useState(false);

  const [createHotel] = useCreateHotelMutation();

  useEffect(() => {
    // Business Information
    setValue("hotelBusinessName", "");
    setValue("hotelName", "");
    setValue("hotelBusinessType", "");
    setValue("hotelRegNum", "");
    setValue("hotelRegDate", "");
    setValue("hotelPhone", "");
    setValue("hotelEmail", "");

    // Business Branding
    setValue("businessTagline", "");
    setValue("businessDescription", "");
    setValue("businessLogo", "");

    // Accommodation Type
    setValue("hotelAccommodationType", "");

    // Policies
    setValue("hotelBookingCondition", "");
    setValue("hotelCancelationPolicy", "");

    // Documents
    setValue("hotelDocs", []);

    // Location Details
    setValue("hotelAddress", "");
    setValue("hotelCity", "");
    setValue("hotelPostalCode", "");
    setValue("hotelDistrict", "");
    setValue("hotelCountry", "");

    // Amenities
    setValue("hotelAC", null);
    setValue("hotelParking", null);
    setValue("hoitelWifi", null);
    setValue("hotelBreakfast", null);
    setValue("hotelPool", null);
    setValue("hotelTv", null);
    setValue("hotelWashing", null);
    setValue("hotelKitchen", null);
    setValue("hotelRestaurant", null);
    setValue("hotelGym", null);
    setValue("hotelSpa", null);
    setValue("hotel24HourFrontDesk", null);
    setValue("hotelAirportShuttle", null);
    setValue("hotelCoffeeBar", null);

    // Smoking Preferences
    setValue("hotelSmoking", null);
    setValue("hotelNoSmokingPreference", null);
    setValue("hotelNoNSmoking", null);

    // Pet Policies
    setValue("hotelPetsAllowed", null);
    setValue("hotelNoPetsPreferences", null);
    setValue("hotelPetsNotAllowed", null);

    // Location Features
    setValue("hotelLocationFeatureWaterView", null);
    setValue("hotelLocationFeatureIsland", null);
  }, [setValue]);

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
          // className="flex-grow"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: responsiveHeight(2),
          }}
        >
          <ThemedText styles="font-SemiBold text-xl">
            Add Hotel Details
          </ThemedText>
          <ThemedTextInput
            name="hotelBusinessName"
            control={control}
            error={errors?.hotelBusinessName?.message}
            label="Business Name"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextInput
            name="hotelName"
            control={control}
            error={errors?.hotelName?.message}
            label="Full Name"
            placeholder="Type here..."
            type="text"
          />
          <View>
            <ThemedText styles={` font-Medium text-md mb-1`}>
              Business Type
            </ThemedText>
            <DropdownBox
              name="hotelBusinessType"
              options={hotelBusinessTypes}
              zIndex={1000}
            />
          </View>
          <ThemedTextInput
            name="hotelRegNum"
            control={control}
            error={errors?.hotelRegNum?.message}
            label="Government Registration Number"
            placeholder="Type here..."
            type="text"
          />
          <DatePicker
            name="hotelRegDate"
            control={control}
            label="Date of Business Registration (DOB)"
            error={errors?.hotelRegDate?.message}
          />
          <ThemedTextInput
            name="hotelPhone"
            control={control}
            error={errors?.hotelPhone?.message}
            label="Phone"
            placeholder="Type here..."
            type="number"
          />
          <ThemedTextInput
            name="hotelEmail"
            control={control}
            error={errors?.hotelEmail?.message}
            label="Email"
            placeholder="Type here..."
            type="email"
          />
          <ThemedTextInput
            name="businessTagline"
            control={control}
            error={errors?.businessTagline?.message}
            label="Business Tagline"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextArea
            name="businessDescription"
            control={control}
            error={errors?.businessDescription?.message}
            label="Business Description"
            placeholder="Type here..."
            type="text"
          />
          <View>
            <ThemedText styles={` font-Medium text-md mb-1`}>
              Accommodation Type
            </ThemedText>
            <DropdownBox
              name="hotelAccommodationType"
              options={hotelAccomodationTypes}
              zIndex={900}
            />
          </View>
          <Controller
            name="businessLogo"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <ImageUploadUI
                  value={value}
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
          <ThemedTextInput
            name="hotelBookingCondition"
            control={control}
            error={errors?.hotelBookingCondition?.message}
            label="Booking Condition"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextArea
            name="hotelCancelationPolicy"
            control={control}
            error={errors?.hotelCancelationPolicy?.message}
            label="Cancelation Policy"
            placeholder="Type here..."
            type="text"
          />

          <Controller
            name="hotelDocs"
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <DocumentsUploadUI
                label="Business Registration and Policy Docs"
                docs={value}
                onPick={() =>
                  pickDocuments((files) => {
                    console.log(files.uri);

                    const combined = [...value, ...files].slice(0, 5); // limit to 5
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

          <ThemedTextInput
            name="hotelAddress"
            control={control}
            error={errors?.hotelAddress?.message}
            label="Address"
            placeholder="Type here..."
            type="text"
          />

          <ThemedTextInput
            name="hotelCity"
            control={control}
            error={errors?.hotelCity?.message}
            label="City"
            placeholder="Type here..."
            type="text"
          />

          <ThemedTextInput
            name="hotelPostalCode"
            control={control}
            error={errors?.hotelPostalCode?.message}
            label="Postal Code"
            placeholder="Type here..."
            type="text"
          />

          <ThemedTextInput
            name="hotelDistrict"
            control={control}
            error={errors?.hotelDistrict?.message}
            label="District / State / Province"
            placeholder="Type here..."
            type="text"
          />

          <View>
            <ThemedText styles={`font-Medium text-md mb-1`}>Country</ThemedText>
            <DropdownBox name="hotelCountry" options={countries} zIndex={900} />
          </View>

          <View className="flex-row flex-wrap justify-between">
            <View className="w-1/2">
              <ThemedCheckbox
                label="Air Conditioning"
                name="hotelAC"
                control={control}
                error={errors?.hotelAC?.message}
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Parking"
                name="hotelParking"
                control={control}
                error={errors?.hotelParking?.message}
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="WiFi"
                name="hoitelWifi"
                control={control}
                error={errors?.hoitelWifi?.message}
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Breakfast"
                name="hotelBreakfast"
                control={control}
                error={errors?.hotelBreakfast?.message}
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Swimming Pool"
                name="hotelPool"
                control={control}
                error={errors?.hotelPool?.message}
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="TV"
                name="hotelTv"
                control={control}
                error={errors?.hotelTv?.message}
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Washing Machine"
                name="hotelWashing"
                control={control}
                error={errors?.hotelWashing?.message}
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Kitchen"
                name="hotelKitchen"
                control={control}
                error={errors?.hotelKitchen?.message}
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Restaurant"
                name="hotelRestaurant"
                control={control}
                error={errors?.hotelRestaurant?.message}
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Gym"
                name="hotelGym"
                control={control}
                error={errors?.hotelGym?.message}
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Spa"
                name="hotelSpa"
                control={control}
                error={errors?.hotelSpa?.message}
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="24-Hour Front Desk"
                name="hotel24HourFrontDesk"
                control={control}
                error={errors?.hotel24HourFrontDesk?.message}
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Airport Shuttle"
                name="hotelAirportShuttle"
                control={control}
                error={errors?.hotelAirportShuttle?.message}
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Coffee Bar"
                name="hotelCoffeeBar"
                control={control}
                error={errors?.hotelCoffeeBar?.message}
                defaultChecked={null}
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
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="No Smoking Preference"
                name="hotelNoSmokingPreference"
                control={control}
                error={errors?.hotelNoSmokingPreference?.message}
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="No Smoking"
                name="hotelNoNSmoking"
                control={control}
                error={errors?.hotelNoNSmoking?.message}
                defaultChecked={null}
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
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="No Pets Preference"
                name="hotelNoPetsPreferences"
                control={control}
                error={errors?.hotelNoPetsPreferences?.message}
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Pets Not Allowed"
                name="hotelPetsNotAllowed"
                control={control}
                error={errors?.hotelPetsNotAllowed?.message}
                defaultChecked={null}
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
                defaultChecked={null}
              />
            </View>
            <View className="w-1/2">
              <ThemedCheckbox
                label="Island Location"
                name="hotelLocationFeatureIsland"
                control={control}
                error={errors?.hotelLocationFeatureIsland?.message}
                defaultChecked={null}
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
            path={"ProviderListingMain"} // Or string / object if you want navigation
            ids={[
              // Business Information
              "hotelBusinessName",
              "hotelName",
              "hotelBusinessType",
              "hotelAccommodationType",
              "hotelRegNum",
              "hotelRegDate",
              "hotelPhone",
              "hotelEmail",

              // Business Branding
              "businessTagline",
              "businessDescription",
              "businessLogo",

              // Policies & Documents
              "hotelBookingCondition",
              "hotelCancelationPolicy",
              "hotelDocs",

              // Location Details
              "hotelAddress",
              "hotelCity",
              "hotelPostalCode",
              "hotelDistrict",
              "hotelCountry",
            ]}
            onComplete={() => setShowModal(true)} // ✅ Modal will show only if form is valid
            submission={createHotel}
            isHotelCreate={true}
          />
        </View>
        <SuccessModal visible={showModal} setVisible={setShowModal} />
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderCreateHotelListingScreen;
