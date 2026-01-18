import {
  View,
  KeyboardAvoidingView,
  Platform,
  // TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  useColorScheme,
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
import ThemedText from "@/utils/ThemedText";
import ThemedText3 from "@/utils/ThemedText3";
import DropdownBox from "@/components/DropdownBox";
import {
  countries,
  currencies,
  hotelAccomodationTypes,
  roomTypes,
} from "assets/data/data";
import ThemedTextInput from "@/utils/ThemedTextInput";
import ThemedTextArea from "@/utils/ThemedTextArea";
import Button from "@/components/Button";
import SuccessModal from "@/components/SuccessModal";
import ThemedCheckbox from "@/utils/ThemedCheckbox";
import { useUpdateProviderHotelRoomMutation } from "@/redux/slices/providerSlice/hotelSlice";
import { useMultiImagePicker } from "@/utils/useMultiImagePicker";
import MultiImageUploadUI from "@/components/MultiImageUploadUI";
import MultiImagePickerModal from "@/components/MultiImagePickerModal";

const ProviderEditHotelRoomListingScreen = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const theme = useColorScheme();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [hotelImagesModalVisible, setHotelImagesModalVisible] = useState(false);
  const { pickFromGalleryMulti } = useMultiImagePicker();

  const [showModal, setShowModal] = useState(false);

  const themedLabelClasses = `${
    theme === "dark" ? "text-zinc-500" : "text-zinc-400"
  } text-md`;
  const [updateProviderHotelRoom] = useUpdateProviderHotelRoomMutation();

  const providerRoom = watch("selectedActiveListingRoom");
  console.log("LINE AT 77", providerRoom);

  const getPlaceholder = (fieldName) => {
    const value = providerRoom?.[fieldName];
    if (value) return value;
    return "Type here...";
  };

  const getPlaceholderNumber = (fieldName) => {
    const value = providerRoom?.[fieldName];
    if (value) return value.toString();
    return "0";
  };

  const getPlaceholderPrice = (fieldName) => {
    const value = providerRoom?.[fieldName];
    if (value) return value.toString();
    return "0.00";
  };

  const getPlaceholderRating = (fieldName) => {
    const value = providerRoom?.[fieldName];
    if (value) return value.toString();
    return "0.0 to 5.0";
  };

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
        <ThemedText styles="font-SemiBold text-xl">
          Edit Room Details
        </ThemedText>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        className="flex-1"
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1"> */}
          <ScrollView
            className="flex-grow"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: responsiveHeight(2),
            }}
          >
            {/* Room/Apartment Type */}
            <View>
              <ThemedText styles={`font-Medium text-md mb-1`}>
                Room/Apartment Type
              </ThemedText>
              <DropdownBox
                name="hotelRoomType"
                options={roomTypes}
                zIndex={1000}
                placeholder={getPlaceholder("hotelRoomType")}
              />
            </View>


            {/* Hotel Images Upload */}
            <Controller
              name="hotelImages"
              control={control}
              render={({ field: { value = [], onChange } }) => (
                <>
                  <MultiImageUploadUI
                    value={
                      value.length > 0 ? value : providerRoom?.hotelImages || []
                    }
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
                    value={
                      value.length > 0
                        ? value
                        : providerRoom?.hotelRoomImages || []
                    }
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
              name="hotelRoomPriceNight"
              control={control}
              error={errors?.hotelRoomPriceNight?.message}
              label="Price Per Night"
              placeholder={getPlaceholderPrice("hotelRoomPriceNight")}
              type="number"
            />

            <View>
              <ThemedText styles={`font-Medium text-md mb-1`}>
                Currency
              </ThemedText>
              <DropdownBox
                name="currency"
                options={currencies}
                zIndex={1000}
                placeholder={getPlaceholder("currency")}
              />
            </View>

            <ThemedTextInput
              name="discount"
              control={control}
              error={errors?.discount?.message}
              label="Discount (%)"
              placeholder={getPlaceholderNumber("discount")}
              type="number"
            />

            <ThemedTextInput
              name="hotelRoomCapacity"
              control={control}
              error={errors?.hotelRoomCapacity?.message}
              label="Room Capacity"
              placeholder={getPlaceholder("hotelRoomCapacity")}
              type="text"
            />

            <ThemedTextInput
              name="hotelNumAdults"
              control={control}
              error={errors?.hotelNumAdults?.message}
              label="Adults Capacity"
              placeholder={getPlaceholderNumber("hotelNumAdults")}
              type="number"
            />

            <ThemedTextInput
              name="hotelNumChildren"
              control={control}
              error={errors?.hotelNumChildren?.message}
              label="Children Capacity"
              placeholder={getPlaceholderNumber("hotelNumChildren")}
              type="number"
            />

            <ThemedTextInput
              name="hotelRating"
              control={control}
              error={errors?.hotelRating?.message}
              label="Rating (1-5)"
              placeholder={getPlaceholderRating("hotelRating")}
              type="number"
            />

            <ThemedTextArea
              name="category"
              control={control}
              error={errors?.category?.message}
              label="Category"
              placeholder={getPlaceholder("category")}
              type="text"
            />
          </ScrollView>
        {/* </TouchableWithoutFeedback> */}
        <View className="pt-5">
          <Button
            title="Submit"
            navigation={navigation}
            path={null}
            ids={[]}
            submission={updateProviderHotelRoom}
            onComplete={() => setShowModal(true)}
            isUpdateProviderHotelRoom={true}
          />
        </View>
        <SuccessModal visible={showModal} setVisible={setShowModal} />
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderEditHotelRoomListingScreen;
