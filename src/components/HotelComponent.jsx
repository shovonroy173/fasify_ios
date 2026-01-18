
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Pressable,
} from 'react-native';
import Destination from './Destination';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const HotelComponent = ({
  data,
  isLoading,
  isError,
  isFetchingMore,
  onRefresh,
  loadMore,
  refreshing,
  refetch,
}) => {
  // Loading state
  const navigation = useNavigation();
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  // Error state
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
          Error fetching hotels
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

  const hotels = data?.data?.data ?? [];

  // Empty state
  if (!hotels.length) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}
      >
        <ActivityIndicator color="blue" size="large" />

        <Text>No hotels found</Text>
      </View>
    );
  }

  const renderFooter = () =>
    isFetchingMore ? (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    ) : null;

  return (
    <FlatList
      data={hotels}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <Destination
          key={item.id}
          item={item}
          name={'selectedHotel'}
          navigation={navigation}
          path="UserHotelBooking"
          screen="UserHotelHotelDetail"
          normal={true}
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

export default HotelComponent;
