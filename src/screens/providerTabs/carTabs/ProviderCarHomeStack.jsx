import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProviderCarDashboardScreen from '@/screens/home/buisnessHome/dashboard/carDashboard/ProviderCarDashboardScreen';
import ProviderEditCarListingScreen from '@/screens/home/buisnessHome/dashboard/carDashboard/ProviderEditCarListingScreen';
import ProviderEditCarBusinessScreen from '@/screens/home/buisnessHome/dashboard/carDashboard/ProviderEditCarBusinessScreen';
import ProviderAllCarListingScreen from '@/screens/home/buisnessHome/dashboard/carDashboard/ProviderAllCarListingScreen';
import ProviderAddCarListingScreen from '@/screens/home/buisnessHome/dashboard/carDashboard/ProviderAddCarListingScreen';

const Stack = createNativeStackNavigator();

const ProviderCarHomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProviderCarDashboard"
        component={ProviderCarDashboardScreen}
      />
      <Stack.Screen
        name="ProviderEditCarListing"
        component={ProviderEditCarListingScreen}
      />
      <Stack.Screen
        name="ProviderEditCarBusiness"
        component={ProviderEditCarBusinessScreen}
      />
      <Stack.Screen
        name="ProviderAllCarListing"
        component={ProviderAllCarListingScreen}
      />
      <Stack.Screen
        name="ProviderAddCarListing"
        component={ProviderAddCarListingScreen}
      />
    </Stack.Navigator>
  );
};

export default ProviderCarHomeStack;
