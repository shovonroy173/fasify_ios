// export default AttractionBookingBookDetailScreen;

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import useT from '@/utils/useT';
import ThemedView from '@/utils/ThemedView';
import { ScrollView, Text, View } from 'react-native';
import GoBack from '@/components/GoBack';
import BookUserDetail from '@/components/BookUserDetail';
import ThemedText from '@/utils/ThemedText';
import ThemedText3 from '@/utils/ThemedText3';
import Button from '@/components/Button';
// import { useThemeColor } from '@/utils/useThemeColor';
import { useCreateBookingAttractionMutation } from '@/redux/slices/userSlice/attractionSlice';
import moment from 'moment';
import { calculatevatFee } from '@/utils/calculateVatFee';

const AttractionBookingBookDetailScreen = () => {
  const navigation = useNavigation();
  // const { icon2 } = useThemeColor();
  // const theme = useColorScheme();

  const {
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const { selectedAttraction } = getValues();
  const attractionDate = watch('attractionDate');
  const attractionTime = watch('attractionTime');
  const attractionAdults = watch('attractionAdults') || 0;
  const attractionChildren = watch('attractionChildren') || 0;

  // Get the selected time slot details
  const selectedTimeSlot = getSelectedTimeSlot(
    selectedAttraction,
    attractionTime,
  );

  const [createBookingAttraction] = useCreateBookingAttractionMutation();
  const t = useT();

  // Function to get the selected time slot details
  function getSelectedTimeSlot(attraction, timeSlotId) {
    if (!attraction || !timeSlotId) return null;

    for (const schedule of attraction.attractionSchedule) {
      const foundSlot = schedule.slots.find(slot => slot.id === timeSlotId);
      if (foundSlot) {
        return {
          from: formatTimeDisplay(foundSlot.from),
          to: formatTimeDisplay(foundSlot.to),
          displayTime: `${formatTimeDisplay(
            foundSlot.from,
          )} - ${formatTimeDisplay(foundSlot.to)}`,
        };
      }
    }
    return null;
  }

  // Format time display (e.g., "09:00 AM")
  function formatTimeDisplay(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    const hourInt = parseInt(hours, 10);
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const displayHour = hourInt % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  }

  // Format date for display
  function formatDateDisplay(dateString) {
    if (!dateString) return '';
    return moment(dateString).format('MMM D, YYYY');
  }

  // Format day for display
  function formatDayDisplay(dateString) {
    if (!dateString) return '';
    return moment(dateString).format('dddd');
  }

  // Calculate total cost
  const adultPrice = selectedAttraction?.convertedAdultPrice || 0;
  const childPrice = selectedAttraction?.convertedChildPrice || 0;
  const totalCost =
    attractionAdults * adultPrice + attractionChildren * childPrice;
  const discount = selectedAttraction?.discount || 0;
  const discountAmount = (totalCost * discount) / 100;
  // const discountTotal = totalCost + discountAmount;

  return (
    <ThemedView
      styles="flex-1 justify-between"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(3),
      }}
    >
      {/* <View
        style={{
          gap: responsiveHeight(3),
        }}
      > */}
      <GoBack navigation={navigation} />
      <ScrollView>
        <BookUserDetail />

        {/* Schedule Details */}
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
              {/* {t('carPayment.date')} : */}
              Date
            </ThemedText3>
            <ThemedText3 styles="font-Medium">
              {formatDayDisplay(attractionDate)},{' '}
              {formatDateDisplay(attractionDate)}
            </ThemedText3>
          </View>
          <View className="flex-row justify-between items-center">
            <ThemedText3 styles="font-Medium">
              {/* {t('carPayment.time')} : */}
              Time
            </ThemedText3>
            <ThemedText3 styles="font-Medium">
              {selectedTimeSlot?.displayTime || attractionTime}
            </ThemedText3>
          </View>
        </ThemedView>

        {/* Pricing Details */}
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
              {t('attractionBooking.adults')} ({attractionAdults} x
              {adultPrice})
            </ThemedText3>
            <ThemedText3 styles="font-Medium">
              {(attractionAdults * adultPrice).toFixed(2)}
            </ThemedText3>
          </View>
          <View className="flex-row justify-between items-center">
            <ThemedText3 styles="font-Medium">
              {t('attractionBooking.children')} ({attractionChildren} x 
              {childPrice})
            </ThemedText3>
            <ThemedText3 styles="font-Medium">
              {(attractionChildren * childPrice).toFixed(2)}
            </ThemedText3>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-red-500 font-Medium">
              {/* {t('carPayment.subtotal')} */}
              Discount
            </Text>
            <Text className="text-red-500 font-Medium">
              {discountAmount.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <ThemedText3 styles="font-Medium">
              {t('carPayment.vat')} ({5}%)
            </ThemedText3>
            <ThemedText3 styles="font-Medium">
              {calculatevatFee(totalCost).toFixed(2)}
            </ThemedText3>
          </View>
          {/* <View className="flex-row justify-between items-center border-t border-gray-300 pt-2">
            <ThemedText3 styles="font-SemiBold text-base">
              {t('attractionBooking.totalCost')}
            </ThemedText3>
            <ThemedText3 styles="font-SemiBold text-base">
              ${grandTotal.toFixed(2)}
            </ThemedText3>
          </View> */}
        </ThemedView>

        {/* Guest Count Summary */}
        <ThemedView styles="gap-2">
          {/* <ThemedText styles="font-SemiBold text-lg mb-2">
            {t('attractionBooking.guestSummary')}
          </ThemedText> */}
          <View className="gap-1 flex-row justify-between">
            <ThemedText3 className="font-Regular">
              {t('hotelBooking.adults')}
            </ThemedText3>
            <ThemedText3 className="font-Medium">
              {attractionAdults}
            </ThemedText3>
          </View>
          <View className="gap-1 flex-row justify-between">
            <ThemedText3 className="font-Regular">
              {t('hotelBooking.children')}
            </ThemedText3>
            <ThemedText3 className="font-Medium">
              {attractionChildren}
            </ThemedText3>
          </View>
        </ThemedView>
        {/* </View> */}
        {errors && (
          <Text className="text-red-500">{errors?.root?.message}</Text>
        )}
      </ScrollView>

      <Button
        title={`${t('carPayment.continue')}`}
        navigation={navigation}
        path="Payment"
        noicon={true}
        submission={createBookingAttraction}
        isCreateBookingAttraction={true}
      />
    </ThemedView>
  );
};

export default AttractionBookingBookDetailScreen;
