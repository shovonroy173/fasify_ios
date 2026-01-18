/* eslint-disable react-native/no-inline-styles */
import {
  View,
  // Text,
  FlatList,
  useColorScheme,
  Pressable,
  // ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
// import Entypo from 'react-native-vector-icons/Entypo';
// import { securityRecentBookings } from '@/../assets/data/data';
// import SingleSecurityBookingDefault from '@/components/SingleSecurityBookingDefault';
import ThemedView from '@/utils/ThemedView';
import GoBack from '@/components/GoBack';
import ThemedText from '@/utils/ThemedText';
import ThemedTextColor from '@/utils/ThemedTextColor';
import { useGetProviderSecurityQuery } from '@/redux/slices/providerSlice/securitySlice';
import ActiveListingSecurityCard from '@/components/ActiveListingSecurityCard';

const ProviderSecurityListingScreen = () => {
  const navigation = useNavigation();
  const theme = useColorScheme();
  const [page, setPage] = useState(1);
  const [allSecurities, setAllSecurities] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: securityData,
    isLoading: securityLoading,
    isFetching: isFetchingMore,
    isError: securityError,
  } = useGetProviderSecurityQuery(
    { page },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  // Merge unique security by ID
  useEffect(() => {
    if (securityData?.data?.data) {
      setAllSecurities(prevSecurity => {
        if (page === 1) {
          return securityData.data.data;
        } else {
          const existingIds = new Set(prevSecurity.map(h => h.id));
          const newSecurity = securityData.data.data.filter(
            h => !existingIds.has(h.id),
          );
          return [...prevSecurity, ...newSecurity];
        }
      });
      if (refreshing) setRefreshing(false);
    }
  }, [securityData, page, refreshing]);

  const loadMoreSecurities = () => {
    const totalSecurities = securityData?.data?.meta?.total ?? 0;
    if (!isFetchingMore && allSecurities.length < totalSecurities) {
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
            All Business
          </ThemedText>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate('Active Listings', {
              screen: 'ProviderCreateSecurityListing',
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
        data={allSecurities}
        renderItem={({ item }) => (
          <ActiveListingSecurityCard
            key={item.id}
            item={item}
            name={'selectedActiveListingSecurity'}
            navigation={navigation}
            path="Dashboard"
            screen="ProviderEditSecurityBusiness"
            pathListing="ProviderAllSecurityListing"
          />
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(2),
          gap: responsiveHeight(2),
        }}
        onEndReached={loadMoreSecurities}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          securityLoading ? (
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
          ) : securityError ? (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <ThemedText>Internal Error</ThemedText>
            </View>
          ) : (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <ThemedText>No service found.</ThemedText>
            </View>
          )
        }
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </ThemedView>
  );
};

export default ProviderSecurityListingScreen;
