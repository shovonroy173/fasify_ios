import {
  View,
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
// import { useImagePicker } from '@/utils/useImagePicker';
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import ThemedText from "@/utils/ThemedText";
import ThemedText3 from "@/utils/ThemedText3";
// import DropdownBox from '@/components/DropdownBox';
// import { attractionBusinessTypes } from '@/../assets/data/data';
import ThemedTextInput from "@/utils/ThemedTextInput";
import ThemedTextArea from "@/utils/ThemedTextArea";
import Button from "@/components/Button";
import SuccessModal from "@/components/SuccessModal";
// import DatePicker from '@/components/DatePicker';
import MultiImageUploadUI from "@/components/MultiImageUploadUI";
import MultiImagePickerModal from "@/components/MultiImagePickerModal";
import { useMultiImagePicker } from "@/utils/useMultiImagePicker";
// import DocumentsUploadUI from '@/components/DocumentUploadUI';
// import { useDocumentsPicker } from '@/utils/useDocumentsPicker';
import { useCreateAttractionListingMutation } from "@/redux/slices/providerSlice/attractionSlice";
import WeeklyScheduleTime from "@/components/WeeklyScheduleTime";
// import ImageUploadUI from '@/components/ImageUploadUI';
// import ImagePickerModal from '@/utils/ImagePickerModal';
import ThemedCheckbox from "@/utils/ThemedCheckbox";
import DropdownBox from "@/components/DropdownBox";
import { countries, currencies } from "@/../assets/data/data";

const ProviderAttractionAddListingScreen = () => {
  const {
    control,
    formState: { errors },
    // watch,
    setValue,
  } = useFormContext();

  // const theme = useColorScheme();
  const navigation = useNavigation();
  // const [photoPath, setPhotoPath] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  // const [modalVisibleSingle, setModalVisibleSingle] = useState(false);
  // const { pickFromGallery } = useImagePicker();
  const [showModal, setShowModal] = useState(false);
  // const { pickDocuments } = useDocumentsPicker();

  // const themedLabelClasses = `${
  //   theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
  // } text-md`;
  const { pickFromGalleryMulti } = useMultiImagePicker();

  const [createAttractionListing] = useCreateAttractionListingMutation();

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
            Add Attraction Details
          </ThemedText>
          <ThemedTextInput
            name="attractionDestinationType"
            control={control}
            error={errors?.attractionDestinationType?.message}
            label="Destination Type"
            placeholder="Type here..."
            type="text"
          />

          <ThemedTextArea
            name="attractionDescription"
            control={control}
            error={errors?.attractionDescription?.message}
            label="Description"
            placeholder="Type here..."
            type="text"
          />

          <ThemedTextInput
            name="attractionAddress"
            control={control}
            error={errors?.attractionAddress?.message}
            label="Address"
            placeholder="Type here..."
            type="text"
          />

          <ThemedTextInput
            name="attractionCity"
            control={control}
            error={errors?.attractionCity?.message}
            label="City"
            placeholder="Type here..."
            type="text"
          />

          <ThemedTextInput
            name="attractionPostalCode"
            control={control}
            error={errors?.attractionPostalCode?.message}
            label="Postal Code"
            placeholder="Type here..."
            type="text"
          />

          <ThemedTextInput
            name="attractionDistrict"
            control={control}
            error={errors?.attractionDistrict?.message}
            label="District / State / Province"
            placeholder="Type here..."
            type="text"
          />

          {/* <ThemedTextInput
              name="attractionCountry"
              control={control}
              error={errors?.attractionCountry?.message}
              label="Country"
              placeholder="Type here..."
              type="text"
            /> */}

          <View>
            <ThemedText styles={`font-Medium text-md mb-1`}>Country</ThemedText>
            <DropdownBox
              name="attractionCountry"
              options={countries}
              zIndex={900}
            />
          </View>

          <Controller
            name="attractionImages"
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <>
                <MultiImageUploadUI
                  value={value}
                  label="Upload  photos (max 5)"
                  onPress={() => setModalVisible(true)}
                  onRemove={(idx) => {
                    const updated = [...value];
                    updated.splice(idx, 1);
                    onChange(updated);
                  }}
                />

                <MultiImagePickerModal
                  visible={modalVisible}
                  onClose={() => setModalVisible(false)}
                  onPickGallery={() =>
                    pickFromGalleryMulti(
                      (newUris) => {
                        const combined = [...value, ...newUris].slice(0, 5); // max 5
                        onChange(combined);
                      },
                      () => setModalVisible(false)
                    )
                  }
                />
              </>
            )}
          />

          <ThemedTextInput
            name="attractionServicesOffered"
            control={control}
            error={errors?.attractionServicesOffered?.message}
            label="Services Offered"
            placeholder="Type here..."
            type="text"
          />

          <ThemedText3 styles="font-Medium text-md mb-2">Amenities</ThemedText3>

          <View style={{ gap: responsiveHeight(1.5) }}>
            <ThemedCheckbox
              label="Free WiFi"
              name="attractionFreeWifi"
              control={control}
              error={errors?.attractionFreeWifi?.message}
            />
            <ThemedCheckbox
              label="Free Parking"
              name="attractionFreeParking"
              control={control}
              error={errors?.attractionFreeParking?.message}
            />
            <ThemedCheckbox
              label="Kitchen"
              name="attractionKitchen"
              control={control}
              error={errors?.attractionKitchen?.message}
            />
            <ThemedCheckbox
              label="TV"
              name="attractionTv"
              control={control}
              error={errors?.attractionTv?.message}
            />
            <ThemedCheckbox
              label="Air Conditioning"
              name="attractionAirConditioning"
              control={control}
              error={errors?.attractionAirConditioning?.message}
            />
            <ThemedCheckbox
              label="Pool"
              name="attractionPool"
              control={control}
              error={errors?.attractionPool?.message}
            />
          </View>

          <ThemedTextInput
            name="attractionRating"
            control={control}
            error={errors?.attractionRating?.message}
            label="Rating"
            placeholder="Under 5.."
            type="number"
          />

          <ThemedTextInput
            name="attractionAdultPrice"
            control={control}
            error={errors?.attractionAdultPrice?.message}
            label="Adult Price"
            placeholder="Type here..."
            type="number"
          />
          <View>
            <ThemedText styles={`  font-Medium text-md mb-1`}>
              Currency
            </ThemedText>
            <DropdownBox name="currency" options={currencies} zIndex={1000} />
          </View>
          <ThemedTextInput
            name="attractionChildPrice"
            control={control}
            error={errors?.attractionChildPrice?.message}
            label="Child Price"
            placeholder="Type here..."
            type="number"
          />

          <ThemedTextInput
            name="category"
            control={control}
            error={errors?.category?.message}
            label="Category"
            placeholder="Type here..."
            type="text"
          />

          <ThemedTextInput
            name="discount"
            control={control}
            error={errors?.discount?.message}
            label="Discount (%)"
            placeholder="Type here..."
            type="number"
          />

          <WeeklyScheduleTime
            name="attractionSchedule"
            onScheduleSave={(data) => setValue("attractionSchedule", data)}
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
            path={null} // Or string / object if you want navigation
            ids={[
              "attractionDestinationType",
              "attractionDescription",
              "attractionAddress",
              "attractionCity",
              "attractionPostalCode",
              "attractionDistrict",
              "attractionCountry",
              "attractionImages",
              "attractionServicesOffered",
              // 'attractionFreeWifi',
              // 'attractionFreeParking',
              // 'attractionKitchen',
              // 'attractionTv',
              // 'attractionAirConditioning',
              // 'attractionPool',
              "attractionRating",
              "attractionAdultPrice",
              "attractionChildPrice",
              "category",
              "discount",
              "currency",
              "attractionSchedule",
            ]}
            onComplete={() => setShowModal(true)}
            submission={createAttractionListing}
            isAttractionActiveListingCreate={true}
          />
        </View>
        <SuccessModal visible={showModal} setVisible={setShowModal} />
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderAttractionAddListingScreen;
