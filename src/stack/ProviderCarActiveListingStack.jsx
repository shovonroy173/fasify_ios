import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProviderCarListingScreen from '@/screens/home/buisnessHome/activeListing/carActiveListing/ProviderCarListingScreen';
import ProviderCreateCarListingScreen from '@/screens/home/buisnessHome/activeListing/carActiveListing/ProviderCreateCarListingScreen';
import ProviderEditCarBusinessScreen from '@/screens/home/buisnessHome/dashboard/carDashboard/ProviderEditCarBusinessScreen';
import ProviderAllCarListingScreen from '@/screens/home/buisnessHome/dashboard/carDashboard/ProviderAllCarListingScreen';

const Stack = createNativeStackNavigator();

const ProviderCarActiveListingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProviderListingMain"
        component={ProviderCarListingScreen}
      />
      <Stack.Screen
        name="ProviderCreateCarListing"
        component={ProviderCreateCarListingScreen}
      />
      <Stack.Screen
        name="ProviderEditCarBusiness"
        component={ProviderEditCarBusinessScreen}
      />
      <Stack.Screen
        name="ProviderAllCarListing"
        component={ProviderAllCarListingScreen}
      />
    </Stack.Navigator>
  );
};

export default ProviderCarActiveListingStack;
