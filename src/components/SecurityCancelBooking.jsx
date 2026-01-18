/* eslint-disable react-native/no-inline-styles */

import { Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useCallback, useState } from 'react';
import SingleSecurityCancelComponent from './SingleSecurityCancelComponent';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import useT from '@/utils/useT';

const SecurityCancelBooking = ({
  data,
  isLoading,
  isError,
  isFetchingMore,
  refresh,
}) => {
  const navigation = useNavigation();
  const t = useT();
  const [refreshing, setRefreshing] = useState(false);

  console.log('LINE AT 16', data);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  if (isLoading)
    return (
      <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
    );
  if (isError || !data?.success || data?.data?.length === 0) {
    return (
      <Text className="text-blue-600 font-SemiBold text-lg mt-4">
        No Booking till now!
      </Text>
    );
  }

  return (
    <FlatList
      data={data?.data}
      renderItem={({ item }) => (
        <SingleSecurityCancelComponent
          key={item.id}
          booking={item}
          name="selectedCancelSecurity"
          navigation={navigation}
          path="Booking"
          screen="CancelSecurityBooking"
        />
      )}
      keyExtractor={(item, index) => item.id || index.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: responsiveHeight(2), paddingVertical: 8 }}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default SecurityCancelBooking;
