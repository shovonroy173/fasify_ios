/* eslint-disable react-native/no-inline-styles */
import { View, Image, Pressable, useColorScheme } from 'react-native';
import React from 'react';
import ThemedText3 from '../utils/ThemedText3';
// import Feather from 'react-native-vector-icons/Feather';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedText4 from '../utils/ThemeText4';
import { Controller, useFormContext } from 'react-hook-form';
import ThemedViewYellow from '../utils/ThemedViewYellow';

const AvailableCarDefault = ({ item, name, navigation, path, screen }) => {
  const theme = useColorScheme();
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        // const isSelected = value?.id === item?.id;

        return (
          <ThemedViewYellow
            styles="justify-center rounded-xl"
            style={{
              gap: responsiveHeight(2),
              padding: responsiveWidth(4),
            }}
          >
            <View className="flex-row justify-between items-start">
              <View className="gap-1">
                <ThemedText4 styles="font-SemiBold text-lg">
                  {item.make} {item.model}
                </ThemedText4>
                <ThemedText3>
                  {item.type} | {item.seats} seats | {item.fuelType}
                </ThemedText3>
                <View className="flex-row items-center gap-2">
                  {/* <Feather name="map-pin" size={15} color="#999" /> */}
                  <ThemedText4 styles="font-Medium text-sm">
                    800m (5mins away)
                  </ThemedText4>
                </View>
              </View>
              <Image
                source={require('../../assets/images/car.png')}
                style={{
                  width: responsiveWidth(17),
                  height: responsiveWidth(10),
                  objectFit: 'cover',
                }}
              />
            </View>

            <Pressable
              onPress={() => {
                onChange(item); // Set selected car
                navigation.navigate(path); // Navigate
              }}
              style={{
                borderWidth: 1,
                borderColor: 
                   theme === 'dark'
                    ? '#f59e0b'
                    : '#facc15',
                //   : theme === 'dark'
                //   ? '#27272a' // fallback border dark
                //   : '#3f3f46', // fallback border light
                borderRadius: 8,
                padding: 16,
              }}
            >
              <ThemedText4 styles="text-center font-SemiBold">
                Edit
              </ThemedText4>
            </Pressable>
          </ThemedViewYellow>
        );
      }}
    />
  );
};

export default AvailableCarDefault;
