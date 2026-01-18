/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';

import SecurityCategory from '@/components/SecurityCategory';
import SecurityNearby from '@/components/SecurityNearby';
import ThemedView from '@/utils/ThemedView';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Title from '@/components/Title';
import GoBackTitle2 from '@/components/GoBackTitle2';
import useT from '@/utils/useT';
import { useGetAllSecurityQuery } from '@/redux/slices/userSlice/securityBookingSlice';
import SingleSecurityBooking from '@/components/SingleSecurityBooking';
import GlobalLoading from '@/components/GlobalLoading';
import GlobalError from '@/components/GlobalError';
import GlobalNoData from '@/components/GlobalNoData';
import { useDebounce } from 'use-debounce';
import { useFormContext } from 'react-hook-form';

export default function SecurityBookingHomeScreen() {
  const navigation = useNavigation();
  const t = useT();
  const [page, setPage] = useState(1);
  const { watch , reset} = useFormContext();
  const [allSecurity, setAllSecurity] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Watch all search parameters including dates
  const searchTerm = watch('searchTermSecurity') || '';
  const bookedFromDate = watch('bookedFromDate');
  const bookedToDate = watch('bookedToDate');

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // Check if any filter is active (excluding pagination)
  const hasActiveFilters = useMemo(() => {
    return (
      debouncedSearchTerm.trim() !== '' ||
      bookedFromDate !== null ||
      bookedToDate !== null
    );
  }, [debouncedSearchTerm, bookedFromDate, bookedToDate]);

  // Check if we have search terms but no results
  const hasSearchTermsButNoResults = useMemo(() => {
    return (
      hasActiveFilters &&
      allSecurity.length === 0 &&
      !securityLoading &&
      !isSecurityFetchingMore
    );
  }, [hasActiveFilters, allSecurity.length, securityLoading, isSecurityFetchingMore]);

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


  console.log('LINE AT 236', searchTerm);
  

  const {
    data: securityData,
    isLoading: securityLoading,
    isFetching: isSecurityFetchingMore,
    isError: securityError,
    refetch,
  } = useGetAllSecurityQuery(searchParams, {
    // refetchOnMountOrArgChange: true,
  });

  console.log('LINE AT 57', allSecurity, page, searchParams);

  // Merge unique Security by ID
  // useEffect(() => {
  //   if (securityData?.data?.data) {
  //     setAllSecurity(prevSecurity => {
  //       if (page === 1) {
  //         return securityData?.data?.data;
  //       } else {
  //         const existingIds = new Set(prevSecurity.map(h => h.id));
  //         const newSecurity = securityData?.data?.data.filter(
  //           h => !existingIds.has(h.id),
  //         );
  //         return [...prevSecurity, ...newSecurity];
  //       }
  //     });
  //     if (refreshing) setRefreshing(false);
  //   }
  // }, [securityData, page, refreshing]);

  // Reset to page 1 when search params change (excluding page changes)
  useEffect(() => {
    setPage(1);
    setAllSecurity([]);
  }, [debouncedSearchTerm, bookedFromDate, bookedToDate]);

  const loadMoreSecurity = () => {
    const totalSecurity = securityData?.data?.meta?.total ?? 0;
    console.log('LINE AT 79', totalSecurity, allSecurity?.length);

    if (!isSecurityFetchingMore && allSecurity.length < totalSecurity) {
      setPage(prev => prev + 1);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    refetch();
  }, [refetch]);

  const renderFooter = () => {
    if (!isSecurityFetchingMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  };

    //  useEffect(() => {
    //     // Reset the form to clear all fields
    //     reset({
    //       bookedFromDate: null,
    //       bookedToDate: null,
    //       searchTerm:''
    //     });
    
    //   }, []);

  // Render empty component based on different states
  const renderEmptyComponent = () => {
    if (securityLoading || isSecurityFetchingMore) {
      return null; // Don't show empty state while loading
    }

    if (hasSearchTermsButNoResults) {
      return (
        <View style={{ alignItems: 'center', paddingVertical: 40 }}>
          <GlobalNoData 
            title={t('securityBooking.noResults') || 'No security services found'}
            message={t('securityBooking.tryDifferentSearch') || 'Try adjusting your search criteria'}
          />
        </View>
      );
    }

    if (!securityLoading && !securityError && !allSecurity?.length) {
      return <GlobalNoData />;
    }

    return null;
  };

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(5),
      }}
    >
      <GoBackTitle2
        navigation={navigation}
        title={t('securityBooking.allSecurity')}
      />

      <FlatList
        data={allSecurity}
        renderItem={({ item }) => (
          <SingleSecurityBooking
            key={item.id}
            booking={item}
            path="UserSingleSecurity"
          />
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(2),
          gap: responsiveHeight(2),
          flexGrow: 1, // Ensure empty state is properly centered
        }}
        onEndReached={loadMoreSecurity}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <View
            style={{
              gap: responsiveHeight(2),
            }}
          >
            <SecurityCategory />

            <View className="gap-2">
              <Title title={t('securityBooking.popular')} />
              <SecurityNearby />
            </View>

            {/* Show loading/error states only when there are no active filters */}
            {!hasActiveFilters && securityLoading && <GlobalLoading />}
            {!hasActiveFilters && securityError && <GlobalError refetch={refetch} />}
          </View>
        }
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={renderEmptyComponent}
      />
    </ThemedView>
  );
}