import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProviderCarBusinessPersonalDetailScreen from '@/screens/providerSetup/carProvider/ProviderCarBusinessPersonalDetailScreen';
import ProviderCarBusinessVehicleDetailScreen from '@/screens/providerSetup/carProvider/ProviderCarBusinessVehicleDetailScreen';
import ProviderCarBusinessListingScreen from '@/screens/providerSetup/carProvider/ProviderCarBusinessListingScreen';
import ProviderCarBusinessReviewScreen from '@/screens/providerSetup/carProvider/ProviderCarBusinessReviewScreen';
import ProviderCarBusinessListingReviewScreen from '@/screens/providerSetup/carProvider/ProviderCarBusinessListingReviewScreen';

const ProviderCarSetupStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ProviderCarBusinessPersonalDetail"
    >
      <Stack.Screen
        name="ProviderCarBusinessPersonalDetail"
        component={ProviderCarBusinessPersonalDetailScreen}
      />
      <Stack.Screen
        name="ProviderCarBusinessVehicleDetail"
        component={ProviderCarBusinessVehicleDetailScreen}
      />
      <Stack.Screen
        name="ProviderCarBusinessListing"
        component={ProviderCarBusinessListingScreen}
      />
      <Stack.Screen
        name="ProviderCarBusinessReview"
        component={ProviderCarBusinessReviewScreen}
      />
      <Stack.Screen
        name="ProviderCarBusinessListingReview"
        component={ProviderCarBusinessListingReviewScreen}
      />
    </Stack.Navigator>
  );
};

export default ProviderCarSetupStack;
