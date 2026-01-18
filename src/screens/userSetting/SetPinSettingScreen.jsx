import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedView from '../../utils/ThemedView';
import GoBack from '../../components/GoBack';
import { useNavigation } from '@react-navigation/native';
import ThemedText from '../../utils/ThemedText';

const SetPinSettingScreen = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const otpRef = useRef(null);
  const theme = useColorScheme();

  const navigation = useNavigation();

  const handleOtpChange = value => {
    setOtp(value);
  };

  useEffect(() => {
    if (otp.length === 4) {
      setLoading(true);
      // Simulate verification delay
      setTimeout(() => {
        console.log('Verified OTP:', otp);
        setLoading(false);
        navigation.navigate('UserPinConfirmSetting')
      }, 1500);
    }
  }, [otp]);
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
      <View>
        <ThemedText styles="text-3xl font-SemiBold mb-4 ">
          Set Pin
        </ThemedText>
        <ThemedText styles=" text-base font-Regular mb-6 ">
         Enter a 6 digit number for your PIN. Make sure the combination is not easy to guess.
        </ThemedText>

        <View className="justify-center items-center mb-6">
          <OTPTextInput
            ref={otpRef}
            inputCount={6}
            handleTextChange={handleOtpChange}
            defaultValue=""
            tintColor="#d1d5db"
            offTintColor="#d1d5db"
            textInputStyle={{
              borderWidth: 1,
              borderColor: '#d1d5db',
              color: theme === 'dark' ? '#ffffff' : '#000000',
              backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
              width: responsiveWidth(11),
              height: responsiveHeight(6),
              fontSize: 14,
              textAlign: 'center',
              borderRadius: 8,
              borderBottomWidth: 1,
            }}
            containerStyle={{
              width: responsiveWidth(80),
              justifyContent: 'center',
              gap: 4,
            }}
          />
        </View>
      </View>

      {loading && (
        <View className="items-center mb-4">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-gray-500 mt-2">Verifying...</Text>
        </View>
      )}
    </ThemedView>
  );
};

export default SetPinSettingScreen;
