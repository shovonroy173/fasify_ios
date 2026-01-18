import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarBookingHomeScreen from '@/screens/userBooking/car/CarBookingHomeScreen';
import CarBookingAvailableScreen from '@/screens/userBooking/car/CarBookingAvailableScreen';
import CarBookingCarDetailScreen from '@/screens/userBooking/car/CarBookingCarDetailScreen';
import CarBookingCredentialScreen from '@/screens/userBooking/car/CarBookingCredentialScreen';
import CarBookingPaymentOverviewScreen from '@/screens/userBooking/car/CarBookingPaymentOverviewScreen';
import PaymentScreen from '@/screens/PaymentScreen';
import OrderSuccessScreen from '@/screens/OrderSuccessScreen';

const UserCarBookingStack = () => {
  const Stack = createNativeStackNavigator();

  return (

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserCarHome" component={CarBookingHomeScreen} />
        {/* <Stack.Screen
          name="UserCarLocation"
          component={CarBookingLocationScreen
          }
        /> */}
        <Stack.Screen
          name="UserCarAvailable"
          component={CarBookingAvailableScreen}
        />
        <Stack.Screen
          name="UserCarDetail"
          component={CarBookingCarDetailScreen}
        />
        <Stack.Screen
          name="UserCarBookingCredential"
          component={CarBookingCredentialScreen}
        />
        <Stack.Screen
          name="UserCarPaymentOverview"
          component={CarBookingPaymentOverviewScreen}
        />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
      </Stack.Navigator>
   
  );
};

export default UserCarBookingStack;
