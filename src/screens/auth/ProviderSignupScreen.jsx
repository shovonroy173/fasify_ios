import {
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Text,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ThemedView from "@/utils/ThemedView";

import { useThemeColor } from "@/utils/useThemeColor";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import ThemedText from "@/utils/ThemedText";
import ThemedTextInput from "@/utils/ThemedTextInput";
import { useFormContext } from "react-hook-form";
import Button from "@/components/Button";
import ThemedTextColor from "@/utils/ThemedTextColor";
import ThemedText3 from "@/utils/ThemedText3";
// import Ionicons from 'react-native-vector-icons/Ionicons';
import GoBack from "@/components/GoBack";
import DropdownBox from "@/components/DropdownBox";
import { languageOptions } from "@/../assets/data/data";
import i18n from "@/utils/languageSetup";
import useT from "@/utils/useT";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useProviderRegisterMutation } from "@/redux/slices/authSlice";
import { Eye, EyeOff } from "lucide-react-native";

const ProviderSignupScreen = () => {
  const navigation = useNavigation();
  const { icon2 } = useThemeColor();

  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  // console.log("RENDER SIGNUP SCREEN", watch("role"));

  useEffect(() => {
    setValue("providerRegEmail", "");
    setValue("providerRegPassword", "");
  }, [setValue]);

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const selectedLanguage = watch("language");

  const saveLanguage = async (lang) => {
    await AsyncStorage.setItem("appLanguage", lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    if (selectedLanguage) {
      saveLanguage(selectedLanguage);
    }
  }, [selectedLanguage]);
  // console.log("LINE AT 58", errors);

  const [providerRegister] = useProviderRegisterMutation();

  const t = useT();
  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(5),
      }}
    >
      <ThemedView styles=" justify-between">
        <View className="">
          <GoBack navigation={navigation} />
        </View>
        <View
          style={{
            height: responsiveHeight(8),
            marginTop: responsiveHeight(3),
          }}
        >
          <DropdownBox name="language" options={languageOptions} />
        </View>
      </ThemedView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
          <ThemedView
            styles="flex-1"
            style={{
              gap: responsiveHeight(2),
            }}
          >
            <ThemedView styles="gap-2">
              <ThemedText styles="font-Bold text-5xl h-16">
                {t("signup.title")}
              </ThemedText>
              <ThemedText styles="font-Bold text-lg">
                {t("signup.subtitle")}
              </ThemedText>
            </ThemedView>

            <ScrollView
              className="flex-grow"
              showsVerticalScrollIndicator={false}
            >
              <ThemedTextInput
                name="providerRegEmail"
                control={control}
                error={errors?.providerRegEmail?.message}
                label={t("signup.email_label")}
                placeholder={t("signup.email_placeholder")}
                type="email"
              />

              <ThemedTextInput
                name="providerRegPassword"
                control={control}
                error={errors?.providerRegPassword?.message}
                label={t("signup.password_label")}
                placeholder={t("signup.password_placeholder")}
                type="text"
                secureTextEntry={!isPasswordVisible}
                rightIcon={
                  isPasswordVisible ? (
                    <EyeOff size={24} color={icon2} />
                  ) : (
                    <Eye size={24} color={icon2} />
                  )
                }
                onPressToggle={togglePasswordVisibility}
              />
              {
                <Text className="text-red-500 text-xs font-Regular mb-2">
                  {errors && errors?.root?.message}
                </Text>
              }
              <ThemedView styles="gap-4">
                <Button
                  title={t("signup.button")}
                  navigation={navigation}
                  path="EmailVerification"
                  submission={providerRegister}
                  isProviderRegister={true}
                  ids={["providerRegEmail", "providerRegPassword"]}
                />

                <ThemedView styles="gap-5">
                  <ThemedView styles="flex-row items-center justify-center gap-2">
                    <ThemedText3 styles="font-Medium">
                      {t("signup.already_account")}
                    </ThemedText3>
                    <Pressable onPress={() => navigation.navigate("Signin")}>
                      <ThemedTextColor styles="font-Medium">
                        {t("signup.signin")}
                      </ThemedTextColor>
                    </Pressable>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            </ScrollView>
          </ThemedView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderSignupScreen;
