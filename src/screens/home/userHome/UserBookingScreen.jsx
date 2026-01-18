/* eslint-disable react-native/no-inline-styles */

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import ThemedView from '@/utils/ThemedView';
import useT from '@/utils/useT';
import GoBackTitle2 from '@/components/GoBackTitle2';

// Booking Components
import HotelBookingComponent from '@/components/HotelBookingComponent';
import CancelCarComponent from '@/components/CancelCarComponent';
import SecurityCancelBooking from '@/components/SecurityCancelBooking';
import AttractionCancelComponent from '@/components/AttractionCancelComponent';

// Redux queries
import { useGetAllHotelBookingQuery } from '@/redux/slices/userSlice/hotelbookingSlice';
import { useGetAllCarBookingQuery } from '@/redux/slices/userSlice/carBookingSlice';
import { useGetAllSecurityBookingQuery } from '@/redux/slices/userSlice/securityBookingSlice';
import { useGetAllAttractionBookingQuery } from '@/redux/slices/userSlice/attractionSlice';

const TAB_IDS = {
  HOTEL: 'hotel',
  CAR: 'car',
  SECURITY: 'security',
  ATTRACTION: 'attraction',
};

const TAB_OPTIONS = [
  { id: TAB_IDS.HOTEL, label: 'tab.hotel' },
  { id: TAB_IDS.CAR, label: 'tab.car' },
  { id: TAB_IDS.SECURITY, label: 'tab.security' },
  { id: TAB_IDS.ATTRACTION, label: 'tab.attraction' },
];

const UserBookingScreen = () => {
  const navigation = useNavigation();
  const t = useT();
  const [activeTab, setActiveTab] = useState(TAB_IDS.HOTEL);

  const route = useRoute();

  // console.log('LINE AT 135', route?.params?.tab);

  useEffect(() => {
    if (route?.params?.tab) {
      setActiveTab(route?.params?.tab);
    } else {
      setActiveTab(TAB_IDS.HOTEL);
    }
  }, [route]);

  // Queries for all tabs
  const hotelQuery = useGetAllHotelBookingQuery(undefined, {
    // refetchOnMountOrArgChange: true,
  });

  const carQuery = useGetAllCarBookingQuery(undefined, {
    // refetchOnMountOrArgChange: true,
  });
  const securityQuery = useGetAllSecurityBookingQuery(undefined, {
    // refetchOnMountOrArgChange: true,
  });
  const attractionQuery = useGetAllAttractionBookingQuery(undefined, {
    // refetchOnMountOrArgChange: true,
  });

  // console.log('LIN EAT 137', hotelQuery?.data);

  const renderActiveTab = () => {
    switch (activeTab) {
      case TAB_IDS.HOTEL:
        return (
          <HotelBookingComponent
            data={hotelQuery?.data}
            isLoading={hotelQuery?.isLoading}
            isError={hotelQuery?.isError}
            isFetchingMore={hotelQuery?.isFetching}
            refresh={hotelQuery?.refetch}
          />
        );
      case TAB_IDS.CAR:
        return (
          <CancelCarComponent
            data={carQuery?.data}
            isLoading={carQuery?.isLoading}
            isError={carQuery?.isError}
            isFetchingMore={carQuery?.isFetching}
            refresh={carQuery?.refetch}
          />
        );
      case TAB_IDS.SECURITY:
        return (
          <SecurityCancelBooking
            data={securityQuery?.data}
            isLoading={securityQuery?.isLoading}
            isError={securityQuery?.isError}
            isFetchingMore={securityQuery?.isFetching}
            refresh={securityQuery?.refetch}
          />
        );
      case TAB_IDS.ATTRACTION:
        return (
          <AttractionCancelComponent
            data={attractionQuery?.data}
            isLoading={attractionQuery?.isLoading}
            isError={attractionQuery?.isError}
            isFetchingMore={attractionQuery?.isFetching}
            refresh={attractionQuery?.refetch}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(5),
        gap: responsiveHeight(2),
      }}
    >
      <GoBackTitle2 navigation={navigation} title={t('booking')} />

      {/* Tab Bar */}
      <ThemedView styles="flex-row gap-2 flex-wrap">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: responsiveWidth(2) }}
        >
          {TAB_OPTIONS.map(tab => (
            <Pressable
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              className={`px-2 py-2 rounded-lg items-center ${
                activeTab === tab.id
                  ? 'bg-primary dark:bg-primary_dark'
                  : 'bg-zinc-200 dark:bg-zinc-800'
              }`}
            >
              <Text
                className={`font-semibold text-sm ${
                  activeTab === tab.id ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {t(tab.label)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </ThemedView>

      {/* Active Tab Content */}
      <View style={{ flex: 1 }}>{renderActiveTab()}</View>
    </ThemedView>
  );
};

export default UserBookingScreen;
