import { View, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import { useGetProviderHotelBookingQuery } from "@/redux/slices/providerSlice/hotelSlice";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import ThemedText from "@/utils/ThemedText";
import ProviderBookingCard from "@/components/ProviderBookingCard";

const ProviderHotelBookingScreen = () => {
  const navigation = useNavigation();
  const {
    data: allProviderBookedHotels,
    isLoading,
    isError,
  } = useGetProviderHotelBookingQuery();

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
        <ThemedText styles="text-xl font-SemiBold">Hotel Bookings</ThemedText>
      </View>
      <FlatList
        data={allProviderBookedHotels?.data || []}
        renderItem={({ item }) => (
          <ProviderBookingCard
            key={item.id}
            item={item}
            onAccept={() => console.log("Accepted:", item.id)}
            onReject={() => console.log("Rejected:", item.id)}
          />
        )}
        ListEmptyComponent={
          <>
            {isLoading && <ActivityIndicator color={"blue"} size={20} />}

            {isError && <ThemedText>No bookings found!</ThemedText>}
            {allProviderBookedHotels?.data?.length <= 0 && (
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

export default ProviderHotelBookingScreen;
