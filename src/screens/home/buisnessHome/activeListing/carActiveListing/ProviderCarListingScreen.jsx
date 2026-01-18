/* eslint-disable react-native/no-inline-styles */
import {
  View,
  FlatList,
  // useColorScheme,
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
import { useGetProviderCarQuery } from '@/redux/slices/providerSlice/carSlice';
import ActiveListingCarCard from '@/components/ActiveListingCarCard';

const ProviderCarListingScreen = () => {
  const navigation = useNavigation();
  // const theme = useColorScheme();
  const [page, setPage] = useState(1);
  const [allCars, setAllCars] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: carsData,
    // isLoading: carsLoading,
    isFetching: isFetchingMore,
    // isError: carsError,
  } = useGetProviderCarQuery(
    { page },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  // console.log('LINE AT 64', carsData);

  // Merge unique cars by ID
  useEffect(() => {
    if (carsData?.data?.data) {
      setAllCars(prevCars => {
        if (page === 1) {
          return carsData?.data?.data;
        } else {
          const existingIds = new Set(prevCars.map(h => h?.id));
          const newCars = carsData?.data?.data.filter(
            h => !existingIds.has(h?.id),
          );
          return [...prevCars, ...newCars];
        }
      });
      if (refreshing) setRefreshing(false);
    }
  }, [carsData, page, refreshing]);

  const loadMoreCars = () => {
    const totalCars = carsData?.data?.meta?.total ?? 0;
    if (!isFetchingMore && allCars.length < totalCars) {
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
          <ThemedText styles="text-lg font-SemiBold">All Business</ThemedText>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate('Active Listings', {
              screen: 'ProviderCreateCarListing',
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
            Add New
          </ThemedTextColor>
        </Pressable>
      </View>

      <FlatList
        data={allCars}
        renderItem={({ item }) => (
          <ActiveListingCarCard
            key={item.id}
            item={item}
            name={'selectedActiveListingCar'}
            navigation={navigation}
            path="Dashboard"
            screen="ProviderEditCarBusiness"
            pathListing="ProviderAllCarListing"
          />
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(2),
          gap: responsiveHeight(2),
        }}
        onEndReached={loadMoreCars}
        onEndReachedThreshold={0.5}
        // ListHeaderComponent={<SalesChart />}
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </ThemedView>
  );
};

export default ProviderCarListingScreen;
