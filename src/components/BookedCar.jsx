/* eslint-disable react-native/no-inline-styles */
import { View, Image } from 'react-native';
import React from 'react';
import ThemedViewYellow from '../utils/ThemedViewYellow';
import ThemedText4 from '../utils/ThemeText4';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ThemedText3 from '../utils/ThemedText3';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Star } from 'lucide-react-native';

const BookedCar = ({ item }) => {
  // console.log('LINE AT 11', item);

  return (
    <ThemedViewYellow styles=" flex-row justify-between items-start p-3 rounded-lg">
      <View className="gap-1">
        <ThemedText4 styles="font-SemiBold text-lg">
          {item?.carName} {item?.carModel}
        </ThemedText4>

        <View className="flex-row items-center gap-2">
          <Star size={16} color="#3B82F6" />
          <ThemedText3>
            {item?.carRating} ({item?.carReviewCount} reviews)
          </ThemedText3>
        </View>
      </View>
      {item?.carImages && (
        <Image
          source={{ uri: item?.carImages[0] }}
          style={{
            width: responsiveWidth(17),
            height: responsiveWidth(10),
            objectFit: 'cover',
            borderRadius: responsiveWidth(2),
          }}
        />
      )}
    </ThemedViewYellow>
  );
};

export default BookedCar;
