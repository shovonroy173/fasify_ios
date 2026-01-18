/* eslint-disable react-native/no-inline-styles */
import { View,  ActivityIndicator } from 'react-native';
import React from 'react';

const GlobalRenderFooter = ({ isFetchingMore }) => {
  return isFetchingMore ? (
    <View style={{ paddingVertical: 20, alignItems: 'center' }}>
      <ActivityIndicator color="blue" size="large" />
    </View>
  ) : null;
};

export default GlobalRenderFooter;
