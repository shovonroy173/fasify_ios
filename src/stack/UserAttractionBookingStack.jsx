import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AttractionBookingHomeScreen from "@/screens/userBooking/attraction/AttractionBookingHomeScreen";
import AttractionBookingAllTicketScreen from "@/screens/userBooking/attraction/AttractionBookingAllTicketScreen";
import AttractionBookingDetailScreen from "@/screens/userBooking/attraction/AttractionBookingDetailScreen";
import AttractionBookingCredentialScreen from "@/screens/userBooking/attraction/AttractionBookingCredentialScreen";
import AttractionBookingBookDetailScreen from "@/screens/userBooking/attraction/AttractionBookingBookDetailScreen";
import PaymentScreen from "@/screens/PaymentScreen";
import OrderSuccessScreen from "@/screens/OrderSuccessScreen";
import AttractionBookingAvailableScreen from "@/screens/userBooking/attraction/AttractionBookingAvailableScreen";

const UserAttractionBookingStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="UserAttractionHome"
        component={AttractionBookingHomeScreen}
      />
      <Stack.Screen
        name="UserAttractionBookingAvailable"
        component={AttractionBookingAvailableScreen}
      />
      <Stack.Screen
        name="UserAttractionAllTicket"
        component={AttractionBookingAllTicketScreen}
      />
      <Stack.Screen
        name="UserAttractionDetail"
        component={AttractionBookingDetailScreen}
      />
      <Stack.Screen
        name="UserAttractionCredential"
        component={AttractionBookingCredentialScreen}
      />
      <Stack.Screen
        name="UserAttractionBookDetail"
        component={AttractionBookingBookDetailScreen}
      />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
    </Stack.Navigator>
  );
};

export default UserAttractionBookingStack;
