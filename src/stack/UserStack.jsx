import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigatorUser from "@/screens/home/userHome/BottomTabNavigatorUser";
import { SafeAreaView } from "react-native-safe-area-context";
import UserHotelBookingStack from "./UserHotelBookingStack";
import UserSecurityBookingStack from "./UserSecurityBookingStack";
import UserCarBookingStack from "./UserCarBookingStack";
import UserAttractionBookingStack from "./UserAttractionBookingStack";
import UserSettingStack from "./UserSettingStack";
import UserMyVoucherScreen from "@/screens/userSetting/UserMyVoucherScreen";
import UserMyOrdersScreen from "@/screens/userSetting/UserMyOrdersScreen";
import UpcomingScreen from "@/screens/UpcomingScreen";
import ChatScreen from "@/screens/ChatScreen";
import NotificationScreen from "@/screens/NotificationScreen";
import UserEditProfileScreen from "@/screens/profile/userProfile/UserEditProfileScreen";

const UserStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView className="flex-1">
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserHome" component={BottomTabNavigatorUser} />
        {/* <Stack.Screen name="UserProfile" component={UserProfileScreen} /> */}
        <Stack.Screen
          name="UserEditProfile"
          component={UserEditProfileScreen}
        />
        <Stack.Screen
          name="UserHotelBooking"
          component={UserHotelBookingStack}
        />
        <Stack.Screen name="UserCarBooking" component={UserCarBookingStack} />
        <Stack.Screen
          name="UserSecurityBooking"
          component={UserSecurityBookingStack}
        />
        <Stack.Screen
          name="UserAttractionBooking"
          component={UserAttractionBookingStack}
        />
        <Stack.Screen name="UserSetting" component={UserSettingStack} />
        <Stack.Screen name="UserVoucher" component={UserMyVoucherScreen} />
        <Stack.Screen name="UserOrders" component={UserMyOrdersScreen} />

        <Stack.Screen name="UserUpcoming" component={UpcomingScreen} />
        <Stack.Screen name="UserChat" component={ChatScreen} />
        <Stack.Screen name="UserNotification" component={NotificationScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default UserStack;
