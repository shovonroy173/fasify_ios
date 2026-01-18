import React from 'react';
import { View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RatingStar = ({ rating = 0, maxStars = 5, size = 16, color = '#FE8814' }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars >= 0.5;
  const emptyStars = maxStars - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {[...Array(filledStars)].map((_, i) => (
        <FontAwesome key={`full-${i}`} name="star" size={size} color={color} />
      ))}
      {hasHalfStar && <FontAwesome name="star-half-full" size={size} color={color} />}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesome key={`empty-${i}`} name="star-o" size={size} color={color} />
      ))}
    </View>
  );
};

export default RatingStar;
