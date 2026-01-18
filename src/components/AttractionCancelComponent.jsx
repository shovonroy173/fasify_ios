/* eslint-disable react-native/no-inline-styles */

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  Pressable,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { responsiveHeight } from 'react-native-responsive-dimensions';

import { useNavigation } from '@react-navigation/native';
import { Controller, useFormContext } from 'react-hook-form';

import { MapPin, Star } from 'lucide-react-native';
import { useGetSingleAttractionAppealQuery } from '@/redux/slices/userSlice/attractionSlice';
import useT from '@/utils/useT';
import ThemedText3 from '@/utils/ThemedText3';
import ThemedText from '@/utils/ThemedText';
import ThemedView from '@/utils/ThemedView';

const TicketCard = ({ item }) => {
  const navigation = useNavigation();
  const t = useT();
  // console.log(item);
  const { control } = useFormContext();
  const {
    data: singleAttractionData,
    isLoading: singleAttractionLoading,
    isFetching: isSingleFetchingMore,
    isError: singleAttractionError,
  } = useGetSingleAttractionAppealQuery(item?.appeal?.id, {
    refetchOnMountOrArgChange: true,
  });
  // console.log('LINE AT 29', singleAttractionData, item);

  return (
    <Controller
      control={control}
      name="selectedCancelAttraction"
      render={({ field: { onChange, value } }) => (
        <ThemedView styles="flex-row p-3 rounded-md border  mb-3">
          <Image
            source={{ uri: singleAttractionData?.data?.attractionImages[0] }}
            className="w-24 h-42 rounded-md"
            resizeMode="cover"
          />
          <View className="flex-1 ml-3 gap-2">
            <ThemedText styles="font-SemiBold text-base">
              {singleAttractionData?.data?.attractionDestinationType}
            </ThemedText>
            <ThemedText3 styles=" text-sm mt-1">
              {singleAttractionData?.data?.attractionDescription}
            </ThemedText3>
            <View className="flex-row gap-[0.5] items-center mt-2">
              {/* <Entypo name="location-pin" size={14} color="gray" /> */}
              <MapPin size={14} color="gray" />
              <ThemedText3 styles=" text-sm mr-2">
                {singleAttractionData?.data?.attractionAddress},
                {singleAttractionData?.data?.attractionCity},{' '}
                {singleAttractionData?.data?.attractionCountry}
              </ThemedText3>
            </View>
            <View className="flex-row gap-[0.5] items-center mt-2">
              <Star size={14} color="#f59e0b" />
              {/* <FontAwesome name="star" size={14} color="#f59e0b" /> */}
              <Text className="text-yellow-600 text-xs ml-1">
                {singleAttractionData?.data?.attractionRating} (
                {singleAttractionData?.data?.attractionReviewCount} reviews)
              </Text>
            </View>
            <ThemedText3 styles="text-sm font-Medium ml-1 w-2/3">
              From {item?.displayCurrency} {item?.totalPrice}
            </ThemedText3>
            <Pressable
              onPress={() => {
                onChange(item);
                navigation.navigate('Booking', {
                  screen: 'CancelAttractionBooking',
                });
              }}
              className="p-2 border border-red-500 rounded-md flex-1 flex-row gap-2 justify-center items-center"
            >
              <ThemedText styles="font-Medium text-sm text-red-500">
                {t('cancel')}
              </ThemedText>
            </Pressable>
          </View>
        </ThemedView>
      )}
    />
  );
};

const AttractionCancelComponent = ({
  data,
  isLoading,
  isError,
  isFetchingMore,
  refresh,
}) => {
  // console.log('LINE AT 254', data);

  const t = useT();
  const [refreshing, setRefreshing] = useState(false);

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
      renderItem={({ item }) => <TicketCard key={item.id} item={item} />}
      keyExtractor={(item, index) => item.id || index.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: responsiveHeight(2), paddingVertical: 8 }}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default AttractionCancelComponent;
