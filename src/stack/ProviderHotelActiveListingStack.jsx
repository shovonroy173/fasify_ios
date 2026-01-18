import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProviderListingScreen from '@/screens/home/buisnessHome/activeListing/hotelActiveListing/ProviderListingScreen';
import ProviderCreateHotelListingScreen from '@/screens/home/buisnessHome/activeListing/hotelActiveListing/ProviderCreateHotelListingScreen';
import ProviderEditHotelListingScreen from '@/screens/home/buisnessHome/dashboard/hotelDashboard/ProviderEditHotelListingScreen';
import ProviderHotelDashboardAllRoomScreen from '@/screens/home/buisnessHome/dashboard/hotelDashboard/ProviderHotelDashboardAllRoomScreen';

const Stack = createNativeStackNavigator();

const ProviderHotelActiveListingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProviderListingMain" component={ProviderListingScreen} />
      <Stack.Screen name="ProviderCreateHotelListing" component={ProviderCreateHotelListingScreen} />
      <Stack.Screen name="ProviderEditHotelListing" component={ProviderEditHotelListingScreen} />
      <Stack.Screen
        name="ProviderHotelDashboardAllRoom"
        component={ProviderHotelDashboardAllRoomScreen}
      />
    </Stack.Navigator>
  );
};

export default ProviderHotelActiveListingStack;
