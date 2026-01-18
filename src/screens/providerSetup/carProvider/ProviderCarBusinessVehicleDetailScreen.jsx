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
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import TitleComponent from "@/components/TitleComponent";
import ThemedTextInput from "@/utils/ThemedTextInput";

import Button from "@/components/Button";
// import DatePicker from '@/components/DatePicker';
import ThemedTextArea from "@/utils/ThemedTextArea";
// import ImageUploadUI from '@/components/ImageUploadUI';
// import ImagePickerModal from '@/utils/ImagePickerModal';
// import { useImagePicker } from '@/utils/useImagePicker';
import DocumentsUploadUI from "@/components/DocumentUploadUI";
import { useDocumentsPicker } from "@/utils/useDocumentsPicker";
import ImageUploadUI from "@/components/ImageUploadUI";
import ImagePickerModal from "@/utils/ImagePickerModal";
import { useImagePicker } from "@/utils/useImagePicker";
import { carRental2Types } from "assets/data/data";
import ThemedText from "@/utils/ThemedText";
import DropdownBox from "@/components/DropdownBox";

const ProviderCarBusinessVehicleDetailScreen = () => {
  const {
    control,
    formState: { errors },
    // watch,
  } = useFormContext();

  const [modalVisible, setModalVisible] = useState(false);
  // const theme = useColorScheme();
  const navigation = useNavigation();
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
      <TitleComponent
        title="Professional Details"
        subTitle="Please provide business information so we can setup your account."
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
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
            title="Next"
            navigation={navigation}
            path="ProviderCarBusinessReview"
            // ids={[
            //   "carTagline",
            //   "carRentalDescription",
            //   "businessLogo",
            //   "carBookingCondition",
            //   "carCancelationPolicy",
            //   "carDocs",
            // ]}
            noicon={true}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderCarBusinessVehicleDetailScreen;
