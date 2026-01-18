import { View,  useColorScheme } from 'react-native';
import React from 'react';
import ThemedView from '../utils/ThemedView';
import ThemedText from '../utils/ThemedText';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useThemeColor } from '../utils/useThemeColor';

const BookHotelDetail = ({ item }) => {
  const {  icon2 } = useThemeColor();
  const theme = useColorScheme();
  // const t = useT();
  // console.log(item);

  return (
    <ThemedView
      styles={`flex-row items-start justify-between border ${
        theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'
      }   rounded-xl`}
      style={{
        padding: responsiveWidth(4)
      }}
    >
      <ThemedView>
        <ThemedText styles="font-SemiBold text-lg">
          {item?.hotelName}
        </ThemedText>

        <View className="flex-row items-center ">
          {/* <EvilIcons name="location" size={20} color={icon2} /> */}
          <ThemedText styles="font-Medium opacity-50 text-wrap ">
           
            {item?.hotelCity}, {item?.hotelCountry}
          </ThemedText>
        </View>
      </ThemedView>

    </ThemedView>
  );
};

export default BookHotelDetail;
