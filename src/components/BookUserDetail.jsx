/* eslint-disable react-native/no-inline-styles */
import { View,  Image, useColorScheme } from 'react-native';
import React from 'react';
import ThemedView from '../utils/ThemedView';
import ThemedText from '../utils/ThemedText';
import ThemedTextColor from '../utils/ThemedTextColor';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import {
  useGetFinanceUserQuery,
  useGetProviderProfileQuery,
} from '../redux/slices/authSlice';

const BookUserDetail = () => {
  const theme = useColorScheme();
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
  } = useGetProviderProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  // console.log('LINE AT 22', profileData?.data?.id);

  const {
    data: userFinance,
    isLoading: userLoading,
    isError: userError,
  } = useGetFinanceUserQuery(profileData?.data?.id, {
    refetchOnMountOrArgChange: true,
  });

  // console.log('LINE AT 35', userFinance?.data);
  

  return (
    <ThemedView
      styles={`flex-row items-start justify-between border ${
        theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'
      }  p-3 rounded-xl`}
    >
      <ThemedView styles="flex-row items-start gap-2">
        <Image
          source={{ uri: profileData?.data?.profileImage }}
          style={{
            width: responsiveWidth(13),
            height: responsiveWidth(13),
            objectFit: 'cover',
            borderRadius: 10,
          }}
        />
        <ThemedView>
          <ThemedText styles="font-SemiBold text-lg">
            {profileData?.data?.fullName || profileData?.data?.email}
          </ThemedText>

          <ThemedText styles="font-Medium">
            {profileData?.data?.email}
          </ThemedText>
          <View className="flex-row justify-center items-center gap-2 p-2 rounded-md bg-blue-100 my-2">
            <Image source={require('../../assets/images/badge.webp')} />
            <ThemedTextColor styles="opacity-60">
              {userFinance?.data?.totalUserExpense >= 20000
                ? 'Superstar Member'
                : 'Member'}
            </ThemedTextColor>
          </View>
        </ThemedView>
      </ThemedView>

      {/* <Entypo name="dots-three-horizontal" size={14} color={icon2} /> */}
    </ThemedView>
  );
};

export default BookUserDetail;
