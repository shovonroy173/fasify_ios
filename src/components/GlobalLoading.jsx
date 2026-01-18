/* eslint-disable react-native/no-inline-styles */
import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import useT from '../utils/useT';

const GlobalLoading = () => {
  const t = useT();
  return (
    <View style={{ paddingVertical: 20, alignItems: 'center' }}>
      <ActivityIndicator size="large" color="blue" />
      <Text style={{ marginTop: 10 }}>{t('loading')}</Text>
    </View>
  );
};

export default GlobalLoading;
