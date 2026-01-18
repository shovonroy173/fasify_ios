import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProviderSecurityListingScreen from '@/screens/home/buisnessHome/activeListing/securityActiveListing/ProviderSecurityListingScreen';
import ProviderCreateSecurityListingScreen from '@/screens/home/buisnessHome/activeListing/securityActiveListing/ProvideCreateSecurityListingScreen';
import ProviderEditSecurityBusinessScreen from '@/screens/home/buisnessHome/dashboard/securityDashboard/ProviderEditSecurityBusinessScreen';
import ProviderAllSecurityListingScreen from '@/screens/home/buisnessHome/dashboard/securityDashboard/ProviderAllSecurityListingScreen';

const Stack = createNativeStackNavigator();

const ProviderSecurityActiveListingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProviderListingMain"
        component={ProviderSecurityListingScreen}
      />
      <Stack.Screen
        name="ProviderCreateSecurityListing"
        component={ProviderCreateSecurityListingScreen}
      />
      <Stack.Screen
        name="ProviderEditSecurityBusiness"
        component={ProviderEditSecurityBusinessScreen}
      />

      <Stack.Screen
        name="ProviderAllSecurityListing"
        component={ProviderAllSecurityListingScreen}
      />
    </Stack.Navigator>
  );
};

export default ProviderSecurityActiveListingStack;
