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
import ThemedTextInput from "@/utils/ThemedTextInput";
import ImageUploadUI from "@/components/ImageUploadUI";
import ImagePickerModal from "@/utils/ImagePickerModal";
// import WeeklySchedule from '@/components/WeeklySchedule';
import Button from "@/components/Button";
import SuccessModal from "@/components/SuccessModal";
import ThemedText3 from "@/utils/ThemedText3";
import {
  attractionBusinessTypes,
  attractionTypes,
} from "@/../assets/data/data";
import ThemedTextArea from "@/utils/ThemedTextArea";
import DropdownBox from "@/components/DropdownBox";
import DatePicker from "@/components/DatePicker";
import MultiImageUploadUI from "@/components/MultiImageUploadUI";
import MultiImagePickerModal from "@/components/MultiImagePickerModal";
import { useMultiImagePicker } from "@/utils/useMultiImagePicker";
import DocumentsUploadUI from "@/components/DocumentUploadUI";
import { useDocumentsPicker } from "@/utils/useDocumentsPicker";
import {
  useCreateAttractionMutation,
  // useUpdateProviderAttractionMutation,
} from "@/redux/slices/providerSlice/attractionSlice";
import WeeklyScheduleTime from "@/components/WeeklyScheduleTime";

const ProviderCreateAttactionBusinessScreen = () => {
  const {
    control,
    formState: { errors },
    reset,
    setValue,
  } = useFormContext();

  const theme = useColorScheme();
  const navigation = useNavigation();
  // const [photoPath, setPhotoPath] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleMulti, setModalVisibleMulti] = useState(false);
  const { pickFromGallery } = useImagePicker();
  const [showModal, setShowModal] = useState(false);
  const { pickFromGalleryMulti } = useMultiImagePicker();
  const { pickDocuments } = useDocumentsPicker();

  const [createAttraction] = useCreateAttractionMutation();
  // const resetData = useCallback(
  //   () => ({
  //     // Business Information
  //     attractionBusinessName: "",
  //     attractionName: "",
  //     attractionBusinessType: "",
  //     attractionRegNum: "",
  //     attractionRegDate: "",
  //     attractionPhone: "",
  //     attractionEmail: "",
  //     attractionType: "",

  //     // Business Branding
  //     attractionBusinessTagline: "",
  //     attractionBusinessDescription: "",
  //     businessLogo: "",

  //     // Policies
  //     attractionBookingCondition: "",
  //     attractionCancelationPolicy: "",

  //     // Documents
  //     attractionDocs: [],
  //   }),
  //   []
  // );

  // useEffect(() => {
  //   reset(resetData());
  // }, [reset, resetData]);

  useEffect(() => {
    // Business Information
    setValue("attractionBusinessName", "");
    setValue("attractionName", "");
    setValue("attractionBusinessType", "");
    setValue("attractionRegNum", "");
    setValue("attractionRegDate", "");
    setValue("attractionPhone", "");
    setValue("attractionEmail", "");
    setValue("attractionType", "");

    // Business Branding
    setValue("attractionBusinessTagline", "");
    setValue("attractionBusinessDescription", "");
    setValue("businessLogo", "");

    // Policies
    setValue("attractionBookingCondition", "");
    setValue("attractionCancelationPolicy", "");

    // Documents
    setValue("attractionDocs", []);
  }, [setValue]);

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
            Add Attraction Business Details
          </ThemedText>
          <ThemedTextInput
            name="attractionBusinessName"
            control={control}
            error={errors?.attractionBusinessName?.message}
            label="Business Name"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextInput
            name="attractionName"
            control={control}
            error={errors?.attractionName?.message}
            label="Full Name"
            placeholder="Type here..."
            type="text"
          />
          <View>
            <ThemedText styles={`font-Medium text-md mb-1`}>
              Business Type
            </ThemedText>
            <DropdownBox
              name="attractionBusinessType"
              options={attractionBusinessTypes}
              zIndex={1000}
            />
          </View>
          <ThemedTextInput
            name="attractionRegNum"
            control={control}
            error={errors?.attractionRegNum?.message}
            label="Government Registration Number"
            placeholder="Type here..."
            type="text"
          />
          <DatePicker
            name="attractionRegDate"
            control={control}
            label="Date of Business Registration (DOB)"
            error={errors?.attractionRegDate?.message}
          />
          <ThemedTextInput
            name="attractionPhone"
            control={control}
            error={errors?.attractionPhone?.message}
            label="Phone"
            placeholder="Type here..."
            type="number"
          />
          <ThemedTextInput
            name="attractionEmail"
            control={control}
            error={errors?.attractionEmail?.message}
            label="Email"
            placeholder="Type here..."
            type="email"
          />

          <View>
            <ThemedText styles={`font-Medium text-md mb-1`}>
              Attraction Type
            </ThemedText>
            <DropdownBox
              name="attractionType"
              options={attractionTypes}
              zIndex={1000}
            />
          </View>

          <ThemedTextInput
            name="attractionBusinessTagline"
            control={control}
            error={errors?.attractionBusinessTagline?.message}
            label="Business Tagline"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextArea
            name="attractionBusinessDescription"
            control={control}
            error={errors?.attractionBusinessDescription?.message}
            label="Business Description"
            placeholder="Type here..."
            type="text"
          />
          <Controller
            name="businessLogo"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <ImageUploadUI
                  value={value}
                  label="Upload Logo"
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
            name="attractionBookingCondition"
            control={control}
            error={errors?.attractionBookingCondition?.message}
            label="Booking Condition"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextArea
            name="attractionCancelationPolicy"
            control={control}
            error={errors?.attractionCancelationPolicy?.message}
            label="Cancelation Policy"
            placeholder="Type here..."
            type="text"
          />

          <Controller
            name="attractionDocs"
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
              "attractionBusinessName",
              "attractionName",
              "attractionBusinessType",
              "attractionType",
              "attractionRegNum",
              "attractionRegDate",
              "attractionPhone",
              "attractionEmail",
              "attractionBusinessTagline",
              "attractionBusinessDescription",
              "businessLogo",
              "attractionBookingCondition",
              "attractionCancelationPolicy",
              "attractionDocs",
            ]}
            onComplete={() => setShowModal(true)} // ✅ Modal will show only if form is valid
            submission={createAttraction}
            isAttractionCreate={true}
          />
        </View>
        <SuccessModal visible={showModal} setVisible={setShowModal} />
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderCreateAttactionBusinessScreen;
