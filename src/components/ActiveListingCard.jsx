import React from 'react';
import {
  View,
  // Text,
  Image,
  StyleSheet,
  Platform,
  // Pressable,
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import ThemedPressableWhite from '../utils/ThemedPressableWhite';
import ThemedText from '../utils/ThemedText';
import ThemedText3 from '../utils/ThemedText3';
// import { useThemeColor } from '../utils/useThemeColor';
import { useColorScheme } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import ThemedView from '../utils/ThemedView';

const ActiveListingCard = ({ item, name, navigation, path, screen , pathRoom}) => {
  // const { icon3 } = useThemeColor();
  const theme = useColorScheme();
  const { control } = useFormContext();
  // console.log('Active listing', item);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <ThemedView
          styles="flex-row border rounded-xl p-3 items-start"
          style={[
            styles.cardShadow,
            theme === 'dark' ? styles.shadowDark : styles.shadowLight,
          ]}
          // onPress={() => {
          //   onChange(item); // set the selected item
          //   // navigation.navigate(path); // navigate to next screen
          // }}
        >
          <Image
            source={{ uri: item?.businessLogo }}
            className="w-20 h-20 rounded-md mr-3"
            resizeMode="cover"
          />

          <View className="flex-1 justify-center gap-2">
            <ThemedText styles="text-base font-SemiBold ">
              {item?.hotelBusinessName}
            </ThemedText>
            <ThemedText3 styles="text-sm font-Regular ">
              {item?.businessTagline}
            </ThemedText3>

            {/* <View className="flex-row items-center ">
              <Icon name="location-outline" size={14} color={icon3} />
              <ThemedText3 styles="text-sm ml-1">
                {item?.hotelAddress}
              </ThemedText3>
            </View> */}
            {/* <View className="flex-row ">
              <ThemedText styles="text-sm font-Medium ml-1">
                Total Rooms:
              </ThemedText>
              <ThemedText styles="text-sm font-Medium ml-1">
                {item?.totalRooms}
              </ThemedText>
            </View> */}
            <ThemedPressableWhite
              styles="border rounded-xl p-2  "
              onPress={() => {
                onChange(item); // set the selected item
                navigation.navigate(pathRoom, {id: item?.id}); // navigate to next screen
              }}
            >
              <ThemedText styles="font-SemiBold text-center">
                View All Rooms
              </ThemedText>
            </ThemedPressableWhite>
            <ThemedPressableWhite
              styles="border rounded-xl p-2  "
              onPress={() => {
                onChange(item); // set the selected item
                navigation.navigate(path, {screen: screen}); // navigate to next screen
              }}
            >
              <ThemedText styles="font-SemiBold text-center">
                Edit Hotel
              </ThemedText>
            </ThemedPressableWhite>
          </View>

          {/* <View className="items-end justify-center">
            <View className="flex-row items-center mb-2">
              <Icon name="star" size={14} color="#FFA500" />
              <ThemedText styles="text-sm font-Medium ml-1">
                {item?.hotelRating}
              </ThemedText>
            </View>

            <View className="flex-row items-baseline">
              <ThemedText styles="text-lg font-Bold">
                ${item?.hotelRoomPriceNight}
              </ThemedText>
              <ThemedText3 styles="text-sm">/night</ThemedText3>
            </View>
          </View> */}
        </ThemedView>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
    }),
  },
  shadowLight: {
    shadowColor: '#000000',
  },
  shadowDark: {
    shadowColor: '#ffff10',
  },
});

export default ActiveListingCard;
