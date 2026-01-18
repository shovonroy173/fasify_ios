import { View, useColorScheme } from 'react-native';
import React from 'react';
import ThemedView from '../utils/ThemedView';
import ThemedText from '../utils/ThemedText';
// import ThemedTextColor from '../utils/ThemedTextColor';
// import { responsiveWidth } from 'react-native-responsive-dimensions';
// import { useThemeColor } from '../utils/useThemeColor';
// import ThemedText2 from '../utils/ThemeText2';
// import Feather from 'react-native-vector-icons/Feather';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import RatingStar from '../utils/RatingStar';
import ThemedText3 from '../utils/ThemedText3';
import ProgressDots from './PregressDots';
import useT from '../utils/useT';

const HotelBookingDetail = ({
  item,
  itemData,
  rooms,
  adults,
  children,
  bookedFromDate,
  bookedToDate,
}) => {
  // const { icon, icon2 } = useThemeColor();
  const theme = useColorScheme();
  const t = useT();
  console.log('LINE AT 28', itemData, item);

  return (
    <ThemedView
      styles={` justify-between border ${
        theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'
      }  p-4 rounded-xl`}
    >
      <ThemedView styles="flex-row justify-between">
        <View className="gap-3">
          <View className="gap-3">
            <View className="gap-1">
              <ThemedText3 className="font-Regular">
                {t('hotelBooking.checkIn')}
              </ThemedText3>
              <ThemedText className="font-Medium">
                {item?.bookedFromDate || bookedFromDate}
              </ThemedText>
            </View>
            <View className="gap-1">
              <ThemedText3 className="font-Regular">
                {t('hotelBooking.checkOut')}
              </ThemedText3>
              <ThemedText className="font-Medium">
                {item?.bookedToDate || bookedToDate}
              </ThemedText>
            </View>
            <View className="gap-1">
              <ThemedText3 className="font-Regular">
                {t('hotelBooking.rooms')}
              </ThemedText3>
              <ThemedText className="font-Medium">
                {item?.rooms || rooms}
              </ThemedText>
            </View>
          </View>
        </View>

        <ProgressDots totalSteps={3} />
        <View className="gap-3">
          <View className="gap-1">
            <ThemedText3 className="font-Regular">
              {t('hotelBooking.roomType')}
            </ThemedText3>
            <ThemedText className="font-Medium">
              {itemData?.room?.hotelRoomType || item?.hotelRoomType}
            </ThemedText>
          </View>
          <View className="gap-1">
            <ThemedText3 className="font-Regular">
              {t('hotelBooking.capacity')}
            </ThemedText3>
            <ThemedText className="font-Medium">
              {itemData?.room?.hotelRoomCapacity || item?.hotelRoomCapacity}
            </ThemedText>
          </View>
          <View className="gap-1">
            <ThemedText3 className="font-Regular">
              {t('hotelBooking.adults')}
            </ThemedText3>
            <ThemedText className="font-Medium">
              {item?.adults || adults}
            </ThemedText>
          </View>
          <View className="gap-1">
            <ThemedText3 className="font-Regular">
              {t('hotelBooking.children')}
            </ThemedText3>
            <ThemedText className="font-Medium">
              {item?.children || children}
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </ThemedView>
  );
};

export default HotelBookingDetail;
