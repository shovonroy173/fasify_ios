import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProviderAttractionListingScreen from '@/screens/home/buisnessHome/activeListing/attractionActiveListing/ProviderAttractionListingScreen';
import ProviderCreateAttactionBusinessScreen from '@/screens/home/buisnessHome/activeListing/attractionActiveListing/ProviderCreateAttactionBusinessScreen';
import ProviderAttractionDashboardAllListingScreen from '@/screens/home/buisnessHome/dashboard/attractionDashboard/ProviderAttractionDashboardAllListingScreen';
import ProviderAttractionEditListingScreen from '@/screens/home/buisnessHome/dashboard/attractionDashboard/ProviderAttractionEditListingScreen';


const Stack = createNativeStackNavigator();

const ProviderAttractionActiveListingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProviderListingMain"
        component={ProviderAttractionListingScreen}
      />
      <Stack.Screen
        name="ProviderCreateAttactionBusiness"
        component={ProviderCreateAttactionBusinessScreen}
      />
      <Stack.Screen
        name="ProviderAttractionEditListing"
        component={ProviderAttractionEditListingScreen}
      />
      <Stack.Screen
        name="ProviderAttractionDashboardAllListing"
        component={ProviderAttractionDashboardAllListingScreen}
      />
    </Stack.Navigator>
  );
};

export default ProviderAttractionActiveListingStack;
