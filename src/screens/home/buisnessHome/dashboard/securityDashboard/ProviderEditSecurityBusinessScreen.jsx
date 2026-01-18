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
import React, { useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
// import { useImagePicker } from '@/utils/useImagePicker';
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import ThemedText from "@/utils/ThemedText";
import ThemedTextInput from "@/utils/ThemedTextInput";
import ThemedTextArea from "@/utils/ThemedTextArea";
// import ImageUploadUI from '@/components/ImageUploadUI';
// import ImagePickerModal from '@/utils/ImagePickerModal';
import Button from "@/components/Button";
import SuccessModal from "@/components/SuccessModal";
import DatePicker from "@/components/DatePicker";
// import WeeklySchedule from '@/components/WeeklySchedule';
// import ThemedText3 from '@/utils/ThemedText3';
import DropdownBox from "@/components/DropdownBox";
import {
  // carRentalServices,
  // hotelBusinessTypes,
  securityProtocols,
  securityServices,
} from "@/../assets/data/data";
// import MultiImageUploadUI from '@/components/MultiImageUploadUI';
// import MultiImagePickerModal from '@/components/MultiImagePickerModal';
// import { useMultiImagePicker } from '@/utils/useMultiImagePicker';
import DocumentsUploadUI from "@/components/DocumentUploadUI";
import { useDocumentsPicker } from "@/utils/useDocumentsPicker";
import { useUpdateProviderSecurityMutation } from "@/redux/slices/providerSlice/securitySlice";
import ImageUploadUI from "@/components/ImageUploadUI";
import ImagePickerModal from "@/utils/ImagePickerModal";
import { useImagePicker } from "@/utils/useImagePicker";

const ProviderEditSecurityBusinessScreen = () => {
  const {
    control,
    formState: { errors },
    // watch,
    getValues,
  } = useFormContext();

  // const theme = useColorScheme();
  const navigation = useNavigation();
  // const [photoPath, setPhotoPath] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  // const { pickFromGallery } = useImagePicker();
  // const { pickFromGalleryMulti } = useMultiImagePicker();
  const { pickDocuments } = useDocumentsPicker();

  const [showModal, setShowModal] = useState(false);

  // const themedLabelClasses = `${
  //   theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
  // } text-md`;

  const { pickFromGallery } = useImagePicker();

  const [updateProviderSecurity] = useUpdateProviderSecurityMutation();
  const providerSecurity = getValues("selectedActiveListingSecurity");

  console.log("LIN EAT 76", providerSecurity);

  const getPlaceholder = (fieldName) => {
    const value = providerSecurity?.[fieldName];
    if (value) return value;
    return "Type here...";
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
        <ThemedText styles="font-SemiBold text-xl">
          Edit Security Details
        </ThemedText>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          // className="flex-grow"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: responsiveHeight(2),
          }}
        >
          <ThemedTextInput
            name="securityBusinessName"
            control={control}
            error={errors?.securityBusinessName?.message}
            label="Business Name"
            placeholder={getPlaceholder("securityBusinessName")}
            type="text"
          />
          <ThemedTextInput
            name="securityName"
            control={control}
            error={errors?.securityName?.message}
            label="Full Name"
            placeholder={getPlaceholder("securityName")}
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
            placeholder={getPlaceholder("securityRegNum")}
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
            placeholder={getPlaceholder("securityPhone")}
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
            placeholder={getPlaceholder("securityEmail")}
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
                  value={value || providerSecurity?.businessLogo}
                  label="Upload Business logo"
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
            placeholder={getPlaceholder("securityTagline")}
            type="text"
          />
          <ThemedTextArea
            name="securityProtocolDescription"
            control={control}
            error={errors?.securityProtocolDescription?.message}
            label="Security Protocol Description"
            placeholder={getPlaceholder("securityProtocolDescription")}
            type="text"
          />
          <ThemedTextInput
            name="securityBookingCondition"
            control={control}
            error={errors?.securityBookingCondition?.message}
            label="Booking Condition"
            placeholder={getPlaceholder("securityBookingCondition")}
            type="text"
          />
          <ThemedTextArea
            name="securityCancelationPolicy"
            control={control}
            error={errors?.securityCancelationPolicy?.message}
            label="Cancelation Policy"
            placeholder={getPlaceholder("securityCancelationPolicy")}
            type="text"
          />
          <Controller
            name="securityDocs"
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <DocumentsUploadUI
                label="Business Registration and Policy Docs"
                docs={
                  value.length > 0 ? value : providerSecurity?.hotelDocs || []
                }
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
            path={null}
            // ids={[
            //   "securityBusinessName",
            //   "securityName",
            //   "securityBusinessType",
            //   "securityRegNum",
            //   "securityRegDate",
            //   "securityPhone",
            //   "securityEmail",
            //   "securityProtocolType",
            //   "securityProtocolsType",
            //   "businessLogo",
            //   "securityTagline",
            //   "securityProtocolDescription",
            //   "securityBookingCondition",
            //   "securityCancelationPolicy",
            //   "securityDocs",
            // ]}
            submission={updateProviderSecurity}
            onComplete={() => setShowModal(true)} // ✅ Modal will show only if form is valid
            isUpdateProviderSecurity={true}
          />
        </View>
        <SuccessModal visible={showModal} setVisible={setShowModal} />
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderEditSecurityBusinessScreen;
