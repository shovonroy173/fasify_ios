/* eslint-disable react-native/no-inline-styles */
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  // TouchableWithoutFeedback,
} from "react-native";
// import Octicons from 'react-native-vector-icons/Octicons';

import { Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import ThemedView from "@/utils/ThemedView";
import ThemedViewBlue from "@/utils/ThemedViewBlue";
import ThemedText2 from "@/utils/ThemeText2";
import ThemedTextInput from "@/utils/ThemedTextInput";
import Button from "@/components/Button";
import { useThemeColor } from "@/utils/useThemeColor";
import { Controller, useFormContext } from "react-hook-form";
import {
  useGetSingleUserQuery,
  useUpdateProfileMutation,
} from "@/redux/slices/authSlice";
import ImagePickerModal from "@/utils/ImagePickerModal";
import { useImagePicker } from "@/utils/useImagePicker";
import { useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react-native";
// import { useSelector } from 'react-redux';

const ProviderEditProfileScreen = () => {
  const navigation = useNavigation();
  const { icon } = useThemeColor();
  // const theme = useColorScheme();
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [updateProfile] = useUpdateProfileMutation();
  // const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { pickFromGallery } = useImagePicker();

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
            {/* <Octicons name="arrow-left" size={24} color={icon} /> */}
            
            <ChevronLeft size={22} color={icon} />

            {/* <Entypo name="chevron-small-left" size={24} color={icon} /> */}
          </Pressable>

          <ThemedText2 styles="font-SemiBold text-xl">
            Update Profile
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
                // paddingHorizontal: responsiveWidth(5),
                // paddingTop: responsiveHeight(2),
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
                  label="Full name"
                  placeholder="Enter your name"
                  type="text"
                />
                {/* <ThemedTextInput
                  name="email"
                  control={control}
                  error={errors?.email?.message}
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                /> */}
                <ThemedTextInput
                  name="address"
                  control={control}
                  error={errors?.address?.message}
                  label="Address"
                  placeholder="Enter your address"
                  type="text"
                />
                <ThemedTextInput
                  name="contactNumber"
                  control={control}
                  error={errors?.contactNumber?.message}
                  label="Contact to"
                  placeholder="Enter your phone no"
                  type="text"
                />
                <ThemedTextInput
                  name="country"
                  control={control}
                  error={errors?.country?.message}
                  label="Country"
                  placeholder="Enter your country"
                  type="text"
                />
              </ScrollView>
              <ThemedView
              // styles={isKeyboardVisible ? 'py-5 gap-5' : 'pb-5 gap-5'}
              >
                <ThemedView styles="gap-2 mb-4">
                  <Button
                    title="Save Changes"
                    navigation={navigation}
                    path={{ name: "ProviderBottomTab", screen: "Profile" }}
                    // ids={[
                    //   'profileImage',
                    //   'fullName',
                    //   // 'email',
                    //   'address',
                    //   'contactNumber',
                    //   'country',
                    // ]} // Used to check if role is selected before enabling button
                    noicon={true}
                    submission={updateProfile}
                    isProfileUpdate={true}
                  />
                </ThemedView>
              </ThemedView>
            </ThemedView>
          {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
      </ThemedView>
    </ThemedView>
  );
};

export default ProviderEditProfileScreen;
