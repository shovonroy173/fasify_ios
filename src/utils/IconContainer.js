import { Pressable } from 'react-native';
import React from 'react';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import ThemedView from './ThemedView';

const IconContainer = ({ icon, onPress }) => {
  return (
    <ThemedView
      styles="rounded-full justify-center items-center"
      style={{
        width: responsiveWidth(10),
        height: responsiveWidth(10),
      }}
    >
      <Pressable onPress={onPress}>{icon}</Pressable>
    </ThemedView>
  );
};

export default IconContainer;
