import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  // TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useFormContext } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import ThemedView from '@/utils/ThemedView';
import ThemedTextInput from '@/utils/ThemedTextInput';
import Button from '@/components/Button';

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AgencyAddress from '@/components/AgencyAddress';
import BookedCar from '@/components/BookedCar';
import GoBackTitle2 from '@/components/GoBackTitle2';
import DateRangeSelectorWithModal from '@/components/DateRangeSelectorWithModal';
import useT from '@/utils/useT';
import ThemedText from '@/utils/ThemedText';
import ThemedText3 from '@/utils/ThemedText3';
import { calculatevatFee } from '@/utils/calculateVatFee';
import { useCreateBookingCarMutation } from '@/redux/slices/userSlice/carBookingSlice';
import { Text } from 'react-native';

const CarBookingCredentialScreen = () => {
  const navigation = useNavigation();

  const {
    getValues,
    control,
    formState: { errors },
  } = useFormContext();

  const { selectedCar: item, } = getValues();

  const [createBookingCar] = useCreateBookingCarMutation();

  // console.log('LINE AT 46', address);
  // const address = { agencyName: 'Luxury Motion', location: 'Miami, FL' };
  const t = useT();
  const address = {
    // agencyName: item?.carBusinessName,
    address: item?.carAddress,
    city: item?.carCity,
    country: item?.carCountry,
    postal: item?.carPostalCode,
  };

  console.log('LINE AT 62', errors);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <ThemedView
          styles="flex-1"
          style={{
            paddingHorizontal: responsiveWidth(6),
            paddingVertical: responsiveHeight(5),
            gap: responsiveHeight(5),
          }}
        >
          {/* <GoBack navigation={navigation} /> */}
          <GoBackTitle2 navigation={navigation} title={t('carBooking.title')} />

          <ScrollView
          className='flex-1'
            contentContainerStyle={{ gap: responsiveHeight(4) }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <AgencyAddress address={address} />
            <BookedCar item={item} />
            <View
              className="flex-row items-center justify-center  w-full"
              style={{
                gap: responsiveWidth(5),
              }}
            >
              <DateRangeSelectorWithModal
                fromName="carBookedFromDate"
                toName="carBookedToDate"
              />
            </View>
            <ThemedTextInput
              name="promo_code"
              control={control}
              error={errors?.promo_code?.message}
              label={t('carBooking.promoLabel')}
              placeholder={t('carBooking.promoPlaceholder')}
              type="text"
            />
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
                <ThemedText3 styles="font-Medium">
                  {item?.displayCurrency} {item?.convertedPrice}
                </ThemedText3>
              </View>
              <View className="flex-row justify-between items-center">
                <ThemedText3 styles="font-Medium">
                  {t('carPayment.vat')} ({5}%)
                </ThemedText3>
                <ThemedText3 styles="font-Medium">
                  {item?.displayCurrency} {calculatevatFee(item?.convertedPrice).toFixed(2)}
                </ThemedText3>
              </View>
              {/* <View className="flex-row justify-between items-center">
            <ThemedText3 styles="font-Medium">
              {t('carPayment.promo')}
            </ThemedText3>
            <ThemedText3 styles="font-Medium">{promo_code}</ThemedText3>
          </View> */}
            </ThemedView>
            
            <Text className="text-red-500 font-Regular">
              {errors?.root?.message}
            </Text>
          </ScrollView>
          <Button
            title={t('carDetail.reserve')}
            navigation={navigation}
            path="Payment"
            ids={['carBookedFromDate', 'carBookedToDate']}
            noicon={true}
            submission={createBookingCar}
            isCreateBookingCar={true}
          />
        </ThemedView>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
};

export default CarBookingCredentialScreen;
