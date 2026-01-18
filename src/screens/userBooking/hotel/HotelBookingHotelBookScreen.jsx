/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useFormContext } from 'react-hook-form';
import ThemedView from '@/utils/ThemedView';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import GoBack from '@/components/GoBack';
import { useNavigation } from '@react-navigation/native';
import BookUserDetail from '@/components/BookUserDetail';
import BookHotelDetail from '@/components/BookHotelDetail';
import Button from '@/components/Button';
import HotelBookingDetail from '@/components/HotelBookingDetail';
import { ScrollView, Text, View } from 'react-native';
import useT from '@/utils/useT';
import { useCreateBookingHotelMutation } from '@/redux/slices/userSlice/hotelbookingSlice';
// import { useSelector } from 'react-redux';
import PriceBreakdownComponent from '@/components/PriceBreakdownComponent';

const HotelBookingHotelBookScreen = () => {
  const navigation = useNavigation();

  const {
    getValues,
    formState: { errors },
  } = useFormContext();
  const {
    selectedHotel: item,
    rooms,
    adults,
    children,
    bookedToDate,
    bookedFromDate,
    selectedRoom,
  } = getValues();
  // console.log(
  //   'HotelBookingHotelBookScreen',
  //   // bookedFromDate,
  //   // bookedToDate,
  //   item,
  //   errors,
  //   selectedRoom,
  // );

  const [createBookingHotel] = useCreateBookingHotelMutation();

  const t = useT();

  // const token = useSelector(state => state.auth.token);

  console.log('LINE AT 49', selectedRoom);

  return (
    <ThemedView
      styles="flex-1 justify-between"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(3),
      }}
    >
      <GoBack navigation={navigation} />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          // paddingBottom: responsiveHeight(5),
          // gap: responsiveHeight(3),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            gap: responsiveHeight(3),
          }}
        >
          <BookUserDetail />
          <BookHotelDetail item={item} />
          <HotelBookingDetail
            item={selectedRoom}
            rooms={rooms}
            adults={adults}
            children={children}
            bookedToDate={bookedToDate}
            bookedFromDate={bookedFromDate}
          />
          <PriceBreakdownComponent
            selectedRoom={selectedRoom}
            bookedFromDate={bookedFromDate}
            bookedToDate={bookedToDate}
            rooms={rooms}
            adults={adults}
            children={children}
          />
          {errors && (
            <Text className="text-red-500">{errors?.root?.message}</Text>
          )}
        </View>
      </ScrollView>

      <Button
        title={t('reserve')}
        navigation={navigation}
        path="Payment"
        noicon={true}
        submission={createBookingHotel}
        isCreateBookingHotel={true}
      />
    </ThemedView>
  );
};

export default HotelBookingHotelBookScreen;
