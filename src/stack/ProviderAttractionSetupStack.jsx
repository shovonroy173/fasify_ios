import ProviderAttractionBusinessDetailScreen from '@/screens/providerSetup/attractionSetup/ProviderAttractionBusinessDetailScreen';
import ProviderAttractionBusinessListingReviewScreen from '@/screens/providerSetup/attractionSetup/ProviderAttractionBusinessListingReviewScreen';
import ProviderAttractionBusinessListingScreen from '@/screens/providerSetup/attractionSetup/ProviderAttractionBusinessListingScreen';
import ProviderAttractionBusinessLogoScreen from '@/screens/providerSetup/attractionSetup/ProviderAttractionBusinessLogoScreen';
import ProviderAttractionBusinessReviewScreen from '@/screens/providerSetup/attractionSetup/ProviderAttractionBusinessReviewScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const ProviderAttractionSetupStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ProviderAttractionBuisnessDetail"
    >
      <Stack.Screen
        name="ProviderAttractionBuisnessDetail"
        component={ProviderAttractionBusinessDetailScreen}
      />
      <Stack.Screen
        name="ProviderAttractionBusinessLogo"
        component={ProviderAttractionBusinessLogoScreen}
      />
      <Stack.Screen
        name="ProviderAttractionBusinessListing"
        component={ProviderAttractionBusinessListingScreen}
      />
      <Stack.Screen
        name="ProviderAttractionBusinessReview"
        component={ProviderAttractionBusinessReviewScreen}
      />
      <Stack.Screen
        name="ProviderAttractionBusinessListingReview"
        component={ProviderAttractionBusinessListingReviewScreen}
      />
    </Stack.Navigator>
  );
};

export default ProviderAttractionSetupStack;
