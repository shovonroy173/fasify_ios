/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Pressable,
} from 'react-native';
import AvailableCar from './AvailableCar';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const BookingComponent = ({
  data,
  isLoading,
  isError,
  isFetchingMore,
  onRefresh,
  loadMore,
  refreshing,
  refetch,
}) => {
  const navigation = useNavigation();
  if (isLoading) return <ActivityIndicator size="large" color="blue" />;
  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}
      >
        <Text style={{ color: 'red', fontSize: 16 }}>Error fetching cars</Text>
        <Pressable
          onPress={refetch}
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: 'blue',
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white' }}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  const cars = data?.data?.data ?? [];
  if (!cars.length) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}
      >
        <Text>No cars found</Text>
      </View>
    );
  }

  const renderFooter = () =>
    isFetchingMore && (
      <ActivityIndicator
        color="blue"
        size="large"
        style={{ paddingVertical: 20 }}
      />
    );

  return (
    <FlatList
      data={cars}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <AvailableCar
          key={item.id}
          item={item}
          name="selectedCar"
          navigation={navigation}
          path="UserCarBooking"
          screen="UserCarDetail"
        />
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListFooterComponent={renderFooter}
      contentContainerStyle={{ gap: responsiveHeight(1) }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default BookingComponent;
