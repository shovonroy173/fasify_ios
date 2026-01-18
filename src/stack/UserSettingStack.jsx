import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingScreen from '@/screens/userSetting/SettingScreen';
import EmailPhoneSettingScreen from '@/screens/userSetting/EmailPhoneSettingScreen';
import SecuritySettingScreen from '@/screens/userSetting/SecuritySettingScreen';
import DeleteAccountScreen from '@/screens/userSetting/DeleteAccountScreen';
import AboutScreen from '@/screens/userSetting/AboutScreen';
import PrivacyPolicyScreen from '@/screens/userSetting/PrivacyPolicyScreen';
import TermsConditionScreen from '@/screens/userSetting/TermsConditionScreen';
import SetPinSettingScreen from '@/screens/userSetting/SetPinSettingScreen';
import SetPinConfirmSettingScreen from '@/screens/userSetting/SetPinConfirmSettingScreen';
import CustomerServiceScreen from '@/screens/userSetting/CustomerServiceScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserSettingStack = () => {
  const Stack = createNativeStackNavigator();

  return (

      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='UserSettingHome'>

        <Stack.Screen name="UserSettingHome" component={SettingScreen} />
        <Stack.Screen
          name="UserEmailVerification"
          component={EmailPhoneSettingScreen}
        />
        <Stack.Screen
          name="UserSecuritySetting"
          component={SecuritySettingScreen}
        />
        <Stack.Screen name="UserPinSetting" component={SetPinSettingScreen} />
        <Stack.Screen
          name="UserPinConfirmSetting"
          component={SetPinConfirmSettingScreen}
        />
        <Stack.Screen
          name="UserDeleteAccount"
          component={DeleteAccountScreen}
        />
        <Stack.Screen name="UserAbout" component={AboutScreen} />

        <Stack.Screen name="UserCustomerService" component={CustomerServiceScreen} />
        <Stack.Screen
          name="UserPrivacyPolicy"
          component={PrivacyPolicyScreen}
        />
        <Stack.Screen name="UserTerms" component={TermsConditionScreen} />
      </Stack.Navigator>
 
  );
};

export default UserSettingStack;
