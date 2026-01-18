import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserBookingScreen from '@/screens/home/userHome/UserBookingScreen';
import UserCancelHotelBookingScreen from '@/screens/home/userHome/UserCancelHotelBookingScreen';
import UserCancelCarBookingScreen from '@/screens/home/userHome/UserCancelCarBookingScreen';
import UserCancelSecurityBookingScreen from '@/screens/home/userHome/UserCancelSecurityBookingScreen';
import UserCancelAttractionBookingScreen from '@/screens/home/userHome/UserCancelAttractionBookingScreen';

const Stack = createNativeStackNavigator();

const UserCancelStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BookingMain" component={UserBookingScreen} />
      <Stack.Screen
        name="CancelHotelBooking"
        component={UserCancelHotelBookingScreen}
      />
      <Stack.Screen
        name="CancelCarBooking"
        component={UserCancelCarBookingScreen}
      />
      <Stack.Screen
        name="CancelSecurityBooking"
        component={UserCancelSecurityBookingScreen}
      />
      <Stack.Screen
        name="CancelAttractionBooking"
        component={UserCancelAttractionBookingScreen}
      />
    </Stack.Navigator>
  );
};

export default UserCancelStack;
