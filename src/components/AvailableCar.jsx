/* eslint-disable react-native/no-inline-styles */
import { View, Image, Pressable, useColorScheme } from 'react-native';
import React from 'react';
import ThemedText3 from '../utils/ThemedText3';
// import Feather from 'react-native-vector-icons/Feather';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import ThemedText4 from '../utils/ThemeText4';
import { Controller, useFormContext } from 'react-hook-form';
import ThemedText from '../utils/ThemedText';
import useT from '../utils/useT';
import { MapPin } from 'lucide-react-native';

const AvailableCar = ({ item, name, navigation, path, screen }) => {
  const theme = useColorScheme();
  const { control } = useFormContext();
  const t = useT();
  // console.log('LINE AT 114', item);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        const isSelected = value?.id === item?.id;

        return (
          <Pressable
            className="flex-row justify-between items-start border border-primary"
            style={{
              backgroundColor: theme === 'dark' ? '#fef08a' : '#fefce8',
              borderRadius: 12,
              // borderWidth: 1,
              // borderColor: theme === 'dark' ? '#333' : '#e5e5e5',
              padding: responsiveWidth(4),
              // marginBottom: responsiveHeight(1.5),
              // shadowColor: '#000',
              // shadowOffset: {
              //   width: 0,
              //   height: 2,
              // },
              // shadowOpacity: 0.1,
              // shadowRadius: 3,
              // elevation: 3,
            }}
             onPress={() => {
                  onChange(item); // Set selected car
                  navigation.navigate(path, { screen: screen }); // Navigate
                }}
          >
            {/* Header Section */}
            <View>
              <View className="flex-1 w-2/3">
                <ThemedText4 styles="font-SemiBold text-lg mb-1">
                  {item?.carName} {item?.carModel}
                </ThemedText4>
                <ThemedText3 styles="text-sm mb-2">
                  {item?.carType} | {item?.carSeats} seats | {item?.fuelType}
                </ThemedText3>
                <View className="flex-row items-center">
                 
                  <MapPin size={14} color={'gray'} />
                  <ThemedText3 styles="text-sm ml-1">
                    {item?.carAddress}, {item?.carCity},
                  </ThemedText3>
                </View>
                <ThemedText3 styles="text-sm ml-3">
                  {item?.carCountry}
                </ThemedText3>
              </View>

              {/* Car Image */}
            </View>

            {/* View Car Button */}
            <View className="justify-between items-center gap-3">
              <Image
                source={{
                  uri: item?.carImages
                    ? item?.carImages[0]
                    : 'https://via.placeholder.com/150',
                }}
                style={{
                  width: responsiveWidth(20),
                  height: responsiveWidth(12),
                  objectFit: 'contain',
                  borderRadius: responsiveWidth(20),
                }}
              />
              <Pressable
                className="bg-primary dark:bg-primary_dark"
                // onPress={() => {
                //   onChange(item); // Set selected car
                //   navigation.navigate(path, { screen: screen }); // Navigate
                // }}
                style={{
                  borderRadius: 8,
                  paddingVertical: 4,
                  // paddingHorizontal: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: responsiveWidth(25),
                }}
              >
                <ThemedText
                  styles="font-SemiBold text-base"
                  style={{ color: '#ffffff' }}
                >
                  {/* {isSelected ? t('selected') : t('selectCar')} */}
                  Select
                </ThemedText>
              </Pressable>
            </View>
          </Pressable>
        );
      }}
    />
  );
};

export default AvailableCar;
