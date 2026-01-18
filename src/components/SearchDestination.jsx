/* eslint-disable react-native/no-inline-styles */
import { View, Text, ImageBackground, Pressable } from 'react-native';
import React, { useState } from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedViewOrange from '../utils/ThemedViewOrange';
import ThemedText2 from '../utils/ThemeText2';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';
// import Entypo from 'react-native-vector-icons/Entypo';

import { useThemeColor } from '../utils/useThemeColor';
import { useNavigation } from '@react-navigation/native';
import { Controller, useFormContext } from 'react-hook-form';

const SearchDestination = ({ item, name, screen, navigation, path }) => {
  const { icon } = useThemeColor();
  const { control, watch } = useFormContext();
  // console.log('Des', item, name);
  const [liked, setLiked] = useState(false);

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
        >
          <View
            className="relative"
            style={{
              overflow: 'hidden',
              borderRadius: 10,
              width: responsiveWidth(88),
              height: responsiveHeight(30),
            }}
          >
            {/* <ThemedViewOrange
            styles="rounded-full  absolute top-3 left-3 z-20"
            style={{
              paddingHorizontal: responsiveWidth(2),
              paddingVertical: responsiveHeight(1),
            }}
          >
            <Entypo name="heart-outlined" size={18} color={icon} />
          </ThemedViewOrange> */}
            <Pressable
              className="absolute top-3 left-3 z-20"
              onPress={() => setLiked(!liked)}
            >
              {liked ? (
                <ThemedViewOrange
                  styles="rounded-full  "
                  style={{
                    paddingHorizontal: responsiveWidth(2),
                    paddingVertical: responsiveHeight(1),
                  }}
                >
                  {/* <Entypo name="heart" size={18} color={icon} /> */}
                </ThemedViewOrange>
              ) : (
                <ThemedViewOrange
                  styles="rounded-full  "
                  style={{
                    paddingHorizontal: responsiveWidth(2),
                    paddingVertical: responsiveHeight(1),
                  }}
                >
                  {/* <Entypo name="heart-outlined" size={18} color={icon} /> */}
                </ThemedViewOrange>
              )}
            </Pressable>
            {/* <Pressable
              onPress={() => {
                onChange(item);
                navigation.navigate(path, { screen: screen });
              }}
              className="absolute top-3 right-3 z-20"
            >
              <ThemedViewOrange
                styles="rounded-full   items-center"
                style={{
                  paddingHorizontal: responsiveWidth(2),
                  paddingVertical: responsiveWidth(2),
                }}
              >
                <Entypo
                  name="chevron-with-circle-right"
                  size={18}
                  color={icon}
                />
              </ThemedViewOrange>
            </Pressable> */}
            <ImageBackground
              source={item.uri}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover"
            >
              <View
                className="absolute bottom-2 left-3 flex-row items-center justify-between "
                style={{
                  width: responsiveWidth(82),
                }}
              >
                <View>
                  <ThemedText2 styles="font-Bold text-lg">
                    {item.title}
                  </ThemedText2>
                  <View className="flex-row items-center ">
                    {/* <EvilIcons name="location" size={20} color={icon} /> */}
                    <Text className="text-zinc-200">{item.location}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <View className="flex-row items-center gap-1">
                    {/* <FontAwesome name="star" size={18} color="#FE8814" /> */}
                    <ThemedText2 styles="font-Medium">
                      {item.rating}
                    </ThemedText2>
                  </View>
                  <View className="flex-row items-center ">
                    {/* <Feather name="dollar-sign" size={14} color={icon} /> */}
                    <ThemedText2 styles="font-Medium text-lg">
                      {item.price}
                      <ThemedText2 styles="font-Regular text-sm">
                        /night
                      </ThemedText2>
                    </ThemedText2>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
         </Pressable>
      )}
    />
  );
};

export default SearchDestination;
