/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView } from 'react-native';
import CarSpecification from './CarSpecification';

const CarSpecificationsList = ({ specifications }) => {
  console.log('LINE AT 15', specifications);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12 }}
    >
      {Object.entries(specifications).map(([key, value]) => {
        return (
          <CarSpecification
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={value}
            iconName={key}
            // iconLibrary={icon.lib}
          />
        );
      })}
    </ScrollView>
  );
};

export default CarSpecificationsList;
