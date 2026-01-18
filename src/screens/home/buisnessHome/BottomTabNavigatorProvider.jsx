/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

// import Octicons from 'react-native-vector-icons/Octicons';

import { User } from "lucide-react-native";
import ProviderDashboardBusinessScreen from "./typeSelectorTab/ProviderDashboardBusinessScreen";
import ProviderBookingBusinessScreen from "./typeSelectorTab/ProviderBookingBusinessScreen";
import ProviderActiveListingBusinessScreen from "./typeSelectorTab/ProviderActiveListingBusinessScreen";
import ProviderCreateHotelListingScreen from "./activeListing/hotelActiveListing/ProviderCreateHotelListingScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { responsiveHeight } from "react-native-responsive-dimensions";
import ProviderProfileScreen from "@/screens/profile/providerProfile/ProviderProfileScreen";

const BottomTabNavigatorProvider = () => {
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView className="flex-1">
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: responsiveHeight(12),
            paddingTop: responsiveHeight(1),
          },
          tabBarHideOnKeyboard: false,
          tabBarLabelPosition: "below-icon",
          animation: "shift",
        }}
      >
        <Tab.Screen
          name="Dashboard"
          // component={ProviderDashboardScreen}
          component={ProviderDashboardBusinessScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  source={require("assets/images/dashboard_active.webp")}
                  style={{
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Image
                  source={require("assets/images/dashboard_inactive.webp")}
                  style={{
                    objectFit: "cover",
                  }}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Bookings"
          component={ProviderBookingBusinessScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  source={require("assets/images/booking_active.webp")}
                  style={{
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Image
                  source={require("assets/images/booking_inactive.webp")}
                  style={{
                    objectFit: "cover",
                  }}
                />
              ),
          }}
        />

        <Tab.Screen
          name="Active Listings"
          component={ProviderActiveListingBusinessScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  source={require("assets/images/listing_active.webp")}
                  style={{
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Image
                  source={require("assets/images/listing_inactive.webp")}
                  style={{
                    objectFit: "cover",
                  }}
                />
              ),
          }}
        />
        <Tab.Screen
          name="ProviderCreateHotelListing"
          component={ProviderCreateHotelListingScreen}
          options={{
            tabBarButton: () => null,
            tabBarItemStyle: { display: "none", width: 0 },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProviderProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <User
                size={26}
                color={focused ? "#1d4ed8" : "#ABABAB"}
                strokeWidth={2.2}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomTabNavigatorProvider;
