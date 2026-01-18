import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  CheckBox,
  useColorScheme,
  Image,
  Alert,
} from 'react-native';
import ThemedView from '../../utils/ThemedView';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import GoBack from '../../components/GoBack';
import { useNavigation } from '@react-navigation/native';
import ThemedText from '../../utils/ThemedText';
import ThemedText3 from '../../utils/ThemedText3';
import ThemedText2 from '../../utils/ThemeText2';
import { useDeleteUserAccountMutation } from '../../redux/slices/authSlice';

const DeleteAccountScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const theme = useColorScheme();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const navigation = useNavigation();
  const [deleteUserAccount] = useDeleteUserAccountMutation();
  const handleDelete = async () => {
    try {
      const res = await deleteUserAccount().unwrap(); // if using RTK Query mutation
      // OR: await deleteUserAccount();
      console.log('LINE AT 37', res);

      Alert.alert(
        'Account Deleted',
        'Your account has been removed successfully.',
      );
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }], // reset navigation stack
      });
    } catch (err) {
      console.error('Delete failed:', err);
      Alert.alert('Error', 'Something went wrong while deleting your account.');
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

      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View>
        <ThemedText styles="text-3xl font-SemiBold">Delete Account</ThemedText>

        <View className="justify-center items-center">
          <Image source={require('../../../assets/images/delete.webp')} />
        </View>

        {/* Confirmation Text */}
        <ThemedText styles="text-2xl font-SemiBold ">
          You sure want to delete your account?
        </ThemedText>

        {/* Warnings */}
        <View className="mb-8 space-y-3">
          <ThemedText3 styles="font-Medium text-lg">
            If you delete your account:
          </ThemedText3>

          {[
            'Your remaining ticket Points cannot be used anymore.',
            'Your ticket Elite Rewards benefits will not be available anymore.',
            'All your pending rewards will be deleted.',
            'All rewards from using credit card can no longer be obtained.',
          ].map((item, index) => (
            <View key={index} className="flex-row items-start">
              <View className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3" />
              <ThemedText3 styes="text-sm flex-1">{item}</ThemedText3>
            </View>
          ))}
        </View>

        {/* Checkbox */}
        <Pressable
          onPress={handleCheckboxChange}
          className="flex-row items-start mb-8"
        >
          <View className="w-5 h-5 mt-1 border-2 border-gray-300 rounded bg-white justify-center items-center">
            {isChecked && <View className="w-3 h-3 bg-blue-600 rounded" />}
          </View>
          <ThemedText3 styles="ml-3 text-sm ">
            I understand and accept all the above risks regarding my account
            deletion.
          </ThemedText3>
        </Pressable>

        {/* Button */}
        <Pressable
          onPress={handleDelete}
          className={`w-full py-4 rounded-lg items-center ${
            isChecked ? 'bg-blue-500' : 'bg-blue-500 opacity-40'
          }`}
          disabled={!isChecked}
        >
          <ThemedText2 styles=" font-SemiBold ">Yes, continue</ThemedText2>
        </Pressable>
      </View>
    </ThemedView>
  );
};

export default DeleteAccountScreen;
