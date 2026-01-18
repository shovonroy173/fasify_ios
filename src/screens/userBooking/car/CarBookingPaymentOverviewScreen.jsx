/* eslint-disable react-native/no-inline-styles */
import { Text, View } from 'react-native';
import React from 'react';
import ThemedView from '@/utils/ThemedView';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import GoBack from '@/components/GoBack';
import { useNavigation } from '@react-navigation/native';
import AgencyAddress from '@/components/AgencyAddress';
import { useFormContext } from 'react-hook-form';
import BookedCar from '@/components/BookedCar';
import ThemedText from '@/utils/ThemedText';
import ThemedText3 from '@/utils/ThemedText3';
import Button from '@/components/Button';
import useT from '@/utils/useT';
import { useCreateBookingCarMutation } from '@/redux/slices/userSlice/carBookingSlice';
import { calculatevatFee } from '@/utils/calculateVatFee';

const CarBookingPaymentOverviewScreen = () => {
  const navigation = useNavigation();
  const {
    getValues,
    // control,
    formState: { errors },
  } = useFormContext();

  const {
    selectedCar: item,
    // selectedAgency: address,
    carBookedFromDate,
    carBookedToDate,
    promo_code,
  } = getValues();
  // console.log(
  //   'LINE AT 29',
  //   carBookedFromDate,
  //   // bookingTime.toLocaleTimeString(),
  //   promo_code,
  // );
  const t = useT();
  const address = {
    agencyName: item?.carBusinessName,
    address: item?.carAddress,
    city: item?.carCity,
    country: item?.carCountry,
    postal: item?.carPostalCode,
  };
  const [createBookingCar] = useCreateBookingCarMutation();

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          gap: responsiveHeight(3),
        }}
      >
        <GoBack navigation={navigation} />
        <AgencyAddress address={address} />
        <BookedCar item={item} />
        
        <ThemedView
          styles=""
          style={{
            gap: responsiveHeight(1),
          }}
        >
          <ThemedText styles="font-SemiBold text-lg mb-2">
            {t('carPayment.scheduleTitle')}
          </ThemedText>
          <View className="flex-row justify-between items-center">
            <ThemedText3 styles="font-Medium">
              {t('carPayment.from')} :{' '}
            </ThemedText3>
            <ThemedText3 styles="font-Medium">{carBookedFromDate}</ThemedText3>
          </View>
          <View className="flex-row justify-between items-center">
            <ThemedText3 styles="font-Medium">
              {t('carPayment.to')} :{' '}
            </ThemedText3>
            <ThemedText3 styles="font-Medium">{carBookedToDate}</ThemedText3>
          </View>
        </ThemedView>

        <ThemedView
          styles=""
          style={{
            gap: responsiveHeight(1),
          }}
        >
          <ThemedText styles="font-SemiBold text-lg mb-2">
            {t('carPayment.chargeTitle')}
          </ThemedText>
          <View className="flex-row justify-between items-center">
            <ThemedText3 styles="font-Medium">
              {item?.carModel}/{t('carPayment.rate')}
            </ThemedText3>
            <ThemedText3 styles="font-Medium">${item?.carPriceDay}</ThemedText3>
          </View>
          <View className="flex-row justify-between items-center">
            <ThemedText3 styles="font-Medium">
              {t('carPayment.vat')} ({5}%)
            </ThemedText3>
            <ThemedText3 styles="font-Medium">
              ${calculatevatFee(item?.carPriceDay).toFixed(2)}
            </ThemedText3>
          </View>
          <View className="flex-row justify-between items-center">
            <ThemedText3 styles="font-Medium">
              {t('carPayment.promo')}
            </ThemedText3>
            <ThemedText3 styles="font-Medium">{promo_code}</ThemedText3>
          </View>
        </ThemedView>
      </View>
      <Text className="text-red-500 font-Regular ">
        {errors?.root?.message}
      </Text>
      <Button
        title={t('carPayment.continue')}
        navigation={navigation}
        path="Payment"
        // ids={['bookingDate', 'bookingTime', 'promo_code']}
        noicon={true}
        submission={createBookingCar}
        isCreateBookingCar={true}
      />
    </ThemedView>
  );
};

export default CarBookingPaymentOverviewScreen;
