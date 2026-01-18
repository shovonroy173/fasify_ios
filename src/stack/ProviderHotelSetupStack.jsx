import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProviderHotelBusinessDetailScreen from '@/screens/providerSetup/hotelProvider/ProviderHotelBusinessDetailScreen';
import ProviderHotelBusinessLogoScreen from '@/screens/providerSetup/hotelProvider/ProviderHotelBusinessLogoScreen';
import ProviderHotelBusinessListingScreen from '@/screens/providerSetup/hotelProvider/ProviderHotelBusinessListingScreen';
import ProviderHotelBusinessReviewScreen from '@/screens/providerSetup/hotelProvider/ProviderHotelBusinessReviewScreen';
import ProviderHotelRoomReviewScreen from '@/screens/providerSetup/hotelProvider/ProviderHotelRoomReviewScreen';

const ProviderHotelSetupStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='ProviderHotelBuisnessDetail'>
      <Stack.Screen name="ProviderHotelBuisnessDetail" component={ProviderHotelBusinessDetailScreen} />
      <Stack.Screen name="ProviderHotelBusinessLogo" component={ProviderHotelBusinessLogoScreen} />
      <Stack.Screen name="ProviderHotelBusinessListing" component={ProviderHotelBusinessListingScreen} />
      <Stack.Screen name="ProviderHotelBusinessReview" component={ProviderHotelBusinessReviewScreen} />
      <Stack.Screen name="ProviderHotelRoomReview" component={ProviderHotelRoomReviewScreen} />


    </Stack.Navigator>
  );
};

export default ProviderHotelSetupStack;
