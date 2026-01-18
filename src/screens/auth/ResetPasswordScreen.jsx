import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ThemedView from '@/utils/ThemedView';
// import Feather from 'react-native-vector-icons/Feather';
import { useThemeColor } from '@/utils/useThemeColor';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedText from '@/utils/ThemedText';
import ThemedTextInput from '@/utils/ThemedTextInput';
import { useFormContext } from 'react-hook-form';
import Button from '@/components/Button';
import ThemedTextColor from '@/utils/ThemedTextColor';
import ThemedText3 from '@/utils/ThemedText3';
import ThemedPressable2 from '@/utils/ThemedPressable2';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import GoBack from '@/components/GoBack';
import useT from '@/utils/useT';
import i18n from '@/utils/languageSetup';
import { useDispatch, useSelector } from 'react-redux';
import { useResetPasswordMutation } from '@/redux/slices/authSlice';
import { Eye, EyeOff } from 'lucide-react-native';

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const { icon2 } = useThemeColor();

  const changeLanguag = lang => {
    i18n.changeLanguage(lang);
  };
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordVisible2, setPasswordVisible2] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!isPasswordVisible2);
  };
  const t = useT();

  const [resetPassword] = useResetPasswordMutation();
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
          <ThemedView
            styles="flex-1"
            style={{
              // paddingHorizontal: responsiveWidth(5),
              // paddingTop: responsiveHeight(2),
              gap: responsiveHeight(2),
            }}
          >
            <ThemedView styles="gap-4">
              <ThemedText styles="font-Bold text-5xl h-26 mb-4">
                {t('setPassword.title')}
              </ThemedText>
              {/* <ThemedText3 styles="font-Regular text-lg">
                Enter the four digit verification code sent to your email.
                <ThemedTextColor> user2003@gmail.com</ThemedTextColor>
              </ThemedText3> */}
            </ThemedView>
            <ScrollView
              className="flex-grow"
              showsVerticalScrollIndicator={false}
            >
              <ThemedTextInput
                name="password"
                control={control}
                error={errors?.password?.message}
                label={t('setPassword.set')}
                placeholder={t('setPassword.placeholderSet')}
                type="text"
                secureTextEntry={!isPasswordVisible}
                rightIcon={
                  isPasswordVisible ? (
                    <EyeOff size={24} color={icon2} />
                  ) : (
                    <Eye size={24} color={icon2} />
                  )
                }
                onPress={togglePasswordVisibility}
              />
              <ThemedTextInput
                name="confirmPassword"
                control={control}
                error={errors?.confirmPassword?.message}
                label={t('setPassword.confirm')}
                placeholder={t('setPassword.placeholderConfirm')}
                type="text"
                secureTextEntry={!isPasswordVisible2}
                rightIcon={
                  isPasswordVisible2 ? (
                    <EyeOff size={24} color={icon2} />
                  ) : (
                    <Eye size={24} color={icon2} />
                  )
                }
                onPress={togglePasswordVisibility2}
              />
              {
                <Text className="text-red-500 text-xs font-Regular mb-2">
                  {errors && errors?.root?.message}
                </Text>
              }

              <ThemedView styles="flex-row justify-center items-center gap-2">
                <ThemedText3> {t('setPassword.remember')}</ThemedText3>
                <Pressable onPress={() => navigation.navigate('Signin')}>
                  <ThemedTextColor>{t('setPassword.signin')}</ThemedTextColor>
                </Pressable>
              </ThemedView>
            </ScrollView>

            <Button
              title={t('setPassword.button')}
              navigation={navigation}
              path="ResetPasswordSuccess"
              ids={['password', 'confirmPassword']} // Used to check if role is selected before enabling button
              submission={resetPassword}
              isResetPassword={true}
            />
          </ThemedView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ResetPasswordScreen;
