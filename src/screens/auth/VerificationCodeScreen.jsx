/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  useColorScheme,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import ThemedView from '@/utils/ThemedView';
// import Feather from 'react-native-vector-icons/Feather';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedText from '@/utils/ThemedText';
// import ThemedTextInput from '@/utils/ThemedTextInput';
import { Controller, useFormContext } from 'react-hook-form';
import Button from '@/components/Button';
import ThemedTextColor from '@/utils/ThemedTextColor';
import ThemedText3 from '@/utils/ThemedText3';
// import ThemedPressable2 from '@/utils/ThemedPressable2';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import GoBack from '@/components/GoBack';
import OTPTextInput from 'react-native-otp-textinput';
import useT from '@/utils/useT';
import { useVerifyCodeMutation } from '@/redux/slices/authSlice';

const VerificationCodeScreen = () => {
  const navigation = useNavigation();

  const otpRef = useRef(null);

  const { control, getValues, reset } = useFormContext();

  const theme = useColorScheme();
  const t = useT();
  const [verifyCode] = useVerifyCodeMutation();
  const signupEmail = getValues('regEmail');
  // console.log('LINE AT 46', signupEmail);

  useEffect(() => {
    reset({
      otpRef: null,
    });
  }, []);

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
            // styles="flex-1"
            style={{
              // paddingHorizontal: responsiveWidth(5),
              // paddingTop: responsiveHeight(2),
              gap: responsiveHeight(5),
            }}
          >
            <ThemedView styles="gap-4 justify-center items-center">
              <ThemedText styles="font-Bold text-3xl h-26">
                {t('verification.title')}
              </ThemedText>
              <ThemedText3 styles="font-Regular text-md text-center">
                {t('verification.instruction')}
                <ThemedTextColor>{signupEmail}</ThemedTextColor>
              </ThemedText3>
            </ThemedView>
            <ScrollView
              className="flex-grow"
              showsVerticalScrollIndicator={false}
            >
              <View className="justify-center items-center">
                <Controller
                  control={control}
                  name="otp"
                  rules={{
                    required: t('verification.validation.otpRequired'),
                    minLength: {
                      value: 4,
                      message: t('verification.validation.fourDigitCode'),
                    },
                    maxLength: {
                      value: 4,
                      message: t('verification.validation.fourDigitCode'),
                    },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <OTPTextInput
                        ref={otpRef}
                        inputCount={4}
                        handleTextChange={onChange}
                        defaultValue={value}
                        tintColor="#d1d5db"
                        offTintColor="#d1d5db"
                        textInputStyle={{
                          borderWidth: 1,
                          borderColor: '#d1d5db',
                          color: theme === 'dark' ? '#ffffff' : '#000000',
                          backgroundColor:
                            theme === 'dark' ? '#000000' : '#ffffff',
                          width: responsiveWidth(12),
                          height: responsiveHeight(6),
                          fontSize: 18,
                          textAlign: 'center',
                          borderRadius: 8,
                          // ✅ No 3D shadow
                          borderBottomWidth: 1,
                        }}
                        containerStyle={{
                          width: responsiveWidth(80),
                          justifyContent: 'center',
                          gap: 10,
                        }}
                      />
                      {error && (
                        <Text className="text-red-500 text-xs font-Regular">
                          {error.message}
                        </Text>
                      )}
                    </>
                  )}
                />
              </View>

              {/* <ThemedView styles="flex-row justify-center items-center gap-2 mt-4">
                <Pressable>
                  <ThemedTextColor>{t('verification.resend')}</ThemedTextColor>
                </Pressable>
              </ThemedView> */}
            </ScrollView>

            <Button
              title={t('verification.verify')}
              navigation={navigation}
              path="ResetPassword"
              ids={['otp']} // Used to check if role is selected before enabling button
              submission={verifyCode}
              isVerifyCode={true}
            />
          </ThemedView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default VerificationCodeScreen;
