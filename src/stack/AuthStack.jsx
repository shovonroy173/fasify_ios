import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BeginScreen from "@/screens/BeginScreen";
import RoleSelectionScreen from "@/screens/RoleSelectionScreen";
import SigninScreen from "@/screens/auth/SigninScreen";
import SignupScreen from "@/screens/auth/SignupScreen";
import ResetPasswordScreen from "@/screens/auth/ResetPasswordScreen";
import ForgotPasswordScreen from "@/screens/auth/ForgotPasswordScreen";
import ResetPasswordSuccessScreen from "@/screens/auth/ResetPasswordSuccessScreen";
import VerificationCodeScreen from "@/screens/auth/VerificationCodeScreen";
import EmailVerificationScreen from "@/screens/auth/EmailVerificationScreen";
import ProviderSignupScreen from "@/screens/auth/ProviderSignupScreen";
import ProviderSigninScreen from "@/screens/auth/ProviderSigninScreen";

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Begin" component={BeginScreen} />
      <Stack.Screen name="Role" component={RoleSelectionScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ProviderSignup" component={ProviderSignupScreen} />
      <Stack.Screen name="ProviderSignin" component={ProviderSigninScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="ResetPasswordSuccess"
        component={ResetPasswordSuccessScreen}
      />
      <Stack.Screen
        name="VerificationCode"
        component={VerificationCodeScreen}
      />
      <Stack.Screen
        name="EmailVerification"
        component={EmailVerificationScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
