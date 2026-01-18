/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useSelector } from 'react-redux';
import UserStack from '@/stack/UserStack';
import ProviderStack from '@/stack/ProviderStack';

const ClientTypeHomeScreen = () => {
  const { getValues } = useFormContext();
  const values = getValues();

  const user = useSelector((state)=> state.auth.user)
  return (
    <View style={{ flex: 1 }}>
     
      {values?.role === 'USER' || user?.role === 'USER'  ? <UserStack /> : <ProviderStack /> }

    </View>
  );
};

export default ClientTypeHomeScreen;
