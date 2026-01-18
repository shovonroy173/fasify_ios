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
import ThemedTextColor from '../utils/ThemedTextColor';
import { useDispatch } from 'react-redux';
import { setPhone, setPhoneVerified, } from '../redux/reducers/authReducer';


const OTPVerificationModal = ({
  onClose,
  title,
  authData,
  verifyAPI,
  phone,
}) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const otpRef = useRef(null);
  const dispatch = useDispatch();

  const handleOtpChange = value => {
    setOtp(value);
  };

  const verifyNow = async () => {
    try {
      setLoading(true);
      setErrorMsg('');

      const res = await verifyAPI({ otp }).unwrap();
      console.log('OTP Verified:', res);
      dispatch(setPhoneVerified(true));
      dispatch(setPhone(phone));
      setLoading(false);
      onClose();
    } catch (err) {
      console.log('OTP error:', err);
      setErrorMsg(err?.data?.message || 'Invalid OTP');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (otp.length === 4 && !loading) {
      verifyNow();
    }
  }, [otp]);

  return (
    <View className="flex-1 bg-black/50 justify-center items-center px-4">
      <View className="bg-white p-6 rounded-lg w-full">
        <Text className="text-xl font-bold mb-4 text-center">{title}</Text>

        <Text className="text-gray-600 text-base mb-1 text-center">
          Enter the OTP sent to:
        </Text>

        <Text className="text-gray-900 font-bold mb-6 text-center">
          {authData}
        </Text>

        {/* OTP Box */}
        <View className="justify-center items-center mb-6">
          <OTPTextInput
            ref={otpRef}
            inputCount={4}
            handleTextChange={handleOtpChange}
            tintColor="#d1d5db"
            offTintColor="#d1d5db"
          />

          {/* <Text className="text-blue-600 mt-4">Send a new OTP</Text> */}
        </View>

        {errorMsg !== '' && (
          <Text className="text-red-500 text-center mb-3">{errorMsg}</Text>
        )}

        {loading && (
          <View className="items-center mb-4">
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text className="text-gray-500 mt-2">Verifying...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default OTPVerificationModal;
