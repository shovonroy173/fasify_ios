/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable } from 'react-native';
import React from 'react';
import useT from '../utils/useT';

const GlobalError = ({ refetch }) => {
  const t = useT();
  return (
    <View style={{ paddingVertical: 20, alignItems: 'center' }}>
      <Text style={{ color: 'red', fontSize: 16 }}>
        {t('somethingWentWrong')}
      </Text>
      <Pressable
        onPress={() => refetch()}
        style={{
          marginTop: 10,
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white' }}>{t('retry')}</Text>
      </Pressable>
    </View>
  );
};

export default GlobalError;
