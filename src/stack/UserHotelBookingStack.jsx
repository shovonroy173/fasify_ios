import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HotelBookingHomeScreen from '@/screens/userBooking/hotel/HotelBookingHomeScreen';
import HotelBookingSearchScreen from '@/screens/userBooking/hotel/HotelBookingSearchScreen';
import HotelBookingAllHotelScreen from '@/screens/userBooking/hotel/HotelBookingAllHotelScreen';
import HotelBookingHotelDetailScreen from '@/screens/userBooking/hotel/HotelBookingHotelDetailScreen';
import HotelBookingHotelBookScreen from '@/screens/userBooking/hotel/HotelBookingHotelBookScreen';
import HotelBookingHotelBookCredentialScreen from '@/screens/userBooking/hotel/HotelBookingHotelBookCredentialScreen';
import PaymentScreen from '@/screens/PaymentScreen';
import OrderSuccessScreen from '@/screens/OrderSuccessScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserHotelBookingStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    // <SafeAreaView className="flex-1">
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserHotelHome" component={HotelBookingHomeScreen} />
        <Stack.Screen
          name="UserHotelSearch"
          component={HotelBookingSearchScreen}
        />
        <Stack.Screen
          name="UserHotelAllHotel"
          component={HotelBookingAllHotelScreen}
        />
        <Stack.Screen
          name="UserHotelHotelDetail"
          component={HotelBookingHotelDetailScreen}
        />
        <Stack.Screen
          name="UserHotelHotelBook"
          component={HotelBookingHotelBookScreen}
        />
        <Stack.Screen
          name="UserHotelHotelBookCredential"
          component={HotelBookingHotelBookCredentialScreen}
        />

        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
      </Stack.Navigator>
    // </SafeAreaView>
  );
};

export default UserHotelBookingStack;
