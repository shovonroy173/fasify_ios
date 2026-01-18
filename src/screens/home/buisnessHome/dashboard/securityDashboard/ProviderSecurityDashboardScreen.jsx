/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  // Text,
  Image,
  useColorScheme,
  Pressable,
  // ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';
import { useThemeColor } from '@/utils/useThemeColor';
import { useNavigation } from '@react-navigation/native';
// import { useFormContext } from 'react-hook-form';
import ThemedView from '@/utils/ThemedView';
import ThemedText from '@/utils/ThemedText';
import SalesChart from '@/components/DefaultBar';
// import ThemedText3 from '@/utils/ThemedText3';
// import { securityRecentBookings } from '@/../assets/data/data';
// import SingleSecurityBookingDefault from '@/components/SingleSecurityBookingDefault';
import ThemedViewLightBlue from '@/utils/ThemedViewLightBlue';
import { useGetProviderSecurityQuery } from '@/redux/slices/providerSlice/securitySlice';
import ActiveListingSecurityCard from '@/components/ActiveListingSecurityCard';
import {
  useGetAllStaticsSecurityQuery,
  useGetProviderProfileQuery,
} from '@/redux/slices/authSlice';
import { Bell } from 'lucide-react-native';

const ProviderSecurityDashboardScreen = () => {
  const theme = useColorScheme();
  const { icon2 } = useThemeColor();
  const navigation = useNavigation();

  const [page, setPage] = useState(1);
  const [allSecurities, setAllSecurities] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: profileData,
    // isLoading: profileLoading,
    // isError: profileError,
  } = useGetProviderProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: securityData,
    // isLoading: securityLoading,
    isFetching: isFetchingMore,
    // isError: securityError,
  } = useGetProviderSecurityQuery(
    { page },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const {
    data: allStatics,
    isLoading,
    isError,
  } = useGetAllStaticsSecurityQuery();

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

  console.log('LINE AT 89', securityData);

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
        paddingBottom: responsiveHeight(2),
        gap: responsiveHeight(5),
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <Image
            source={require('assets/images/user.png')}
            style={{
              width: responsiveWidth(13),
              height: responsiveWidth(13),
              borderRadius: 100,
              borderWidth: 1,
              borderColor: theme === 'dark' ? '#000000' : '#ffffff',
            }}
          />
          <View>
            <ThemedText styles="font-Regular text-md">Welcome</ThemedText>
            <ThemedText styles="font-Bold text-xl">
              {profileData?.data?.fullName || profileData?.data?.email.split('@')[0]}
            </ThemedText>
          </View>
        </View>

        <Pressable onPress={() => navigation.navigate('UserNotification')}>
          <ThemedViewLightBlue styles="p-2 rounded-full">
            {/* <Ionicons name="notifications-outline" size={24} color={icon2} /> */}
            
            <Bell size={24} color={icon2} />
          </ThemedViewLightBlue>
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
            path="ProviderEditSecurityBusiness"
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
        ListHeaderComponent={
          <SalesChart
            allStatics={allStatics}
            isLoading={isLoading}
            isError={isError}
          />
        }
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      {/* </View> */}
      {/* </ScrollView> */}
    </ThemedView>
  );
};

export default ProviderSecurityDashboardScreen;
