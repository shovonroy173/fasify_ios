import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import ThemedView from "@/utils/ThemedView";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import ThemedTextInput from "@/utils/ThemedTextInput";
import { Controller, useFormContext } from "react-hook-form";
import GoBack from "@/components/GoBack";
import TitleComponent from "@/components/TitleComponent";
import { useNavigation } from "@react-navigation/native";
import DropdownBox from "@/components/DropdownBox";
import { currencies, roomTypes } from "@/../assets/data/data";
import ThemedText3 from "@/utils/ThemedText3";
import Button from "@/components/Button";
import ThemedTextArea from "@/utils/ThemedTextArea";
import MultiImagePickerModal from "@/components/MultiImagePickerModal";
import MultiImageUploadUI from "@/components/MultiImageUploadUI";
import { useMultiImagePicker } from "@/utils/useMultiImagePicker";
import ThemedText from "@/utils/ThemedText";

// import DocumentsUploadUI from '@/components/DocumentUploadUI';
// import { useDocumentsPicker } from '@/utils/useDocumentsPicker';
// import ThemedCheckbox from '@/utils/ThemedCheckbox';

const ProviderHotelBusinessListingScreen = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const theme = useColorScheme();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [hotelImagesModalVisible, setHotelImagesModalVisible] = useState(false);
  const { pickFromGalleryMulti } = useMultiImagePicker();
  // const { pickDocuments } = useDocumentsPicker();

  const themedLabelClasses = `${
    theme === "dark" ? "text-zinc-500" : "text-zinc-400"
  } text-md`;

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
            title="Create Listings"
            subTitle="Please provide business information so we can setup our seller account."
          />
          {/* Existing Fields */}
          <View>
            <ThemedText styles={` font-Medium text-md mb-1`}>
              Room/Apartment Type
            </ThemedText>
            <DropdownBox
              name="hotelRoomType"
              options={roomTypes}
              zIndex={1000}
            />
          </View>

          <ThemedTextArea
            name="hotelRoomDescription"
            control={control}
            error={errors?.hotelRoomDescription?.message}
            label="Room Description"
            placeholder="Describe the room features, size, and amenities..."
            type="text"
          />

          {/* Hotel Images Upload */}
          <Controller
            name="hotelImages"
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <>
                <MultiImageUploadUI
                  value={value}
                  label="Upload Hotel Images"
                  onPress={() => setHotelImagesModalVisible(true)}
                  onRemove={(idx) => {
                    const updated = [...value];
                    updated.splice(idx, 1);
                    onChange(updated);
                  }}
                />

                <MultiImagePickerModal
                  visible={hotelImagesModalVisible}
                  onClose={() => setHotelImagesModalVisible(false)}
                  onPickGallery={() =>
                    pickFromGalleryMulti(
                      (newUris) => {
                        const combined = [...value, ...newUris].slice(0, 5);
                        onChange(combined);
                      },
                      () => setHotelImagesModalVisible(false)
                    )
                  }
                />
              </>
            )}
          />

          {/* Room Images Upload */}
          <Controller
            name="hotelRoomImages"
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <>
                <MultiImageUploadUI
                  value={value}
                  label="Upload Room Images"
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
                        const combined = [...value, ...newUris].slice(0, 5);
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
            name="hotelNumAdults"
            control={control}
            error={errors?.hotelNumAdults?.message}
            label="Adults Capacity"
            placeholder="Type here..."
            type="number"
          />

          <ThemedTextInput
            name="hotelNumChildren"
            control={control}
            error={errors?.hotelNumChildren?.message}
            label="Children Capacity"
            placeholder="Type here..."
            type="number"
          />

          <ThemedTextArea
            name="category"
            control={control}
            error={errors?.category?.message}
            label="Category"
            placeholder="e.g., Luxury, Budget, Business, Family..."
            type="text"
          />

          <ThemedTextInput
            name="hotelRating"
            control={control}
            error={errors?.hotelRating?.message}
            label="Rating"
            placeholder="0.0 to 5.0"
            type="number"
          />

          <ThemedTextInput
            name="hotelRoomPriceNight"
            control={control}
            error={errors?.hotelRoomPriceNight?.message}
            label="Price Per Night"
            placeholder="Type here..."
            type="number"
          />
          <View>
            <ThemedText3
              styles={`${themedLabelClasses}  font-Medium text-md mb-1`}
            >
              Currency
            </ThemedText3>
            <DropdownBox name="currency" options={currencies} zIndex={1000} />
          </View>

          <ThemedTextInput
            name="discount"
            control={control}
            error={errors?.discount?.message}
            label="Discount (%)"
            placeholder="0"
            type="number"
          />

          <ThemedTextInput
            name="hotelRoomCapacity"
            control={control}
            error={errors?.hotelRoomCapacity?.message}
            label="Room Capacity"
            placeholder="Type here..."
            type="text"
          />
        </ScrollView>

        <View
          style={{
            marginVertical: responsiveHeight(3),
          }}
        >
          <Button
            title="Continue"
            navigation={navigation}
            path="ProviderHotelRoomReview"
            ids={[
              // Room Configuration
              "hotelRoomType",
              "hotelRoomDescription",
              "hotelRoomCapacity",
              // "hotelNumberOfRooms",
              "hotelNumAdults",
              "hotelNumChildren",

              // Media Uploads
              "hotelImages",
              "hotelRoomImages",

              // Pricing & Classification
              "hotelRoomPriceNight",
              "hotelRating",
              "discount",
              "category",
              "currency",
            ]}
            noicon={true}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderHotelBusinessListingScreen;
