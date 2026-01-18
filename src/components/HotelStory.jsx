/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, ImageBackground, Pressable } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';

import ThemedText2 from '../utils/ThemeText2';
// import ThemedViewOrange from '../utils/ThemedViewOrange';
import { useThemeColor } from '../utils/useThemeColor';
import { Controller, useFormContext } from 'react-hook-form';

const HotelStory = ({ item, name, navigation, path, screen }) => {
  const { icon } = useThemeColor();
  const { control } = useFormContext();
  // console.log(item);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Pressable
          onPress={() => {
            onChange(item);
            navigation.navigate(path, { screen: screen });
          }}
          className="relative"
          style={{
            overflow: 'hidden',
            borderRadius: 10,
            width: responsiveWidth(42),
            height: responsiveHeight(30),
          }}
        >
          {/* Optional Discount Tag */}
          {/* {item.discount && (
            <ThemedViewOrange
              styles="rounded-full absolute top-2 left-2 z-20"
              style={{
                paddingHorizontal: responsiveWidth(5),
                paddingVertical: responsiveHeight(0.8),
              }}
            >
              <ThemedText2 styles="font-Medium text-sm">
                {item.discount}% OFF
              </ThemedText2>
            </ThemedViewOrange>
          )} */}

          <ImageBackground
            source={item.uri}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          >
            <View
              className="absolute bottom-2 left-2"
              style={{ width: responsiveWidth(35) }}
            >
              <View>
                <ThemedText2 styles="font-Bold text-lg">
                  {item.title}
                </ThemedText2>
                <View className="flex-row items-center">
                  {/* <EvilIcons name="location" size={20} color={icon} /> */}
                  <Text className="text-zinc-200">{item.location}</Text>
                </View>
              </View>
              <View className="flex-row justify-between items-start">
                <View className="flex-row items-center gap-1">
                  {/* <FontAwesome name="star" size={18} color="#FE8814" /> */}
                  <ThemedText2 styles="font-Medium">{item.rating}</ThemedText2>
                </View>
                <View className="flex-row items-center">
                  {/* <Feather name="dollar-sign" size={14} color={icon} /> */}
                  <ThemedText2 styles="font-Medium">
                    {item.price}
                    <ThemedText2 styles="font-Regular text-xs">
                      /night
                    </ThemedText2>
                  </ThemedText2>
                </View>
              </View>
            </View>
          </ImageBackground>
        </Pressable>
      )}
    />
  );
};

export default HotelStory;
