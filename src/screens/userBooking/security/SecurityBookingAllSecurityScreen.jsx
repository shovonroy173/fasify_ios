import React from 'react';
import ThemedView from '@/utils/ThemedView';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import SecurityRecentBooking from '@/components/SecurityRecentBooking';
import GoBackTitle2 from '@/components/GoBackTitle2';

const SecurityBookingAllSecurityScreen = ({ route }) => {
  const navigation = useNavigation();
  const { category } = route.params;
  // console.log('SECURITY CATEGORIES', category);


  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(5),
      }}
    >
      <GoBackTitle2 navigation={navigation} title={category?.title} />

      <SecurityRecentBooking securityRecentBookings={category?.items} path="UserSingleSecurity" />
    </ThemedView>
  );
};

export default SecurityBookingAllSecurityScreen;
