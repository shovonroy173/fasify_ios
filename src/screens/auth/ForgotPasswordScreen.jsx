import {
  // View,
  // Text,
  // Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  // View,
  // Text,
  // Image,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import ThemedView from '@/utils/ThemedView';
// import Feather from 'react-native-vector-icons/Feather';
// import { useThemeColor } from '@/utils/useThemeColor';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedText from '@/utils/ThemedText';
import ThemedTextInput from '@/utils/ThemedTextInput';
import { useFormContext } from 'react-hook-form';
import Button from '@/components/Button';
// import ThemedTextColor from '@/utils/ThemedTextColor';
// import ThemedText3 from '@/utils/ThemedText3';
// import ThemedPressable2 from '@/utils/ThemedPressable2';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import GoBack from '@/components/GoBack';
// import ThemedText4 from '@/utils/ThemeText4';
import useT from '@/utils/useT';

// import CustomCheckbox from '@/components/CustomCheckbox';
import { useForgotPasswordEmailMutation } from '@/redux/slices/authSlice';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  // const { icon2 } = useThemeColor();
// 
  const {
    control,
    formState: { errors },
    // watch,
  } = useFormContext();

  const [forgotPasswordEmail] = useForgotPasswordEmailMutation();

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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
          <ThemedView
            // styles="flex-1"
            style={{
              gap: responsiveHeight(2),
            }}
          >
            <ThemedView styles="gap-2 justify-center items-center">
              <ThemedText styles="font-Bold text-3xl h-16">
                {/* {t('signin.title')} */}
                Forgot password
              </ThemedText>
              <ThemedText styles="font-Medium  text-center">
                {/* {t('signin.subtitle')} */}
                Enter your email account to reset your password
              </ThemedText>
            </ThemedView>

            <ScrollView
              //   className="flex-grow"
              showsVerticalScrollIndicator={false}
              gap={responsiveHeight(5)}
            >
              <ThemedTextInput
                name="email"
                control={control}
                error={errors?.email?.message}
                label={t('signin.email_label')}
                placeholder={t('signin.email_placeholder')}
                type="email"
              />
            </ScrollView>
            <Button
                title={t('resetPassword')}
              // title="Reset Password"
              navigation={navigation}
              path="VerificationCode"
              ids={['email']}
              noicon={true}
              submission={forgotPasswordEmail}
              isForgotPassword={true}
            />
          </ThemedView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ForgotPasswordScreen;
