


/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Image } from 'react-native';

import { responsiveHeight } from 'react-native-responsive-dimensions';
import { Map, User } from 'lucide-react-native';
import UserHomeScreen from './UserHomeScreen';
import useT from '@/utils/useT';
import UserCategoryScreen from './UserCategoryScreen';
import UserCancelStack from '@/stack/UserCancelStack';
import UserProfileScreen from '@/screens/profile/userProfile/UserProfileScreen';
// import { useThemeColor } from '../../../utils/useThemeColor';

const BottomTabNavigatorUser = () => {
  const Tab = createBottomTabNavigator();
  const t = useT();
  // const { icon2 } = useThemeColor();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          // height: responsiveHeight(12),
          paddingTop: responsiveHeight(1),
        },
        tabBarHideOnKeyboard: false,
        tabBarLabelPosition: 'below-icon',
        animation: 'shift',
      }}
    >
      {/* 🏠 Home */}
      <Tab.Screen
        name="Home"
        component={UserHomeScreen}
        options={{
          tabBarLabel: t('bottomTab.home'),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require('assets/images/home_active.webp')}
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <Image
                source={require('assets/images/home_inactive.webp')}
                style={{ objectFit: 'cover' }}
              />
            ),
        }}
      />

      {/* 📂 Category */}
      <Tab.Screen
        name="Category"
        component={UserCategoryScreen}
        options={{
          tabBarLabel: t('bottomTab.category'),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={require('assets/images/category_active.webp')}
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <Image
                source={require('assets/images/category_inactive.webp')}
                style={{ objectFit: 'cover' }}
              />
            ),
        }}
      />

      {/* 🗺️ Booking */}
      <Tab.Screen
        name="Booking"
        component={UserCancelStack}
        options={{
          tabBarLabel: t('bottomTab.booking'),
          tabBarIcon: ({ focused }) => (
            <Map
              size={26}
              color={focused ? '#1d4ed8' : '#ABABAB'}
              strokeWidth={2.2}
            />
          ),
        }}
      />

      {/* 👤 Profile */}
      <Tab.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{
          tabBarLabel: t('bottomTab.profile'),
          tabBarIcon: ({ focused }) => (
            <User
              size={26}
              color={focused ? '#1d4ed8' : '#ABABAB'}
              strokeWidth={2.2}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigatorUser;
