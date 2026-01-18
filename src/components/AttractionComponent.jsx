/* eslint-disable react-native/no-inline-styles */


import React from 'react';
import { View, FlatList, ActivityIndicator, Text, Pressable, Pressable as RNPressable, Image } from 'react-native';
import ThemedText from '../utils/ThemedText';
// import Feather from 'react-native-vector-icons/Feather';
import ThemedView from '../utils/ThemedView';
import { useNavigation } from '@react-navigation/native';

const AttractionComponent = ({
  data,
  isLoading,
  isError,
  isFetchingMore,
  onRefresh,
  loadMore,
  refreshing,
}) => {
  const navigation = useNavigation();

  if (isLoading) return <ActivityIndicator size="large" color="blue" />;

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text style={{ color: 'red', fontSize: 16 }}>Error fetching attractions</Text>
        <Pressable onPress={onRefresh} style={{ marginTop: 10, padding: 10, backgroundColor: 'blue', borderRadius: 8 }}>
          <Text style={{ color: 'white' }}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  const attractionsByCountry = data?.data?.data ?? {};
  const flatListData = Object.keys(attractionsByCountry).map(key => ({
    key,
    items: attractionsByCountry[key],
    length: attractionsByCountry[key].length,
  }));

  if (!flatListData.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text>No attractions found</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <RNPressable
      className="w-[48%] rounded-lg overflow-hidden"
      style={{
        shadowColor: '#a1a1aa',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 12,
      }}
      onPress={() =>
        navigation.navigate('UserAttractionBooking', {
          screen: 'UserAttractionAllTicket',
          params: { item: item.items },
        })
      }
    >
      <ThemedView>
        <Image
          source={{ uri: item?.items?.[0]?.attractionImages[0] }}
          className="w-full h-24"
          resizeMode="cover"
        />
        <View className="p-2">
          <View className="flex-row items-center gap-1">
            {/* <Feather name="map-pin" size={12} color="gray" /> */}
            <ThemedText styles="text-sm font-Medium">{item.key}</ThemedText>
          </View>
          <Text className="text-xs text-gray-500">{item.length} things to do</Text>
        </View>
      </ThemedView>
    </RNPressable>
  );

  const renderFooter = () => isFetchingMore && <ActivityIndicator color="blue" size="large" style={{ paddingVertical: 20 }} />;

  return (
    <FlatList
      data={flatListData}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 16 }}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default AttractionComponent;
