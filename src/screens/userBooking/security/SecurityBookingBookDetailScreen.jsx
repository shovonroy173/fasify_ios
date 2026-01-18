import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import { useThemeColor } from '@/utils/useThemeColor';
import useT from '@/utils/useT';
import ThemedView from '@/utils/ThemedView';
import { ScrollView, Text, View } from 'react-native';
import GoBack from '@/components/GoBack';
import BookUserDetail from '@/components/BookUserDetail';
import Button from '@/components/Button';
import ThemedText3 from '@/utils/ThemedText3';
import ThemedText from '@/utils/ThemedText';
import { useCreateBookingSecurityMutation } from '@/redux/slices/userSlice/securityBookingSlice';
import { calculatevatFee } from '@/utils/calculateVatFee';

const SecurityBookingBookDetailScreen = () => {
  const navigation = useNavigation();
  // const { icon2 } = useThemeColor();

  const {
    getValues,
    formState: { errors },
  } = useFormContext();
  const {
    securityBookedFromDate,
    securityBookedToDate,
    selectedSecurity: item,
  } = getValues();
  console.log('LINE AT 33', item);
  const [createBookingSecurity] = useCreateBookingSecurityMutation();
  const t = useT();
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
          gap: responsiveHeight(3),
        }}
      >
        <BookUserDetail />

        <ThemedView
          styles=""
          style={{
            gap: responsiveHeight(1),
          }}
        >
          <ThemedText styles="font-SemiBold text-lg mb-2">
            Security Details
          </ThemedText>

          {/* Security Guard Name */}
          <View className="flex-row justify-between items-center">
            <ThemedText3 styles="font-Medium">Guard Name:</ThemedText3>
            <ThemedText3 styles="font-Medium">
              {item?.securityGuardName}
            </ThemedText3>
          </View>

          {/* Security Type */}

          {/* Category */}
          <View className="flex-row justify-between items-center">
            <ThemedText3 styles="font-Medium">Category:</ThemedText3>
            <ThemedText3 styles="font-Medium">{item?.category}</ThemedText3>
          </View>

          {/* Address */}
          <View className="flex-row justify-between items-start">
            <ThemedText3 styles="font-Medium">Address:</ThemedText3>
            <ThemedText3
              styles="font-Medium text-right"
              style={{ flex: 1, marginLeft: 10 }}
            >
              {item?.securityAddress}, {item?.securityCity},{' '}
              {item?.securityDistrict}, {item?.securityCountry}
            </ThemedText3>
          </View>

          {/* Availability */}
        </ThemedView>

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
              {t('carPayment.from')} :
            </ThemedText3>
            <ThemedText3 styles="font-Medium">
              {securityBookedFromDate}
            </ThemedText3>
          </View>
          <View className="flex-row justify-between items-center">
            <ThemedText3 styles="font-Medium">
              {t('carPayment.to')} :{' '}
            </ThemedText3>
            <ThemedText3 styles="font-Medium">
              {securityBookedToDate}
            </ThemedText3>
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
              Guard/{t('carPayment.rate')}
            </ThemedText3>
            <ThemedText3 styles="font-Medium">
              ${item?.securityPriceDay}
            </ThemedText3>
          </View>
          <View className="flex-row justify-between items-center">
            <ThemedText3 styles="font-Medium">
              {t('carPayment.vat')} (5%)
            </ThemedText3>
            <ThemedText3 styles="font-Medium">
              ${calculatevatFee(item?.securityPriceDay)}
            </ThemedText3>
          </View>
        </ThemedView>
        {errors && (
          <Text className="text-red-500">{errors?.root?.message}</Text>
        )}
      </ScrollView>

      <Button
        title={t('carPayment.continue')}
        navigation={navigation}
        // path="Payment"
        noicon={true}
        // submission={createBookingSecurity}
        // isCreateBookingSecurity={true}
      />
    </ThemedView>
  );
};

export default SecurityBookingBookDetailScreen;
