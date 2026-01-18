import { View, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import { useGetProviderSecurityBookingQuery } from "@/redux/slices/providerSlice/securitySlice";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import ProviderBookingCard from "@/components/ProviderBookingCard";
import ThemedText from "@/utils/ThemedText";
// import ThemedView from '../../../utils/ThemedView';
// import GoBack from '../../../components/GoBack';
// import ThemedText from '../../../utils/ThemedText';
// import ProviderBookingCard from '../../../components/ProviderBookingCard';
// import { useGetProviderSecurityBookingQuery } from '../../../redux/slices/providerSlice/securitySlice';

const ProviderSecurityBookingScreen = () => {
  const navigation = useNavigation();
  const {
    data: allProviderBookedSecurity,
    isLoading,
    isError,
  } = useGetProviderSecurityBookingQuery();
  console.log("LINE AT 21", allProviderBookedSecurity);

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
        <ThemedText styles="text-xl font-SemiBold">
          Security Bookings
        </ThemedText>
      </View>
      <FlatList
        data={allProviderBookedSecurity?.data}
        renderItem={({ item }) => (
          <ProviderBookingCard
            key={item.id}
            item={item}
            name={"selectedActiveListing"}
            navigation={navigation}
            path="ProviderActiveListingDetail"
            onAccept={() => console.log("Accepted:", "booking.bookingId")}
            onReject={() => console.log("Rejected:", "booking.bookingId")}
          />
        )}
        ListEmptyComponent={
          <>
            {isLoading && <ActivityIndicator color={"blue"} size={20} />}

            {isError && <ThemedText>No bookings found</ThemedText>}
            {allProviderBookedSecurity?.data?.length <= 0 && (
              <ThemedText>No bookings found!</ThemedText>
            )}
          </>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(2),
          gap: responsiveHeight(2),
        }}
      />
    </ThemedView>
  );
};

export default ProviderSecurityBookingScreen;
