import {
  View,
  // Text,
  KeyboardAvoidingView,
  Platform,
  // TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  // useColorScheme,
} from "react-native";
import React, { useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useImagePicker } from "@/utils/useImagePicker";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import TitleComponent from "@/components/TitleComponent";
import ThemedTextInput from "@/utils/ThemedTextInput";
import ThemedTextArea from "@/utils/ThemedTextArea";
import Button from "@/components/Button";
import ImageUploadUI from "@/components/ImageUploadUI";
import ImagePickerModal from "@/utils/ImagePickerModal";
import DocumentsUploadUI from "@/components/DocumentUploadUI";
import { useDocumentsPicker } from "@/utils/useDocumentsPicker";
import { attractionTypes } from "assets/data/data";
import ThemedText from "@/utils/ThemedText";
import DropdownBox from "@/components/DropdownBox";

const ProviderAttractionBusinessLogoScreen = () => {
  const {
    control,
    formState: { errors },
    // watch,
  } = useFormContext();

  // const theme = useColorScheme();
  const navigation = useNavigation();
  // const [photoPath, setPhotoPath] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const { pickFromGallery } = useImagePicker();
  const { pickDocuments } = useDocumentsPicker();

  // const themedLabelClasses = `${
  //   theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
  // } text-md`;

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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={{
          flex: 1,
        }}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1"> */}
        <ScrollView
          className="flex-grow"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: responsiveHeight(2),
          }}
        >
          <TitleComponent
            title="Professional Details"
            subTitle="Please provide professional information so we can setup your account."
          />
          <ThemedTextInput
            name="attractionBusinessTagline"
            control={control}
            error={errors?.attractionBusinessTagline?.message}
            label="Tagline"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextInput
            name="attractionBusinessDescription"
            control={control}
            error={errors?.attractionBusinessDescription?.message}
            label="Description"
            placeholder="Type here..."
            type="text"
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
            title="Next"
            navigation={navigation}
            path="ProviderAttractionBusinessReview"
            ids={[
              "attractionType",
              "attractionBusinessTagline",
              "attractionBusinessDescription",
              "businessLogo",
              "attractionBookingCondition",
              "attractionCancelationPolicy",
              "attractionDocs",
            ]}
            noicon={true}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderAttractionBusinessLogoScreen;
