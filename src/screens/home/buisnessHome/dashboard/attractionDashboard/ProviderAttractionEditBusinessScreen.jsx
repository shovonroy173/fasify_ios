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
  attractionBusinessTypes,
  // carRentalServices,
  // hotelBusinessTypes,
  // attractionProtocols,
  // attractionServices,
} from "@/../assets/data/data";
// import MultiImageUploadUI from '@/components/MultiImageUploadUI';
// import MultiImagePickerModal from '@/components/MultiImagePickerModal';
// import { useMultiImagePicker } from '@/utils/useMultiImagePicker';
import DocumentsUploadUI from "@/components/DocumentUploadUI";
import { useDocumentsPicker } from "@/utils/useDocumentsPicker";
import ImageUploadUI from "@/components/ImageUploadUI";
import ImagePickerModal from "@/utils/ImagePickerModal";
import { useImagePicker } from "@/utils/useImagePicker";
import { useUpdateProviderAttractionMutation } from "@/redux/slices/providerSlice/attractionSlice";
import ThemedText3 from "@/utils/ThemedText3";

const ProviderEditattractionBusinessScreen = () => {
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
  const [updateProviderAttraction] = useUpdateProviderAttractionMutation();
  const providerAttraction = getValues("selectedActiveListingAttraction");
  const getPlaceholder = (fieldName) => {
    const value = providerAttraction?.[fieldName];
    if (value) return value;
    return "Type here...";
  };

  const getPlaceholderNumber = (fieldName) => {
    const value = providerAttraction?.[fieldName];
    if (value) return value.toString();
    return "0";
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
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        // className="flex-1"
        style={{
          flex: 1,
        }}
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
            Edit Attraction Business Details
          </ThemedText>
          <ThemedTextInput
            name="attractionBusinessName"
            control={control}
            error={errors?.attractionBusinessName?.message}
            label="Business Name"
            placeholder={getPlaceholder("attractionBusinessName")}
            type="text"
          />
          <ThemedTextInput
            name="attractionName"
            control={control}
            error={errors?.attractionName?.message}
            label="Full Name"
            placeholder={getPlaceholder("attractionName")}
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
            placeholder={getPlaceholder("attractionRegNum")}
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
            placeholder={getPlaceholderNumber("attractionPhone")}
            type="number"
          />
          <ThemedTextInput
            name="attractionEmail"
            control={control}
            error={errors?.attractionEmail?.message}
            label="Email"
            placeholder={getPlaceholder("attractionEmail")}
            type="email"
          />
          <ThemedTextInput
            name="attractionBusinessTagline"
            control={control}
            error={errors?.attractionBusinessTagline?.message}
            label="Business Tagline"
            placeholder={getPlaceholder("attractionBusinessTagline")}
            type="text"
          />
          <ThemedTextArea
            name="attractionBusinessDescription"
            control={control}
            error={errors?.attractionBusinessDescription?.message}
            label="Business Description"
            placeholder={getPlaceholder("attractionBusinessDescription")}
            type="text"
          />
          <Controller
            name="businessLogo"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <ImageUploadUI
                  value={value || providerAttraction?.businessLogo}
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
            placeholder={getPlaceholder("attractionBookingCondition")}
            type="text"
          />
          <ThemedTextArea
            name="attractionCancelationPolicy"
            control={control}
            error={errors?.attractionCancelationPolicy?.message}
            label="Cancelation Policy"
            placeholder={getPlaceholder("attractionCancelationPolicy")}
            type="text"
          />

          <Controller
            name="attractionDocs"
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <DocumentsUploadUI
                label="Business Registration and Policy Docs"
                docs={
                  value.length
                    ? value
                    : providerAttraction?.attractionDocs || []
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
            //   "attractionBusinessName",
            //   "attractionName",
            //   "attractionBusinessType",
            //   "attractionRegNum",
            //   "attractionRegDate",
            //   "attractionPhone",
            //   "attractionEmail",
            //   "attractionBusinessTagline",
            //   "attractionBusinessDescription",
            //   "businessLogo",
            //   "attractionBookingCondition",
            //   "attractionCancelationPolicy",
            //   "attractionDocs",
            // ]}
            submission={updateProviderAttraction}
            onComplete={() => setShowModal(true)}
            isUpdateProviderAttraction={true}
          />
        </View>
        <SuccessModal visible={showModal} setVisible={setShowModal} />
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderEditattractionBusinessScreen;
