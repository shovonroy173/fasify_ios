/* eslint-disable react-native/no-inline-styles */
import { View, FlatList } from 'react-native';
import React from 'react';
import ThemedText from '../utils/ThemedText';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useGetSecurityByPopularQuery } from '../redux/slices/userSlice/securityBookingSlice';
import GlobalLoading from './GlobalLoading';
import GlobalError from './GlobalError';
import GlobalNoData from './GlobalNoData';
import { Pressable, Image } from 'react-native';

import { Controller, useFormContext } from 'react-hook-form';

const GuardCard = ({ guard }) => {
  const navigation = useNavigation();
  const { control } = useFormContext(); // ✅ get control from context

  return (
    <Controller
      control={control}
      name="selectedSecurity"
      render={({ field: { value, onChange } }) => (
        <Pressable
          key={guard.id}
          className="items-center"
          style={{ marginRight: responsiveWidth(3.3) }}
          onPress={() => {
            // ✅ set selected guard
            onChange(guard);
            // optional navigation
            navigation.navigate('UserSingleSecurity');
          }}
        >
          <Image
            source={{
              uri:
                guard.securityImages[0] ||
                'https://images.pexels.com/photos/7714702/pexels-photo-7714702.jpeg',
            }}
            className="rounded-full"
            style={{
              width: responsiveWidth(15),
              height: responsiveWidth(15),
              borderWidth: value?.id === guard.id ? 2 : 0, // highlight if selected
              borderColor: value?.id === guard.id ? 'blue' : 'transparent',
            }}
          />
          <ThemedText styles="text-xs font-Medium text-center">
            {guard?.securityGuardName?.split(' ')[0] || ''}
          </ThemedText>
          <ThemedText styles="text-xs font-Regular opacity-80 text-center">
            {guard?.securityGuardName?.split(' ')[1] || ''}
          </ThemedText>
        </Pressable>
      )}
    />
  );
};

const SecurityNearby = () => {
  const {
    data: securityPopularData,
    isLoading: securityPopularLoading,
    isError: securityPopularError,
    refetch,
  } = useGetSecurityByPopularQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  // console.log(securityPopularData);

  const renderPopular = ({ item }) => <GuardCard guard={item} />;

  return (
    <FlatList
      data={securityPopularData?.data}
      renderItem={renderPopular}
      keyExtractor={item => item.id?.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={
        <View>
          {securityPopularLoading && <GlobalLoading />}
          {securityPopularError && <GlobalError refetch={refetch} />}
          {!securityPopularLoading &&
            !securityPopularError &&
            !securityPopularData?.data?.length && <GlobalNoData />}
        </View>
      }
    />
  );
};

export default SecurityNearby;
