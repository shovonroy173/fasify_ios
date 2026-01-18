import {
  View,
  KeyboardAvoidingView,
  Platform,
  // TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import ThemedText3 from "@/utils/ThemedText3";
import DropdownBox from "@/components/DropdownBox";
import ThemedText from "@/utils/ThemedText";
import ThemedTextInput from "@/utils/ThemedTextInput";
import Button from "@/components/Button";
import SuccessModal from "@/components/SuccessModal";
import WeeklySchedule from "@/components/WeeklySchedule";
import ThemedTextArea from "@/utils/ThemedTextArea";
import DatePicker from "@/components/DatePicker";
import {
  carRental2Types,
  carRentalTypes,
  hotelBusinessTypes,
} from "@/../assets/data/data";
import MultiImageUploadUI from "@/components/MultiImageUploadUI";
import MultiImagePickerModal from "@/components/MultiImagePickerModal";
import { useMultiImagePicker } from "@/utils/useMultiImagePicker";
import DocumentsUploadUI from "@/components/DocumentUploadUI";
import { useDocumentsPicker } from "@/utils/useDocumentsPicker";
import { useCreateCarMutation } from "@/redux/slices/providerSlice/carSlice";
import ImageUploadUI from "@/components/ImageUploadUI";
import ImagePickerModal from "@/utils/ImagePickerModal";
import { useImagePicker } from "@/utils/useImagePicker";

const ProviderCreateCarListingScreen = () => {
  const {
    control,
    formState: { errors },
    // watch,
    reset,
    setValue,
  } = useFormContext();

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const { pickFromGalleryMulti } = useMultiImagePicker();
  const { pickDocuments } = useDocumentsPicker();
  const { pickFromGallery } = useImagePicker();

  const [createCar] = useCreateCarMutation();



  useEffect(() => {
    // Business Information
    setValue("carBusinessName", "");
    setValue("carName", "");
    setValue("carBusinessType", "");
    setValue("carRegNum", "");
    setValue("carRegDate", "");
    setValue("carPhone", "");
    setValue("carEmail", "");
    setValue("carRentalType", "");

    // Business Branding
    setValue("carTagline", "");
    setValue("carRentalDescription", "");
    setValue("businessLogo", "");

    // Policies
    setValue("carBookingCondition", "");
    setValue("carCancelationPolicy", "");

    // Documents
    setValue("carDocs", []);
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
      <View className="gap-5">
        <GoBack navigation={navigation} />
        <ThemedText styles="font-SemiBold text-xl">
          Add Business Details
        </ThemedText>
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
          <ThemedTextInput
            name="carBusinessName"
            control={control}
            error={errors?.carBusinessName?.message}
            label="Business Name"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextInput
            name="carName"
            control={control}
            error={errors?.carName?.message}
            label="Full Name"
            placeholder="Type here..."
            type="text"
          />
          <View>
            <ThemedText styles={`font-Medium text-md mb-1`}>
              Business Type
            </ThemedText>
            <DropdownBox
              name="carBusinessType"
              options={carRentalTypes}
              zIndex={1000}
            />
          </View>
          <ThemedTextInput
            name="carRegNum"
            control={control}
            error={errors?.carRegNum?.message}
            label="Government Registration Number"
            placeholder="Type here..."
            type="text"
          />
          <DatePicker
            name="carRegDate"
            control={control}
            label="Date of Business Registration (DOB)"
            error={errors?.carRegDate?.message}
          />
          <ThemedTextInput
            name="carPhone"
            control={control}
            error={errors?.carPhone?.message}
            label="Phone"
            placeholder="Type here..."
            type="number"
          />
          <ThemedTextInput
            name="carEmail"
            control={control}
            error={errors?.carEmail?.message}
            label="Email"
            placeholder="Type here..."
            type="email"
          />
          <View>
            <ThemedText styles={`font-Medium text-md mb-1`}>
              Car Rental Type
            </ThemedText>
            <DropdownBox
              name="carRentalType"
              options={carRental2Types}
              zIndex={1000}
            />
          </View>

          {/* NEW FIELDS ADDED */}
          <ThemedTextInput
            name="carTagline"
            control={control}
            error={errors?.carTagline?.message}
            label="Business Tagline"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextArea
            name="carRentalDescription"
            control={control}
            error={errors?.carRentalDescription?.message}
            label="Business Description"
            placeholder="Type here..."
            type="text"
          />

          {/* BUSINESS LOGO UPLOAD */}
          <Controller
            name="businessLogo"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <ImageUploadUI
                  value={value}
                  label="Upload Business Logo"
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

          <View>
            <ThemedText styles={`font-Medium text-md mb-1`}>
              Car Rental Type
            </ThemedText>
            <DropdownBox
              name="carRentalType"
              options={carRental2Types}
              zIndex={1000}
            />
          </View>

          <ThemedTextInput
            name="carBookingCondition"
            control={control}
            error={errors?.carBookingCondition?.message}
            label="Booking Condition"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextArea
            name="carCancelationPolicy"
            control={control}
            error={errors?.carCancelationPolicy?.message}
            label="Cancelation Policy"
            placeholder="Type here..."
            type="text"
          />

          <Controller
            name="carDocs"
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <DocumentsUploadUI
                label="Business Registration and Policy Docs"
                docs={value}
                onPick={() =>
                  pickDocuments((files) => {
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
              "carBusinessName",
              "carName",
              "carBusinessType",
              "carRentalType",
              "carRegNum",
              "carRegDate",
              "carPhone",
              "carEmail",
              "carTagline",
              "carRentalDescription",
              "businessLogo",
              "carBookingCondition",
              "carCancelationPolicy",
              "carDocs",
            ]}
            onComplete={() => setShowModal(true)}
            submission={createCar}
            isCarCreate={true}
          />
        </View>
        <SuccessModal visible={showModal} setVisible={setShowModal} />
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderCreateCarListingScreen;
