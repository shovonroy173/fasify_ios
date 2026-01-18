
/* eslint-disable react-native/no-inline-styles */
import { View, FlatList, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ThemedView from '@/utils/ThemedView';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AvailableCar from '@/components/AvailableCar';
import GoBackTitle2 from '@/components/GoBackTitle2';
import useT from '@/utils/useT';
import { useFormContext } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { useGetAllCarQuery } from '@/redux/slices/userSlice/carBookingSlice';
import GlobalLoading from '@/components/GlobalLoading';
import GlobalError from '@/components/GlobalError';
import GlobalNoData from '@/components/GlobalNoData';

const CarBookingAvailableScreen = () => {
  const navigation = useNavigation();
  const t = useT();
  const { watch } = useFormContext();
  const [page, setPage] = useState(1);
  const [allCars, setAllCars] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Watch all search parameters including dates
  const searchTerm = watch('searchTermCar') || '';
  const bookedFromDate = watch('carBookedFromDate');
  const bookedToDate = watch('carBookedToDate');

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // Create search params object - only include filters that have values
  const searchParams = useMemo(() => {
    const params = {
      page: page.toString(),
      limit: '10',
    };

    // Only include searchTerm if it has meaningful content
    if (debouncedSearchTerm.trim() !== '') {
      params.searchTerm = debouncedSearchTerm.trim();
    }

    // Only include dates if they are selected
    if (bookedFromDate) {
      params.fromDate = bookedFromDate;
    }
    if (bookedToDate) {
      params.toDate = bookedToDate;
    }

    return params;
  }, [debouncedSearchTerm, bookedFromDate, bookedToDate, page]);

  const {
    data: carsData,
    isLoading: carsLoading,
    isFetching: isFetchingMore,
    isError: carsError,
    refetch,
  } = useGetAllCarQuery(searchParams, {
    refetchOnMountOrArgChange: true,
  });

  // Merge unique cars by ID
  useEffect(() => {
    if (carsData?.data?.data) {
      setAllCars(prevCars => {
        if (page === 1) {
          return carsData.data.data;
        } else {
          const existingIds = new Set(prevCars.map(h => h.id));
          const newCars = carsData?.data?.data?.filter(
            h => !existingIds.has(h.id),
          );
          return [...prevCars, ...newCars];
        }
      });
      if (refreshing) setRefreshing(false);
    }
  }, [carsData, page, refreshing]);

  // Reset to page 1 when search params change (excluding page changes)
  useEffect(() => {
    setPage(1);
    setAllCars([]);
  }, [debouncedSearchTerm, bookedFromDate, bookedToDate]);

  const loadMoreCars = () => {
    const totalCars = carsData?.data?.meta?.total ?? 0;
    // console.log('LINE AT 79', totalcars);

    if (!isFetchingMore && allCars.length < totalCars) {
      setPage(prev => prev + 1);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    refetch();
  }, [refetch]);

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  };

  console.log('LINE AT 247', carsData , bookedFromDate , bookedToDate);
  
  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(2),
      }}
    >
      <GoBackTitle2 navigation={navigation} title={t('availableCars')} />

      <FlatList
        data={allCars}
        renderItem={({ item }) => (
          <AvailableCar
            key={item.id}
            item={item}
            name="selectedCar"
            navigation={navigation}
            path="UserCarDetail"
          />
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: responsiveHeight(2),
        }}
        onEndReached={loadMoreCars}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <View>
            {carsLoading && <GlobalLoading />}

            {carsError && <GlobalError refetch={refetch} />}

            {!carsLoading && !carsError && !allCars?.length && <GlobalNoData />}
          </View>
        }
      />
    </ThemedView>
  );
};

export default CarBookingAvailableScreen;
