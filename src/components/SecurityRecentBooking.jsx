import {  ScrollView } from 'react-native';
import React from 'react';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import SingleSecurityBooking from './SingleSecurityBooking';

const SecurityRecentBooking = ({ securityRecentBookings , path, screen }) => {
  return (
    <ScrollView
      contentContainerStyle={{
        gap: responsiveHeight(2),
      }}
      showsVerticalScrollIndicator={false}
    >
      {securityRecentBookings.map(booking => (
        <SingleSecurityBooking key={booking.id} booking={booking} path={path} screen={screen}  />
      ))}
    </ScrollView>
  );
};

export default SecurityRecentBooking;
