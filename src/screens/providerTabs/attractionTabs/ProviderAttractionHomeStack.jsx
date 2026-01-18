import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProviderAttractionDashboardScreen from '@/screens/home/buisnessHome/dashboard/attractionDashboard/ProviderAttractionDashboardScreen';
import ProviderAttractionAddListingScreen from '@/screens/home/buisnessHome/dashboard/attractionDashboard/ProviderAttractionAddListingScreen';
import ProviderAttractionDashboardAllListingScreen from '@/screens/home/buisnessHome/dashboard/attractionDashboard/ProviderAttractionDashboardAllListingScreen';
import ProviderAttractionEditBusinessScreen from '@/screens/home/buisnessHome/dashboard/attractionDashboard/ProviderAttractionEditBusinessScreen';
import ProviderAttractionEditListingScreen from '@/screens/home/buisnessHome/dashboard/attractionDashboard/ProviderAttractionEditListingScreen';

const Stack = createNativeStackNavigator();

const ProviderAttractionHomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProviderAttractionDashboard"
        component={ProviderAttractionDashboardScreen}
      />
      <Stack.Screen
        name="ProviderAttractionAddListing"
        component={ProviderAttractionAddListingScreen}
      />
      <Stack.Screen
        name="ProviderAttractionDashboardAllListing"
        component={ProviderAttractionDashboardAllListingScreen}
      />
      <Stack.Screen
        name="ProviderAttractionEditBusiness"
        component={ProviderAttractionEditBusinessScreen}
      />
      <Stack.Screen
        name="ProviderAttractionEditListing"
        component={ProviderAttractionEditListingScreen}
      />
    </Stack.Navigator>
  );
};

export default ProviderAttractionHomeStack;
