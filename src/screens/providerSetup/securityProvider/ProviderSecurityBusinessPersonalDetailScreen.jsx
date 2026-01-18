import {
  View,
  // Text,
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
// import { useImagePicker } from '@/utils/useImagePicker';
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import TitleComponent from "@/components/TitleComponent";
import ThemedTextInput from "@/utils/ThemedTextInput";
// import ImageUploadUI from '@/components/ImageUploadUI';
// import ImagePickerModal from '@/utils/ImagePickerModal';
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
// import ThemedTextArea from '@/utils/ThemedTextArea';
import DropdownBox from "@/components/DropdownBox";
import { securityProtocols, securityServices } from "@/../assets/data/data";
// import MultiImageUploadUI from '@/components/MultiImageUploadUI';
// import MultiImagePickerModal from '@/components/MultiImagePickerModal';
// import { useMultiImagePicker } from '@/utils/useMultiImagePicker';
import ThemedText from "@/utils/ThemedText";
import ImageUploadUI from "@/components/ImageUploadUI";
import ImagePickerModal from "@/utils/ImagePickerModal";
// import { useDocumentsPicker } from '@/utils/useDocumentsPicker';
import { useImagePicker } from "@/utils/useImagePicker";

const ProviderSecurityBusinessPersonalDetailScreen = () => {
  const {
    control,
    formState: { errors },
    // watch,
  } = useFormContext();

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const { pickFromGallery } = useImagePicker();
  // const { pickFromGalleryMulti } = useMultiImagePicker();
  // const { pickDocuments } = useDocumentsPicker();

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
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          // className="flex-grow"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: responsiveHeight(2),
          }}
        >
          <TitleComponent
            title="Business Details"
            subTitle="Please provide business information so we can setup your account."
          />
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
          {/* <View>
              <ThemedText styles={`font-Medium text-md mb-1`}>
                Business Type
              </ThemedText>
              <DropdownBox
                name="securityProtocolType"
                options={securityServices}
                zIndex={1000}
              />
            </View> */}
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
                  label="Upload Security Logo"
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
        </ScrollView>
        <View
          style={{
            marginVertical: responsiveHeight(3),
          }}
        >
          <Button
            title="Next"
            navigation={navigation}
            path="ProviderCarBusinessVehicleDetail"
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
            ]}
            noicon={true}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderSecurityBusinessPersonalDetailScreen;
