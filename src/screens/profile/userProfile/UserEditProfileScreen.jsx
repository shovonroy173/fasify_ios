import React, { useState, useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  // TouchableWithoutFeedback,
  Pressable,
  Image,
  Text,
} from "react-native";
import ThemedView from "@/utils/ThemedView";
import ThemedText2 from "@/utils/ThemeText2";
import ThemedTextInput from "@/utils/ThemedTextInput";
import Button from "@/components/Button";
import { useFormContext, Controller } from "react-hook-form";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import ImagePickerModal from "@/utils/ImagePickerModal";
import { useImagePicker } from "@/utils/useImagePicker";
import {
  useUpdateProfileMutation,
  useGetSingleUserQuery,
} from "@/redux/slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import { useThemeColor } from "@/utils/useThemeColor";
import ThemedViewBlue from "@/utils/ThemedViewBlue";
import useT from "@/utils/useT";
import { useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react-native";

const UserEditProfileScreen = () => {
  const navigation = useNavigation();
  const { icon } = useThemeColor();
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const t = useT();
  const [modalVisible, setModalVisible] = useState(false);
  const { pickFromGallery } = useImagePicker();
  const [updateProfile] = useUpdateProfileMutation();

  const user = useSelector((state) => state.auth.user);

  // Fetch user data (use your API query here)
  const {
    data: userData,
    isLoading,
    isError,
  } = useGetSingleUserQuery(user?.id);

  useEffect(() => {
    if (userData) {
      // Pre-fill form fields with user data
      setValue("profileImage", userData?.data?.profileImage || ""); // Example for profile image
      setValue("fullName", userData?.data?.fullName || "");
      setValue("address", userData?.data?.address || "");
      setValue("contactNumber", userData?.data?.contactNumber || "");
      setValue("country", userData?.data?.country || "");
    }
  }, [userData, setValue]);

  if (isLoading)
    return (
      <ThemedView className="flex-1">
        <Text>Loading...</Text>
      </ThemedView>
    ); // Show loading state

  if (isError)
    return (
      <ThemedView className="flex-1">
        <Text>Error loading user data</Text>
      </ThemedView>
    ); // Show error state

  return (
    <ThemedView styles="flex-1">
      <ThemedViewBlue
        style={{
          paddingHorizontal: responsiveWidth(6),
          paddingVertical: responsiveHeight(3),
          gap: responsiveHeight(3),
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <ThemedViewBlue styles="flex-row relative justify-center items-center">
          <Pressable
            onPress={() => navigation.goBack()}
            className="absolute left-0"
          >
            {/* Back button */}
            <ChevronLeft size={22} color={icon} />
          </Pressable>
          <ThemedText2 styles="font-SemiBold text-xl">
            {t("profile.update_profile")}
          </ThemedText2>
        </ThemedViewBlue>

        <Controller
          name="profileImage"
          control={control}
          render={({ field: { value, onChange } }) => (
            <>
              <Pressable
                onPress={() => setModalVisible(true)}
                className="items-center justify-between relative"
              >
                <Image
                  source={
                    value ? { uri: value } : require("assets/images/user.png")
                  }
                  style={{
                    width: responsiveWidth(18),
                    height: responsiveWidth(18),
                    borderRadius: 100,
                  }}
                />
                <Image
                  source={require("assets/images/camera.webp")}
                  className="absolute bottom-0 translate-x-2/3"
                />
              </Pressable>

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
      </ThemedViewBlue>

      <ThemedView
        style={{
          flex: 1,
          paddingHorizontal: responsiveWidth(6),
          paddingVertical: responsiveHeight(5),
          justifyContent: "space-between",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
          className="flex-1"
        >
          {/* <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            className="flex-1"
          > */}
            <ThemedView
              styles="flex-1"
              style={{
                gap: responsiveHeight(2),
              }}
            >
              <ScrollView
                className="flex-grow"
                showsVerticalScrollIndicator={false}
              >
                <ThemedTextInput
                  name="fullName"
                  control={control}
                  error={errors?.fullName?.message}
                  label={t("profile.full_name")}
                  placeholder={t("profile.full_name_placeholder")}
                  type="text"
                />

                <ThemedTextInput
                  name="address"
                  control={control}
                  error={errors?.address?.message}
                  label={t("profile.address")}
                  placeholder={t("profile.address_placeholder")}
                  type="text"
                />

                <ThemedTextInput
                  name="contactNumber"
                  control={control}
                  error={errors?.contactNumber?.message}
                  label={t("profile.contact_to")}
                  placeholder={t("profile.phone_placeholder")}
                  type="text"
                />

                <ThemedTextInput
                  name="country"
                  control={control}
                  error={errors?.country?.message}
                  label={t("profile.country")}
                  placeholder={t("profile.country_placeholder")}
                  type="text"
                />
              </ScrollView>

              <ThemedView>
                <Button
                  title={t("profile.save_changes")}
                  navigation={navigation}
                  path={{ name: "UserHome", screen: "Profile" }}
                  submission={updateProfile}
                  isProfileUpdate={true}
                />
              </ThemedView>
            </ThemedView>
          {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
      </ThemedView>
    </ThemedView>
  );
};

export default UserEditProfileScreen;
