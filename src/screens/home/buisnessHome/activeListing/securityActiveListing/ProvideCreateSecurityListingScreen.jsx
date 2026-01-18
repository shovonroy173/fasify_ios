import {
  View,
  // Text,
  KeyboardAvoidingView,
  Platform,
  // TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  // useColorScheme,
  // Pressable,
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
import ThemedTextArea from "@/utils/ThemedTextArea";
import ImageUploadUI from "@/components/ImageUploadUI";
import ImagePickerModal from "@/utils/ImagePickerModal";
import SuccessModal from "@/components/SuccessModal";
import Button from "@/components/Button";
// import ThemedText3 from '@/utils/ThemedText3';
import DatePicker from "@/components/DatePicker";
// import WeeklySchedule from '@/components/WeeklySchedule';
import DropdownBox from "@/components/DropdownBox";
import {
  securityProtocols,
  // carRentalServices,
  // hotelBusinessTypes,
  securityServices,
} from "@/../assets/data/data";
// import MultiImageUploadUI from '@/components/MultiImageUploadUI';
// import MultiImagePickerModal from '@/components/MultiImagePickerModal';
// import { useMultiImagePicker } from '@/utils/useMultiImagePicker';
import DocumentsUploadUI from "@/components/DocumentUploadUI";
import { useDocumentsPicker } from "@/utils/useDocumentsPicker";
import { useCreateSecurityMutation } from "@/redux/slices/providerSlice/securitySlice";

const ProviderCreateSecurityListingScreen = () => {
  const {
    control,
    formState: { errors },
    // watch,
    reset,
    setValue,
  } = useFormContext();

  // const theme = useColorScheme();
  const navigation = useNavigation();
  // const [photoPath, setPhotoPath] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const { pickFromGallery } = useImagePicker();
  const [showModal, setShowModal] = useState(false);
  // const { pickFromGalleryMulti } = useMultiImagePicker();
  const { pickDocuments } = useDocumentsPicker();

  // const themedLabelClasses = `${
  //   theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
  // } text-md`;
  const [createSecurity] = useCreateSecurityMutation();

  // const resetData = useCallback(
  //   () => ({
  //     // Business Information
  //     securityBusinessName: "",
  //     securityName: "",
  //     securityBusinessType: "",
  //     securityProtocolType: "",
  //     securityRegNum: "",
  //     securityRegDate: "",
  //     securityPhone: "",
  //     securityEmail: "",
  //     securityProtocolsType: "",

  //     // Business Branding
  //     securityTagline: "",
  //     securityProtocolDescription: "",
  //     businessLogo: "",

  //     // Policies
  //     securityBookingCondition: "",
  //     securityCancelationPolicy: "",

  //     // Documents
  //     securityDocs: [],
  //   }),
  //   []
  // );

  // useEffect(() => {
  //   reset(resetData());
  // }, [reset, resetData]);

useEffect(() => {
  // Business Information
  setValue("securityBusinessName", "");
  setValue("securityName", "");
  setValue("securityBusinessType", "");
  setValue("securityProtocolType", "");
  setValue("securityRegNum", "");
  setValue("securityRegDate", "");
  setValue("securityPhone", "");
  setValue("securityEmail", "");
  setValue("securityProtocolType", "");

  // Business Branding
  setValue("securityTagline", "");
  setValue("securityProtocolDescription", "");
  setValue("businessLogo", "");

  // Policies
  setValue("securityBookingCondition", "");
  setValue("securityCancelationPolicy", "");

  // Documents
  setValue("securityDocs", []);
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
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        className="flex-1"
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
              Add Security Business Details
            </ThemedText>
            <ThemedTextInput
              name="securityBusinessName"
              control={control}
              error={errors?.securityBusinessName?.message}
              label="Business Name"
              placeholder="Type here..."
              type="text"
            />
            <ThemedTextInput
              name="securityName"
              control={control}
              error={errors?.securityName?.message}
              label="Full Name"
              placeholder="Type here..."
              type="text"
            />
            <View>
              <ThemedText styles={`font-Medium text-md mb-1`}>
                Business Type
              </ThemedText>
              <DropdownBox
                name="securityBusinessType"
                options={securityServices}
                zIndex={1000}
              />
            </View>
            <ThemedTextInput
              name="securityRegNum"
              control={control}
              error={errors?.securityRegNum?.message}
              label="Government Registration Number"
              placeholder="Type here..."
              type="text"
            />
            <DatePicker
              name="securityRegDate"
              control={control}
              label="Date of Business Registration (DOB)"
              error={errors?.securityRegDate?.message}
            />
            <ThemedTextInput
              name="securityPhone"
              control={control}
              error={errors?.securityPhone?.message}
              label="Phone"
              placeholder="Type here..."
              type="number"
            />
            <View>
              <ThemedText styles={`font-Medium text-md mb-1`}>
                Business Type
              </ThemedText>
              <DropdownBox
                name="securityProtocolType"
                options={securityServices}
                zIndex={1000}
              />
            </View>
            <ThemedTextInput
              name="securityEmail"
              control={control}
              error={errors?.securityEmail?.message}
              label="Email"
              placeholder="Type here..."
              type="email"
            />
            <View>
              <ThemedText styles={`font-Medium text-md mb-1`}>
                Security Protocols Type
              </ThemedText>
              <DropdownBox
                name="securityProtocolType"
                options={securityProtocols}
                zIndex={1000}
              />
            </View>
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

            <ThemedTextInput
              name="securityTagline"
              control={control}
              error={errors?.securityTagline?.message}
              label="Security Tagline"
              placeholder="Type here..."
              type="text"
            />
            <ThemedTextArea
              name="securityProtocolDescription"
              control={control}
              error={errors?.securityProtocolDescription?.message}
              label="Security Protocol Description"
              placeholder="Type here..."
              type="text"
            />
            <ThemedTextInput
              name="securityBookingCondition"
              control={control}
              error={errors?.securityBookingCondition?.message}
              label="Booking Condition"
              placeholder="Type here..."
              type="text"
            />
            <ThemedTextArea
              name="securityCancelationPolicy"
              control={control}
              error={errors?.securityCancelationPolicy?.message}
              label="Cancelation Policy"
              placeholder="Type here..."
              type="text"
            />
            <Controller
              name="securityDocs"
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
        <View className="pt-5">
          <Button
            title="Continue"
            navigation={navigation}
            path={"ProviderListingMain"}
            ids={[
              "securityBusinessName",
              "securityName",
              "securityBusinessType",
              "securityRegNum",
              "securityRegDate",
              "securityPhone",
              "securityEmail",
              "securityProtocolType",
              
              "businessLogo",
              "securityTagline",
              "securityProtocolDescription",
              "securityBookingCondition",
              "securityCancelationPolicy",
              "securityDocs",
            ]}
            noicon={true}
            onComplete={() => setShowModal(true)}
            submission={createSecurity}
            isSecurityCreate={true}
          />
        </View>
        <SuccessModal visible={showModal} setVisible={setShowModal} />
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderCreateSecurityListingScreen;
