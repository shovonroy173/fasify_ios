import React from 'react';
import { View } from 'react-native';
import CarFeature from './CarFeature';

const CarFeaturesList = ({ features }) => {
  return (
    <View style={{ gap: 10 }}>
      {Object.entries(features).map(([label, value], index) => (
        <CarFeature key={index} label={label} value={value} />
      ))}
    </View>
  );
};

export default CarFeaturesList;
