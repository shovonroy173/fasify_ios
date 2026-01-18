/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React from 'react';
import useT from '../utils/useT';

const GlobalNoData = () => {
  const t = useT();
  return (
    <View style={{ paddingVertical: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 16 }}>{t('noDataFound')}</Text>
    </View>
  );
};

export default GlobalNoData;
