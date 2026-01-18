/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Pressable,
} from 'react-native';
import SingleSecurityBooking from './SingleSecurityBooking';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const SecurityComponent = ({
  data,
  isLoading,
  isError,
  isFetchingMore,
  onRefresh,
  loadMore,
  refreshing,
  refetch,
}) => {
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
        <Text style={{ color: 'red', fontSize: 16 }}>
          Error fetching security bookings
        </Text>
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

  const bookings = data?.data?.data ?? [];
  if (!bookings.length) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}
      >
        <Text>No security bookings found</Text>
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
      data={bookings}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <SingleSecurityBooking
          key={item.id}
          booking={item}
          name="selectedSecurity"
          path="UserSecurityBooking"
          screen="UserSingleSecurity"
        />
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListFooterComponent={renderFooter}
      contentContainerStyle={{
        paddingBottom: responsiveHeight(2),
        gap: responsiveHeight(2),
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SecurityComponent;
