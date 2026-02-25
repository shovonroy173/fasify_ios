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
  Alert,
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
import { Apple, AppleIcon, Eye, EyeOff } from "lucide-react-native";
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
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from "@invertase/react-native-apple-authentication";
import { Buffer } from "buffer";

import * as Keychain from "react-native-keychain";
import CustomCheckbox from "@/components/CustomCheckbox";
import ThemedTextColor from "@/utils/ThemedTextColor";
import ThemedPressable2 from "@/utils/ThemedPressable2";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import {
  configureGoogleSignIn,
  handleGoogleLogin,
} from "@/utils/googleAuthService";

const SigninScreen = () => {
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
    setValue("email", "");
    setValue("password", "");
  }, [setValue]);

  const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);


  const saveCredentials = async (email, password) => {
    try {
      await Keychain.setInternetCredentials(
        "user_auth", // Service name for user
        email,
        password,
        {
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
        }
      );
    } catch (error) {
      console.error("Failed to save user credentials:", error);
    }
  };

  const loadCredentials = async () => {
    try {
      const credentials = await Keychain.getInternetCredentials("user_auth");
      if (credentials) {
        console.log("LINE AT ", credentials);

        return {
          email: credentials.username,
          password: credentials.password,
        };
      }
    } catch (error) {
      console.error("Failed to load user credentials:", error);
    }
    return { email: "", password: "" };
  };

  const clearCredentials = async () => {
    try {
      await Keychain.resetInternetCredentials("user_auth");
    } catch (error) {
      console.error("Failed to clear user credentials:", error);
    }
  };

  useEffect(() => {
    const preloadCredentials = async () => {
      const { email, password } = await loadCredentials();
      if (email && password) {
        setValue("email", email);
        setValue("password", password);
        setIsChecked(true);
      }
    };
    preloadCredentials();
  }, []);

  const handleSubmitLogin = (data) => ({
    unwrap: async () => {
      if (isChecked) {
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

  const [appleSupported, setAppleSupported] = useState(false);

  useEffect(() => {
    let mounted = true;
    const checkSupport = async () => {
      try {
        if (!appleAuth) {
          if (mounted) setAppleSupported(false);
          return;
        }

        if (typeof appleAuth.isSupported === "function") {
          const sup = await appleAuth.isSupported();
          if (mounted) setAppleSupported(!!sup);
          return;
        }

        if (typeof appleAuth.isSupported !== "undefined") {
          if (mounted) setAppleSupported(!!appleAuth.isSupported);
          return;
        }

        // Fallback: assume supported on iOS when module is present
        if (mounted) setAppleSupported(Platform.OS === "ios");
      } catch (err) {
        console.warn("Failed to check Apple auth support", err);
        if (mounted) setAppleSupported(false);
      }
    };
    checkSupport();
    return () => {
      mounted = false;
    };
  }, []);

  const handleGoogleSignIn = async () => {
    const result = await handleGoogleLogin();

    if (result?.success) {
      const fcmToken = await messaging().getToken();

      const itemData = {
        email: result.user.email,
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

      // console.log('User Info:', userInfo);
      // console.log('Email:', userInfo.email);
      // console.log('Access Token:', data.accessToken.toString());

      // send access token back to react-hook-form
      // onChange(data.accessToken.toString());
      // console.log(data.accessToken.toString());
      // console.log("LINE AT 188", jwtDecode(data.accessToken));
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      if (!appleAuth || !appleAuth.isSupported) {
        console.warn("Apple sign-in is not supported on this device.");
        return;
      }

      const requestedOperation =
        AppleAuthRequestOperation?.LOGIN ?? appleAuth?.Operation?.LOGIN;
      const scopeEmail =
        AppleAuthRequestScope?.EMAIL ?? appleAuth?.Scope?.EMAIL ?? appleAuth?.RequestScope?.EMAIL;
      const scopeFullName =
        AppleAuthRequestScope?.FULL_NAME ?? appleAuth?.Scope?.FULL_NAME ?? appleAuth?.RequestScope?.FULL_NAME;

      if (!requestedOperation) {
        console.warn(
          "Apple auth constants are unavailable at runtime; aborting sign-in."
        );
        return;
      }

      const requestedScopes = [scopeEmail, scopeFullName].filter(Boolean);

      const appleResponse = await appleAuth.performRequest({
        requestedOperation,
        requestedScopes,
      });

      const { email, identityToken } = appleResponse || {};

      // Try to extract email from identityToken if it's not returned directly
      let userEmail = email;
      if (!userEmail && identityToken) {
        try {
          const base64Url = identityToken.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const decoded = Buffer.from(base64, "base64").toString("utf8");
          const payload = JSON.parse(decoded);
          userEmail = payload?.email;
        } catch (err) {
          console.warn("Failed to decode Apple identity token:", err);
        }
      }

      if (!userEmail) {
        console.warn("Apple sign-in did not return an email.");
        return;
      }

      // const fcmToken = await messaging().getToken();

      const itemData = {
        email: userEmail,
        role: role,
        // fcmToken: fcmToken,
      };

      await socialLogin(itemData).unwrap();
      navigation.navigate("ClientTypeHome");
    } catch (error) {
      console.error("Apple sign-in error:", error);
      const needsPasscodeMsg = `Sign in with Apple failed. Ensure your device has a passcode set and you are signed in to an Apple ID. Test on a physical iOS device with Sign in with Apple enabled in your app.`;
      const genericMsg = `Apple sign-in failed. Please try another sign-in method.`;
      const message = (error?.code === "1000" || error?.nativeStackIOS) ? needsPasscodeMsg : genericMsg;
      Alert.alert("Apple Sign-In unavailable", message);
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
                {t("signin.subtitle")}
              </ThemedText>
            </ThemedView>

            <ScrollView
              className="flex-grow"
              showsVerticalScrollIndicator={false}
            >
              <ThemedTextInput
                name="email"
                control={control}
                label={t("signin.email_label")}
                placeholder={t("signin.email_placeholder")}
                type="email"
              />
              <ThemedTextInput
                name="password"
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
                  ids={["email", "password"]}
                  submission={handleSubmitLogin}
                  isLogin={true}
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
{/* 
                  <ThemedView styles="flex-row items-center justify-center gap-2">
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

                    {Platform.OS === 'ios' && (
                      <ThemedPressable2
                        onPress={appleSupported ? handleAppleSignIn : () => Alert.alert('Apple Sign-In unavailable', 'Sign in with Apple is not available on this device. Please use another sign-in method or test on a device with passcode and Apple ID.')}
                        disabled={!appleSupported}
                        accessibilityState={{ disabled: !appleSupported }}
                        styles="flex-row items-center justify-center rounded-md"
                        style={{
                          height: responsiveHeight(9),
                          width: responsiveWidth(28),
                          opacity: appleSupported ? 1 : 0.4,
                        }}
                      >
                        <Image source={require('assets/images/apple.png')} style={{ width: responsiveWidth(7), height: responsiveHeight(4) }} />
                      </ThemedPressable2>
                    )}
                  </ThemedView> */}

                  <ThemedView styles="flex-row items-center justify-center mt-4 gap-2">
                    <ThemedText3 styles="font-Medium">
                      {t("signin.no_account")}
                    </ThemedText3>
                    <Pressable onPress={() => navigation.navigate("Signup")}>
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

export default SigninScreen;
