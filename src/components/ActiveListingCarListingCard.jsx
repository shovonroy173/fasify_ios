import { View, Image } from 'react-native';
import React from 'react';
import ThemedText3 from '../utils/ThemedText3';
// import Feather from 'react-native-vector-icons/Feather';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import ThemedText4 from '../utils/ThemeText4';
import { Controller, useFormContext } from 'react-hook-form';
import ThemedViewYellow from '../utils/ThemedViewYellow';
// import Icon from 'react-native-vector-icons/Ionicons';
import ThemedText from '../utils/ThemedText';
import ThemedPressableWhite from '../utils/ThemedPressableWhite';
import { useThemeColor } from '../utils/useThemeColor';
const ActiveListingCarListingCard = ({
  item,
  name,
  navigation,
  path,
  screen,
  pathListing,
}) => {
  //   const theme = useColorScheme();
  const { control } = useFormContext();
  // console.log('LINE AT 16', item);
  const { icon3 } = useThemeColor();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        // const isSelected = value?.id === item?.id;

        return (
          <ThemedViewYellow
            styles="flex-row border rounded-xl p-3 items-start"
            style={{
              gap: responsiveHeight(2),
              padding: responsiveWidth(4),
            }}
          >
            <Image
              source={{ uri: item?.carImages[0] }}
              className="w-20 h-full rounded-md mr-3"
              resizeMode="cover"
            />

            <View className="flex-1 justify-center gap-2">
              <ThemedText styles="text-base font-SemiBold ">
                {item?.category}
              </ThemedText>
              <ThemedText3 styles="text-sm font-Regular ">
                {item?.carType}
              </ThemedText3>
              <View className="flex-row w-2/3">
                {/* <Icon name="location-outline" size={14} color={icon3} /> */}
                <ThemedText3 styles="text-sm ml-1">
                  {item?.carAddress}, {item?.carCity}, {item?.carCountry}
                </ThemedText3>
              </View>

              <View className="flex-row items-center ">
                {/* <ThemedPressableWhite
                styles="border rounded-xl p-2  "
                onPress={() => {
                  onChange(item); // set the selected item
                  navigation.navigate(pathListing, { id: item?.id }); // navigate to next screen
                }}
              >
                <ThemedText styles="font-SemiBold text-center">
                  View All Cars
                </ThemedText>
              </ThemedPressableWhite> */}
                <ThemedPressableWhite
                  styles="border rounded-xl p-2  "
                  onPress={() => {
                    onChange(item); // set the selected item
                    navigation.navigate(path, { screen: screen }); // navigate to next screen
                  }}
                >
                  <ThemedText styles="font-SemiBold text-center">
                    Edit Car
                  </ThemedText>
                </ThemedPressableWhite>
              </View>

              {/* <View className="items-end justify-center"> */}
              {/* <View className="flex-row items-center mb-2">
                <Icon name="star" size={14} color="#FFA500" />
               
              </View> */}

              <View className="flex-row items-baseline">
                <ThemedText styles="text-lg font-Bold">
                  {item?.currency} {item?.carPriceDay}
                </ThemedText>
                <ThemedText3 styles="text-sm">/night</ThemedText3>
              </View>
            </View>
          </ThemedViewYellow>
        );
      }}
    />
  );
};

export default ActiveListingCarListingCard;
