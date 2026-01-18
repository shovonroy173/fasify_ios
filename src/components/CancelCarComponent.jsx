

import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useCallback, useState } from 'react';

import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import useT from '@/utils/useT';
import CancelCarCard from './CancelCarCard';


const CancelCarComponent = ({
  data,
  isLoading,
  isError,
  isFetchingMore,
  refresh,
}) => {
  const navigation = useNavigation();
  const t = useT();
  const [refreshing, setRefreshing] = useState(false);

// console.log('LINE AT 83', data);


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
      data={data.data}
      renderItem={({ item }) => (
        <CancelCarCard
          key={item.id}
          item={item}
          name="selectedCancelCar"
          navigation={navigation}
          path="Booking"
          screen="CancelCarBooking"
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

export default CancelCarComponent;
