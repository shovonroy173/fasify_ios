/* eslint-disable react-native/no-inline-styles */
import {
  View,
  //   Text,
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

import { useGetProviderSecurityListingQuery } from '@/redux/slices/providerSlice/securitySlice';
import ActiveListingSecurityGuardCard from '@/components/ActiveListingSecurityGuardCard';

const ProviderAllSecurityListingScreen = ({ route }) => {
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
  } = useGetProviderSecurityListingQuery(
    { id: route?.params?.id },
    {
      // 👇 Ensures it re-fetches when tag is invalidated
      refetchOnMountOrArgChange: true,
    },
  );

  console.log('LINE AT 44', route.params, hotelsData);

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
          <ThemedText styles="text-lg font-SemiBold">All Listing</ThemedText>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate('Dashboard', {
              screen: 'ProviderAddSecurityListing',
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
            Add Guard
          </ThemedTextColor>
        </Pressable>
      </View>
      <FlatList
        data={allHotels}
        renderItem={({ item }) => (
          <ActiveListingSecurityGuardCard
            key={item.id}
            item={item}
            name={'selectedActiveListingSecurityGuard'}
            navigation={navigation}
            path="Dashboard"
            screen="ProviderEditSecurityListing"
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
        ListEmptyComponent={
          hotelsLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 40,
              }}
            >
              <ActivityIndicator size="large" color="blue" />
            </View>
          ) : hotelsError ? (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <ThemedText>Internal Error</ThemedText>
            </View>
          ) : (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <ThemedText>No service found.</ThemedText>
            </View>
          )
        }
        // ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </ThemedView>
  );
};

export default ProviderAllSecurityListingScreen;
