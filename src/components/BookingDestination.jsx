/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedText2 from '../utils/ThemeText2';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';
import { useThemeColor } from '../utils/useThemeColor';
import { Controller, useFormContext } from 'react-hook-form';
import useT from '../utils/useT';
import { useGetSingleHotelQuery } from '../redux/slices/userSlice/hotelbookingSlice';
import { Star } from 'lucide-react-native';
// import ThemedText from '../utils/ThemedText';

const BookingDestination = ({ item, name, screen, navigation, path }) => {
  const { icon } = useThemeColor();
  const { control } = useFormContext();
  const t = useT();

  const {
    data: singleHotelsData,
    isLoading: singleHotelsLoading,
    isError: singleHotelsError,
  } = useGetSingleHotelQuery({ id: item?.hotelId });

  console.log('LINE AT 141', item, singleHotelsData);

  if (singleHotelsLoading) {
    return (
      <View
        style={{
          width: responsiveWidth(88),
          height: responsiveHeight(30),
          borderRadius: 10,
          backgroundColor: '#e5e7eb', // gray placeholder
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#FE8814" />
        <Text style={{ marginTop: 10, color: '#6b7280' }}>
          Loading hotel...
        </Text>
      </View>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <Pressable
          onPress={() => {
            onChange(item);
            navigation.navigate(path, { screen: screen, params: item });
          }}
          className="relative"
          style={{
            overflow: 'hidden',
            borderRadius: 10,
            width: responsiveWidth(88),
            height: responsiveHeight(30),
          }}
        >
          {/* Cancel Button */}
          <Pressable
            onPress={() => {
              onChange(item);
              navigation.navigate(path, {
                screen: screen,
                params: { item: item },
              });
            }}
            className="rounded-full absolute top-3 left-3 z-20 bg-red-500"
            style={{
              paddingHorizontal: responsiveWidth(7),
              paddingVertical: responsiveHeight(1),
            }}
          >
            <ThemedText2 styles="font-Medium text-sm">
              {t('cancel')}
            </ThemedText2>
          </Pressable>

          {/* Background Image */}
          <ImageBackground
            source={{ uri: item?.room?.hotelRoomImages?.[0] }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          >
            {/* <View
            style={{ width: '100%', height: '100%', backgroundColor: '#ccc' }}
          > */}
            {/* Footer Info */}
            <View
              className="absolute bottom-2 left-3 flex-row items-center justify-between"
              style={{ width: responsiveWidth(82) }}
            >
              <View className="w-1/2">
                <ThemedText2 styles="font-Bold text-lg">
                  {singleHotelsData?.data?.hotelBusinessName || item?.hotel?.hotelBusinessName}
                </ThemedText2>
                <View className="flex-row items-center">
                  {/* <EvilIcons name="location" size={20} color={icon} /> */}
                  <Text className="text-zinc-200 ">
                    {item?.hotel?.hotelAddress}
                    {singleHotelsData?.data?.hotelCity},{' '}
                    {singleHotelsData?.data?.hotelCountry}
                  </Text>
                </View>
              </View>

              <View className="items-end">
                <View className="flex-row items-center gap-1">
                  {/* <FontAwesome name="star" size={18} color="#FE8814" /> */}
                  <Star size={18} color="#FE8814" />
                  <ThemedText2 styles="font-Medium">
                    {singleHotelsData?.data?.averageRating ||
                      item?.room?.hotelRating}
                  </ThemedText2>
                </View>
                <View className="flex-row items-center">
                  <ThemedText2 styles="font-Medium text-lg">
                    {item?.displayCurrency} {item?.payment[0]?.amount}
                    <ThemedText2 styles="font-Regular text-sm">
                      /night
                    </ThemedText2>
                  </ThemedText2>
                </View>
              </View>
            </View>
          </ImageBackground>
          {/* </View> */}
        </Pressable>
      )}
    />
  );
};

export default BookingDestination;
