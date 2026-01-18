import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProviderHotelDashboardScreen from '@/screens/home/buisnessHome/dashboard/hotelDashboard/ProviderHotelDashboardScreen';
import ProviderEditHotelListingScreen from '@/screens/home/buisnessHome/dashboard/hotelDashboard/ProviderEditHotelListingScreen';
import ProviderHotelDashboardAllRoomScreen from '@/screens/home/buisnessHome/dashboard/hotelDashboard/ProviderHotelDashboardAllRoomScreen';
import ProviderEditHotelRoomListingScreen from '@/screens/home/buisnessHome/dashboard/hotelDashboard/ProviderEditHotelRoomListingScreen';
import ProviderAddHotelRoomListingScreen from '@/screens/home/buisnessHome/dashboard/hotelDashboard/ProviderAddHotelRoomListingScreen';

const Stack = createNativeStackNavigator();

const ProviderHotelHomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProviderHotelDashboard"
        component={ProviderHotelDashboardScreen}
      />
      <Stack.Screen
        name="ProviderEditHotelListing"
        component={ProviderEditHotelListingScreen}
      />
      <Stack.Screen
        name="ProviderHotelDashboardAllRoom"
        component={ProviderHotelDashboardAllRoomScreen}
      />
      <Stack.Screen
        name="ProviderEditHotelRoomListing"
        component={ProviderEditHotelRoomListingScreen}
      />
      <Stack.Screen
        name="ProviderAddHotelRoomListing"
        component={ProviderAddHotelRoomListingScreen}
      />
    </Stack.Navigator>
  );
};

export default ProviderHotelHomeStack;
