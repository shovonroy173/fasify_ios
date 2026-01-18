import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GoBack from "@/components/GoBack";
import ThemedView from "@/utils/ThemedView";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import OTPVerificationModal from "@/components/OtpVerificationModal";
import ThemedText from "@/utils/ThemedText";
import ThemedText3 from "@/utils/ThemedText3";
// import ThemedText2 from '@/utils/ThemeText2';
import { useSelector } from "react-redux";
import { CheckCircle2, Edit } from "lucide-react-native";
import {
  useGetSingleUserQuery,
  usePhoneOTPVerifyMutation,
  usePhoneVerifyMutation,
} from "@/redux/slices/authSlice";
import { ActivityIndicator } from "react-native";

const EmailPhoneSettingScreen = () => {
  const navigation = useNavigation();

  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [phoneOtpModalVisible, setPhoneOtpModalVisible] = useState(false);
  const [isError, setIsError] = useState(null);

  const { control, watch } = useFormContext();
  const phone = watch("phone");

  const user = useSelector((state) => state.auth.user);
  const verifiedPhone = useSelector((state) => state.auth.phone);
  const isPhoneVerified = useSelector((state) => state.auth.isPhoneVerified);
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
    refetch,
  } = useGetSingleUserQuery(user?.id, {
    skip: !user?.id, // Skip if no user ID
  });
  console.log("LINE AT 328", isPhoneVerified, user, userData);

  const [phoneVerify, { isLoading: phoneSendLoading }] =
    usePhoneVerifyMutation();
  const [phoneOTPVerify] = usePhoneOTPVerifyMutation();

  // Mask phone number for display
  const maskPhone = (num) => {
    if (!num) return "";
    return num.replace(/.(?=.{4})/g, "*");
  };

  const onSavePhone = async () => {
    try {
      const res = await phoneVerify({ contactNumber: phone }).unwrap();
      console.log("OTP Sent:", res);

      setPhoneModalVisible(false);
      setPhoneOtpModalVisible(true);
    } catch (err) {
      console.log("Phone verify error:", err);
      setIsError(err?.data?.message);
    }
  };

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

      {/* Title */}
      <View>
        <ThemedText styles="text-3xl font-SemiBold mb-3">
          Email & Phone Number
        </ThemedText>
        <ThemedText3 styles="text-base leading-6">
          You will receive all transaction and security information to this
          email address & phone number
        </ThemedText3>
      </View>

      {/* Email section */}
      <View>
        <View className="flex-row items-center mb-4">
          <View className="w-6 h-6 rounded-full bg-green-100 items-center justify-center mr-3">
            <CheckCircle2 size={16} color="green" />
          </View>
          <Text className="text-green-500 font-medium">Verified Email</Text>
        </View>

        <ThemedText styles="text-lg">
          {user?.email || "testemail@gmail.com"}
        </ThemedText>
      </View>

      {/* Phone section */}
      {isUserLoading ? (
        <ActivityIndicator size={20} color={"blue"} />
      ) : (
        <View>
          <View className="flex-row items-center mb-4">
            {userData?.data?.contactNumber ? (
              <>
                <View className="w-6 h-6 rounded-full bg-green-100 items-center justify-center mr-3">
                  <CheckCircle2 size={16} color="green" />
                </View>
                <Text className="text-green-500 font-medium">
                  Verified Phone
                </Text>
              </>
            ) : (
              <>
                <View className="w-6 h-6 rounded-full bg-red-100 items-center justify-center mr-3" />
                <Text className="text-red-500 font-medium">
                  Unverified Phone
                </Text>
              </>
            )}
          </View>

          <View className="flex-row items-center justify-between">
            <ThemedText styles="text-lg">
              {userData?.data?.contactNumber || "Not added Yet"}
            </ThemedText>
            <Pressable
              className="p-2"
              onPress={() => setPhoneModalVisible(true)}
            >
              <Edit size={20} color="#3B82F6" />
            </Pressable>
          </View>
        </View>
      )}

      {/* PHONE EDIT MODAL */}

      {phoneModalVisible && (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {/* Overlay */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
              position: "absolute", // Ensures it's overlaid on top of the screen
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 100, // Ensures the overlay appears above other content
            }}
          >
            {/* Modal Content */}
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                width: "90%",
                maxWidth: 400, // You can adjust the max width
              }}
            >
              <Text className="text-lg font-semibold mb-3">Edit Phone</Text>

              {/* Input Field */}
              <Controller
                control={control}
                name="phone"
                rules={{
                  required: "Phone number is required",
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <TextInput
                      className="border border-gray-300 rounded-md px-3 py-2 text-base text-gray-900"
                      placeholder="Enter phone number"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="phone-pad"
                    />
                    {isError && (
                      <Text className="text-red-500 text-sm mt-1">
                        {isError}
                      </Text>
                    )}
                  </>
                )}
              />

              <View className="flex-row justify-end gap-4 mt-4">
                <Pressable
                  onPress={() => setPhoneModalVisible(false)} // Hide the overlay
                  className="px-4 py-2 rounded bg-gray-200"
                >
                  <Text className="text-gray-700">Cancel</Text>
                </Pressable>

                <Pressable
                  onPress={onSavePhone}
                  className="px-4 py-2 rounded bg-blue-600"
                >
                  <Text className="text-white">Send OTP</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
      {/* OTP Modal */}
      <Modal visible={phoneOtpModalVisible} animationType="slide" transparent>
        <OTPVerificationModal
          title="Verify Your Phone"
          authData={maskPhone(phone)}
          verifyAPI={phoneOTPVerify}
          phone={phone}
          onClose={() => setPhoneOtpModalVisible(false)}
        />
      </Modal>
    </ThemedView>
  );
};

export default EmailPhoneSettingScreen;
