import {
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  View,
  Text,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ThemedView from "@/utils/ThemedView";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import GoBack from "@/components/GoBack";
import { useNavigation } from "@react-navigation/native";
import ThemedText from "@/utils/ThemedText";
import useT from "@/utils/useT";
import ThemedTextInput from "@/utils/ThemedTextInput";
import { useFormContext } from "react-hook-form";
import { useThemeColor } from "@/utils/useThemeColor";
import { Eye, EyeOff } from "lucide-react-native";
import Button from "@/components/Button";
import {
  useLoginMutation,
  useSocialLoginMutation,
} from "@/redux/slices/authSlice";
import ThemedText3 from "@/utils/ThemedText3";
import messaging from "@react-native-firebase/messaging";

// import * as Google from 'expo-google-auth-session';
// import * as Facebook from 'expo-facebook';
// import * as AppleAuthentication from 'expo-apple-authentication';

import * as Keychain from "react-native-keychain";
import CustomCheckbox from "@/components/CustomCheckbox";
import ThemedTextColor from "@/utils/ThemedTextColor";
import ThemedPressable2 from "@/utils/ThemedPressable2";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import {
  configureGoogleSignIn,
  handleGoogleLogin,
} from "@/utils/googleAuthService";

const ProviderSigninScreen = () => {
  const navigation = useNavigation();
  const { icon2 } = useThemeColor();
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [login] = useLoginMutation();
  const [socialLogin] = useSocialLoginMutation();
  const { role } = getValues();
  // console.log("RENDER SIGIN SCREEN", getValues("role"));
  useEffect(() => {
    setValue("providerLogEmail", "");
    setValue("providerLogPassword", "");
  }, [setValue]);

  const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);

  // Save and load credentials from Keychain (secure storage)
  // const saveCredentials = async (providerLogEmail, providerLogPassword) => {
  //   try {
  //     await Keychain.setGenericPassword(providerLogEmail, providerLogPassword, {
  //       accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
  //     });
  //   } catch (error) {
  //     console.error("Failed to save credentials securely:", error);
  //   }
  // };

  // const loadCredentials = async () => {
  //   try {
  //     const credentials = await Keychain.getGenericPassword();
  //     console.log("LINE AT 84", credentials);

  //     if (credentials) {
  //       return {
  //         providerLogEmail: credentials.providerLogEmail,
  //         providerLogPassword: credentials.providerLogPassword,
  //       };
  //     }
  //   } catch (error) {
  //     console.error("Failed to load credentials securely:", error);
  //   }
  //   return { providerLogEmail: "", providerLogPassword: "" };
  // };

  // const clearCredentials = async () => {
  //   try {
  //     await Keychain.resetGenericPassword();
  //   } catch (error) {
  //     console.error("Failed to clear credentials securely:", error);
  //   }
  // };

  const saveCredentials = async (email, password) => {
    try {
      await Keychain.setInternetCredentials(
        "provider_auth", // Service name for provider
        email,
        password,
        {
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
        }
      );
    } catch (error) {
      console.error("Failed to save provider credentials:", error);
    }
  };

  const loadCredentials = async () => {
    try {
      const credentials =
        await Keychain.getInternetCredentials("provider_auth");
      if (credentials) {
        return {
          providerLogEmail: credentials.username,
          providerLogPassword: credentials.password,
        };
      }
    } catch (error) {
      console.error("Failed to load provider credentials:", error);
    }
    return { providerLogEmail: "", providerLogPassword: "" };
  };

  const clearCredentials = async () => {
    try {
      await Keychain.resetInternetCredentials("provider_auth");
    } catch (error) {
      console.error("Failed to clear provider credentials:", error);
    }
  };

  useEffect(() => {
    const preloadCredentials = async () => {
      const { providerLogEmail, providerLogPassword } = await loadCredentials();
      if (providerLogEmail && providerLogPassword) {
        setValue("providerLogEmail", providerLogEmail);
        setValue("providerLogPassword", providerLogPassword);
        setIsChecked(true);
      }
    };
    preloadCredentials();
  }, []);

  const handleSubmitLogin = (data) => ({
    unwrap: async () => {
      if (isChecked) {
        console.log("LINE AT", data);

        await saveCredentials(data.email, data.password);
      } else {
        await clearCredentials();
      }

      return await login(data).unwrap();
    },
  });

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const handleGoogleSignIn = async () => {
    const result = await handleGoogleLogin();

    if (result?.success) {
      const fcmToken = await messaging().getToken();

      const itemData = {
        providerLogEmail: result.user.providerLogEmail,
        role: role,
        fcmToken: fcmToken,
      };

      await socialLogin(itemData).unwrap();
      navigation.navigate("ClientTypeHome");
    } else {
      console.log("Login failed:", result.error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      console.log("LINE AT 173", result);

      if (result.isCancelled) {
        console.log("Login cancelled");
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        console.log("Something went wrong getting access token");
        return;
      }

      const responseFB = await fetch(
        `https://graph.facebook.com/v17.0/me?fields=id,name,email&access_token=${data.accessToken}`
      );

      const userInfo = await responseFB.json();

      const fcmToken = await messaging().getToken();

      const itemData = {
        email: userInfo.email,
        // password: password,
        role: role,
        fcmToken: fcmToken,
      };

      const response = await socialLogin(itemData).unwrap();
      console.log("Social login response:", response);
      navigation.navigate("ClientTypeHome");
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };

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
      <GoBack navigation={navigation} />
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
                {t("signin.title")}
              </ThemedText>
              <ThemedText styles="font-Bold text-lg">
                {t("signin.subtitle")}!
              </ThemedText>
            </ThemedView>

            <ScrollView
              className="flex-grow"
              showsVerticalScrollIndicator={false}
            >
              <ThemedTextInput
                name="providerLogEmail"
                control={control}
                label={t("signin.email_label")}
                placeholder={t("signin.email_placeholder")}
                type="email"
              />
              <ThemedTextInput
                name="providerLogPassword"
                control={control}
                label={t("signin.password_label")}
                placeholder={t("signin.password_placeholder")}
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

              <Text className="text-red-500 text-xs font-Regular mb-2">
                {errors?.root?.message}
              </Text>

              <ThemedView styles="gap-2">
                <Button
                  title={t("signin.button")}
                  navigation={navigation}
                  path="ClientTypeHome"
                  ids={["providerLogEmail", "providerLogPassword"]}
                  submission={handleSubmitLogin}
                  isProviderLogin={true}
                />

                <View className="flex-row items-center justify-between mt-2">
                  <View className="flex-row items-center justify-center gap-2">
                    <CustomCheckbox
                      checked={isChecked}
                      onToggle={() => setIsChecked((prev) => !prev)}
                    />
                    <ThemedText styles="font-Medium font-md">
                      Remember me
                    </ThemedText>
                  </View>
                  <Pressable
                    onPress={() => navigation.navigate("ForgotPassword")}
                  >
                    <ThemedText styles="font-Medium font-md border-b">
                      Forgot password?
                    </ThemedText>
                  </Pressable>
                </View>

                <ThemedView styles="gap-5">
                  {/* <ThemedText3 styles="font-Medium text-center">
                    {t("signin.or")}
                  </ThemedText3> */}

                  {/* <ThemedView styles="flex-row items-center justify-center gap-2">
                    <ThemedPressable2
                      onPress={handleFacebookLogin}
                      styles="flex-row items-center justify-center rounded-md"
                      style={{
                        height: responsiveHeight(9),
                        width: responsiveWidth(28),
                      }}
                    >
                      <Image
                        source={require("assets/images/fbicon.webp")}
                        style={{
                          width: responsiveWidth(6),
                          height: responsiveHeight(3),
                        }}
                      />
                    </ThemedPressable2>

                    <ThemedPressable2
                      onPress={handleGoogleSignIn}
                      styles="flex-row items-center justify-center rounded-md"
                      style={{
                        height: responsiveHeight(9),
                        width: responsiveWidth(28),
                      }}
                    >
                      <Image
                        source={require("assets/images/google.webp")}
                        style={{
                          width: responsiveWidth(10),
                          height: responsiveHeight(5),
                        }}
                      />
                    </ThemedPressable2>
                  </ThemedView> */}

                  <ThemedView styles="flex-row items-center justify-center gap-2">
                    <ThemedText3 styles="font-Medium">
                      {t("signin.no_account")}
                    </ThemedText3>
                    <Pressable
                      onPress={() => navigation.navigate("ProviderSignup")}
                    >
                      <ThemedTextColor styles="font-Medium">
                        {t("signin.signup")}
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

export default ProviderSigninScreen;
