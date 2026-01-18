import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProviderSecurityBusinessPersonalDetailScreen from '@/screens/providerSetup/securityProvider/ProviderSecurityBusinessPersonalDetailScreen';
import ProviderSecurityBusinessDetailScreen from '@/screens/providerSetup/securityProvider/ProviderSecurityBusinessDetailScreen';
import ProviderSecurityBusinessListingScreen from '@/screens/providerSetup/securityProvider/ProviderSecurityBusinessListingScreen';
import ProviderSecurityBusinessReviewScreen from '@/screens/providerSetup/securityProvider/ProviderSecurityBusinessReviewScreen';
import ProviderSecurityListingReviewScreen from '@/screens/providerSetup/securityProvider/ProviderSecurityListingReviewScreen';

const ProviderCarSetupStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ProviderCarBusinessPersonalDetail"
    >
      <Stack.Screen
        name="ProviderCarBusinessPersonalDetail"
        component={ProviderSecurityBusinessPersonalDetailScreen}
      />
      <Stack.Screen
        name="ProviderCarBusinessVehicleDetail"
        component={ProviderSecurityBusinessDetailScreen}
      />
      <Stack.Screen
        name="ProviderCarBusinessListing"
        component={ProviderSecurityBusinessListingScreen}
      />
      <Stack.Screen
        name="ProviderCarBusinessReview"
        component={ProviderSecurityBusinessReviewScreen}
      />
      <Stack.Screen
        name="ProviderCarBusinessListingReview"
        component={ProviderSecurityListingReviewScreen}
      />
    </Stack.Navigator>
  );
};

export default ProviderCarSetupStack;
