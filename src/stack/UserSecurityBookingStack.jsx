import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SecurityBookingMapScreen from '@/screens/userBooking/security/SecurityBookingMapScreen';
import SecurityBookingHomeScreen from '@/screens/userBooking/security/SecurityBookingHomeScreen';
import SecurityBookingAllSecurityScreen from '@/screens/userBooking/security/SecurityBookingAllSecurityScreen';
import SecurityBookingSingleSecurityScreen from '@/screens/userBooking/security/SecurityBookingSingleSecurityScreen';
import SecurityBookingBookDetailScreen from '@/screens/userBooking/security/SecurityBookingBookDetailScreen';
import PaymentScreen from '@/screens/PaymentScreen';
import OrderSuccessScreen from '@/screens/OrderSuccessScreen';

const UserSecurityBookingStack = () => {
  const Stack = createNativeStackNavigator();

  return (

      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen
          name="UserSecurityMap"
          component={SecurityBookingMapScreen}
        />
        <Stack.Screen
          name="UserSecurityHome"
          component={SecurityBookingHomeScreen}
        />
        <Stack.Screen
          name="UserSecurityAllSecurity"
          component={SecurityBookingAllSecurityScreen}
        />
        <Stack.Screen
          name="UserSingleSecurity"
          component={SecurityBookingSingleSecurityScreen}
        />
        <Stack.Screen
          name="UserSingleSecurityBookDetail"
          component={SecurityBookingBookDetailScreen}
        />
        {/* <Stack.Screen name="DefaultSeeAll" component={DefaultSeeAllScreen} /> */}
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
      </Stack.Navigator>

  );
};

export default UserSecurityBookingStack;
