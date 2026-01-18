import { View, Text, FlatList } from 'react-native';
import React from 'react';
import ThemedView from '@/utils/ThemedView';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedText from '@/utils/ThemedText';
import GoBack from '@/components/GoBack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { destinations } from 'assets/data/data';
import Destination from '@/components/Destination';
import { useGetPopularHotelsQuery } from '@/redux/slices/userSlice/hotelbookingSlice';

const HotelBookingAllHotelScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  // console.log(route);
  const {
    data: popularHotelsData,
    isLoading: popularHotelsLoading,
    isFetching: ispopularFetchingMore,
    isError: popularHotelsError,
  } = useGetPopularHotelsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(5),
      }}
    >
      <GoBack navigation={navigation} />
      <ThemedText styles="font-SemiBold text-2xl">{params}</ThemedText>
      <FlatList
        data={popularHotelsData?.data}
        // horizontal
        renderItem={({ item }) => (
          <Destination
            key={item.id}
            item={item}
            name={'selectedHotel'}
            navigation={navigation}
            path="UserHotelBooking"
            screen="UserHotelHotelDetail"
            // type="popular"
          />
        )}
        // keyExtractor={(item, index) => item.id || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // paddingHorizontal: responsiveWidth(6),
          // paddingVertical: responsiveHeight(3),
          gap: responsiveHeight(2),
        }}
        // onEndReached={loadMoreHotels}
        onEndReachedThreshold={0.5}
        // refreshing={refreshing}
      />
    </ThemedView>
  );
};

export default HotelBookingAllHotelScreen;
