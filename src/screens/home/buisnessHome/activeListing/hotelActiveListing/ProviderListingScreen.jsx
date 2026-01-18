/* eslint-disable react-native/no-inline-styles */
import {
  View,
  // Text,
  FlatList,
  useColorScheme,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
// import Entypo from 'react-native-vector-icons/Entypo';
import ThemedView from '@/utils/ThemedView';
import GoBack from '@/components/GoBack';
import ThemedText from '@/utils/ThemedText';
import ThemedTextColor from '@/utils/ThemedTextColor';
// import { activeListing } from '@/../assets/data/data';
import ActiveListingCard from '@/components/ActiveListingCard';
import { useGetProviderHotelsQuery } from '@/redux/slices/providerSlice/hotelSlice';
import GlobalLoading from '@/components/GlobalLoading';
import GlobalError from '@/components/GlobalError';
import GlobalNoData from '@/components/GlobalNoData';

const ProviderListingScreen = () => {
  const navigation = useNavigation();
  const theme = useColorScheme();
  const [page, setPage] = useState(1);
  const [allHotels, setAllHotels] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: hotelsData,
    isLoading: hotelsLoading,
    isError: hotelsError,
    isFetching: isFetchingMore,
    refetch
  } = useGetProviderHotelsQuery(
    { page },
    {
      // 👇 Ensures it re-fetches when tag is invalidated
      refetchOnMountOrArgChange: true,
    },
  );
  useEffect(() => {
    if (hotelsData?.data?.data) {
      setAllHotels(prevHotels => {
        if (page === 1) {
          return hotelsData.data.data;
        } else {
          const existingIds = new Set(prevHotels.map(h => h.id));
          const newHotels = hotelsData.data.data.filter(
            h => !existingIds.has(h.id),
          );
          return [...prevHotels, ...newHotels];
        }
      });
      if (refreshing) setRefreshing(false);
    }
  }, [hotelsData, page, refreshing]);

  const loadMoreHotels = () => {
    const totalHotels = hotelsData?.data?.meta?.total ?? 0;
    if (!isFetchingMore && allHotels.length < totalHotels) {
      setPage(prev => prev + 1);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
  }, []);

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  };
  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(5),
        gap: responsiveHeight(5),
      }}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row gap-8 items-center">
          <GoBack navigation={navigation} />
          <ThemedText styles="text-lg font-SemiBold">
            All Hotels
          </ThemedText>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate('Active Listings', {
              screen: 'ProviderCreateHotelListing',
            })
          }
          className="flex-row gap-2 items-center"
        >
          {/* <Entypo
            name="plus"
            size={20}
            color={theme === 'dark' ? '#1d4ed8' : '#2563eb'}
          /> */}
          <ThemedTextColor styles="text-lg font-SemiBold">
            Add Hotel
          </ThemedTextColor>
        </Pressable>
      </View>
      <FlatList
        data={allHotels}
        renderItem={({ item }) => (
          <ActiveListingCard
            key={item.id}
            item={item}
            name={'selectedActiveListing'}
            navigation={navigation}
            path="Dashboard"
            screen="ProviderEditHotelListing"
            pathRoom="ProviderHotelDashboardAllRoom"
          />
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(2),
          gap: responsiveHeight(2),
        }}
        onEndReached={loadMoreHotels}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
         ListEmptyComponent={
          <View
            style={{
              gap: responsiveHeight(2),
            }}
          >
           

            {/* Inline loading */}
            {hotelsLoading && <GlobalLoading />}

            {/* Inline error */}
            {hotelsError && <GlobalError refetch={refetch} />}

            {/* Inline empty state */}
            {!hotelsLoading && !hotelsError && !hotelsData?.data?.length && (
              <GlobalNoData />
            )}
          </View>
        }
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </ThemedView>
  );
};

export default ProviderListingScreen;
