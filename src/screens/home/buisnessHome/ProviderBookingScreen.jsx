import { View, Text, FlatList } from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedView from '../../../utils/ThemedView';
import GoBack from '../../../components/GoBack';
import { useNavigation } from '@react-navigation/native';
import ThemedText from '../../../utils/ThemedText';
import { providerBookings } from '../../../../assets/data/data';
import ProviderBookingCard from '../../../components/ProviderBookingCard';

const ProviderBookingScreen = () => {
  const navigation = useNavigation();
  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(5),
        gap: responsiveHeight(5),
      }}
    >
      <View className="flex-row gap-10 items-center">
        <GoBack navigation={navigation} />
        <ThemedText styles="text-xl font-SemiBold">Bookings</ThemedText>
      </View>
      <FlatList
        data={providerBookings}
        renderItem={({ item }) => (
          <ProviderBookingCard
          key={item.id}
          item={item}
          name={'selectedActiveListing'}
          navigation={navigation}
          path="ProviderActiveListingDetail"
          onAccept={() => console.log('Accepted:', 'booking.bookingId')}
            onReject={() => console.log('Rejected:', 'booking.bookingId')}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(2),
          gap: responsiveHeight(2),
        }}
      />
    </ThemedView>
  );
};

export default ProviderBookingScreen;
