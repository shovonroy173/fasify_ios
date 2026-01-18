/* eslint-disable react-native/no-inline-styles */
import { View, Image, Pressable, useColorScheme, Text } from 'react-native';
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
import useT from '../utils/useT';

const CancelCarCard = ({ item, name, navigation, path, screen }) => {
  const theme = useColorScheme();
  const { control } = useFormContext();
  const t = useT();
  console.log("LINE AT 18", item);
  
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
                  {/* {item.make} {item.model} */}
                    {item?.car?.carName} {item?.car?.carModel}
                </ThemedText4>
                <ThemedText3>
                  {/* {item?.car?.type} | {item?.car?.carSeats} seats | {item?.car?.fuelType} */}
                 {item?.car?.carSeats} seats 
                </ThemedText3>
                
              </View>
              <Image
                source={{ uri: item?.car?.carImages  ? item?.car?.carImages[0] : 'https://via.placeholder.com/150' }}
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
                // navigation.navigate(path, {
                //   screen: screen,
                //   pathName: path, // ✅ custom param
                //   screenName: screen,
                // }); // Navigate
                navigation.navigate(path, {
                  screen: screen, // screen inside the stack
                  params: {
                    path, // extra info
                    screenName: screen,
                    item: item,
                  },
                });
              }}
              style={{
                borderWidth: 1,
                borderColor:
                  // isSelected
                  //   ? theme === 'dark'
                  //     ? '#f59e0b'
                  //     : '#facc15'

                  '#ef4444', // fallback border light
                borderRadius: 8,
                padding: 16,
              }}
            >
              <Text className="text-center text-red-500  font-SemiBold">
                {/* {isSelected ? 'Cancel' : 'Select Car'} */}
                {t('cancel')}
              </Text>
            </Pressable>
          </ThemedViewYellow>
        );
      }}
    />
  );
};

export default CancelCarCard;
