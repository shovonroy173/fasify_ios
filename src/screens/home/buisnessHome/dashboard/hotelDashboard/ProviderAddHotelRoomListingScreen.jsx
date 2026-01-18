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
import { useMultiImagePicker } from "@/utils/useMultiImagePicker";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import TitleComponent from "@/components/TitleComponent";
import ThemedText3 from "@/utils/ThemedText3";
import DropdownBox from "@/components/DropdownBox";
import { currencies, roomTypes } from "@/../assets/data/data";
import ThemedTextArea from "@/utils/ThemedTextArea";
import MultiImageUploadUI from "@/components/MultiImageUploadUI";
import MultiImagePickerModal from "@/components/MultiImagePickerModal";
import Button from "@/components/Button";
import { useCreateHotelRoomMutation } from "@/redux/slices/providerSlice/hotelSlice";
import SuccessModal from "@/components/SuccessModal";
import ThemedText from "@/utils/ThemedText";
import ThemedTextInput from "@/utils/ThemedTextInput";

const ProviderAddHotelRoomListingScreen = () => {
  const {
    control,
    formState: { errors },
    reset,
    setValue,
  } = useFormContext();

  const theme = useColorScheme();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [hotelImagesModalVisible, setHotelImagesModalVisible] = useState(false);
  const { pickFromGalleryMulti } = useMultiImagePicker();

  const themedLabelClasses = `${
    theme === "dark" ? "text-zinc-500" : "text-zinc-400"
  } text-md`;

  const [createHotelRoom] = useCreateHotelRoomMutation();

  // const resetData = useCallback(
  //   () => ({
  //     // Room Configuration
  //     hotelRoomType: "",
  //     hotelRoomDescription: "",
  //     hotelRoomCapacity: "",
  //     hotelNumberOfRooms: "",
  //     hotelNumAdults: "",
  //     hotelNumChildren: "",

  //     // Media Uploads
  //     hotelImages: [],
  //     hotelRoomImages: [],

  //     // Pricing & Classification
  //     hotelRoomPriceNight: "",
  //     hotelRating: "",
  //     discount: "",
  //     category: "",
  //     currency: "",
  //   }),
  //   []
  // );

  // // Reset form on component mount
  // useEffect(() => {
  //   reset(resetData());
  // }, [reset, resetData]);
  useEffect(() => {
    // Use setValue for each field instead of reset
    setValue("hotelRoomType", "");
    setValue("hotelRoomDescription", "");
    setValue("hotelRoomCapacity", "");
    setValue("hotelNumAdults", "");
    setValue("hotelNumChildren", "");
    setValue("hotelImages", []);
    setValue("hotelRoomImages", []);
    setValue("hotelRoomPriceNight", "");
    setValue("hotelRating", "");
    setValue("discount", "");
    setValue("category", "");
    setValue("currency", "");

    // selectedActiveListing will remain unchanged
  }, [setValue]);

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
      <GoBack navigation={navigation} />

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
            name="hotelRoomCapacity"
            control={control}
            error={errors?.hotelRoomCapacity?.message}
            label="Room Capacity"
            placeholder="Type here..."
            type="text"
          />

          <View>
            <ThemedText styles={` font-Medium text-md mb-1`}>
              Currency
            </ThemedText>
            <DropdownBox name="currency" options={currencies} zIndex={1000} />
          </View>

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

          <ThemedTextInput
            name="discount"
            control={control}
            error={errors?.discount?.message}
            label="Discount (%)"
            placeholder="0"
            type="number"
          />
        </ScrollView>
        {/* </TouchableWithoutFeedback> */}
        <View
          style={{
            marginVertical: responsiveHeight(3),
          }}
        >
          <Button
            title="Continue"
            navigation={navigation}
            path={null}
            ids={[
              // Room Configuration
              "hotelRoomType",
              "hotelRoomDescription",
              "hotelRoomCapacity",

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
            onComplete={() => setShowModal(true)}
            submission={createHotelRoom}
            isHotelRoomCreateListing={true}
            noicon={true}
          />
        </View>
        <SuccessModal visible={showModal} setVisible={setShowModal} />
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderAddHotelRoomListingScreen;
