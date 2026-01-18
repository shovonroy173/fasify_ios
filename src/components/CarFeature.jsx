/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, useColorScheme } from 'react-native';
import ThemedViewYellow from '../utils/ThemedViewYellow';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import ThemedText from '../utils/ThemedText';
import ThemedText3 from '../utils/ThemedText3';
import ThemedText4 from '../utils/ThemeText4';

const CarFeature = ({ label, value }) => {
  const theme = useColorScheme();

  return (
    <View
      style={{
        padding: responsiveWidth(4),
        backgroundColor: theme === 'dark' ? '#fef08a' : '#fefce8',
      }}
      className="rounded-xl  flex-row justify-between items-center  border border-primary"
    >
      {/* <ThemedViewYellow
        styles="rounded-xl  flex-row justify-between items-center  border"
        style={{
          padding: responsiveWidth(4),
        }}
      > */}
      <ThemedText3 styles="font-Regular">{label}</ThemedText3>
      <ThemedText4 styles="font-SemiBold">{value}</ThemedText4>
      {/* </ThemedViewYellow> */}
    </View>
  );
};

export default CarFeature;
