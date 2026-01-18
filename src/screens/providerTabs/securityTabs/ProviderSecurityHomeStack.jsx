import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProviderSecurityDashboardScreen from '@/screens/home/buisnessHome/dashboard/securityDashboard/ProviderSecurityDashboardScreen';
import ProviderEditSecurityBusinessScreen from '@/screens/home/buisnessHome/dashboard/securityDashboard/ProviderEditSecurityBusinessScreen';
import ProviderAllSecurityListingScreen from '@/screens/home/buisnessHome/dashboard/securityDashboard/ProviderAllSecurityListingScreen';
import ProviderEditSecurityListingScreen from '@/screens/home/buisnessHome/dashboard/securityDashboard/ProviderEditSecurityListingScreen';
import ProviderAddSecurityListingScreen from '@/screens/home/buisnessHome/dashboard/securityDashboard/ProviderAddSecurityListingScreen';

const Stack = createNativeStackNavigator();

const ProviderSecurityHomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProviderSecurityDashboard"
        component={ProviderSecurityDashboardScreen}
      />
      <Stack.Screen
        name="ProviderEditSecurityBusiness"
        component={ProviderEditSecurityBusinessScreen}
      />

      <Stack.Screen
        name="ProviderAllSecurityListing"
        component={ProviderAllSecurityListingScreen}
      />

      <Stack.Screen
        name="ProviderEditSecurityListing"
        component={ProviderEditSecurityListingScreen}
      />

      <Stack.Screen
        name="ProviderAddSecurityListing"
        component={ProviderAddSecurityListingScreen}
      />
    </Stack.Navigator>
  );
};

export default ProviderSecurityHomeStack;
