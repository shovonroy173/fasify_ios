// ProviderListingStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProviderListingScreen from '../screens/home/buisnessHome/ProviderListingScreen';
import ProviderCreateHotelListingScreen from '../screens/home/buisnessHome/ProviderCreateHotelListingScreen';

const Stack = createNativeStackNavigator();

const ProviderListingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProviderListingMain" component={ProviderListingScreen} />
      <Stack.Screen name="ProviderCreateHotelListing" component={ProviderCreateHotelListingScreen} />
    </Stack.Navigator>
  );
};

export default ProviderListingStack;
