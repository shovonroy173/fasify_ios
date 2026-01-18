import { View, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import { useGetProviderCarBookingQuery } from "@/redux/slices/providerSlice/carSlice";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import ThemedText from "@/utils/ThemedText";
import ProviderBookingCard from "@/components/ProviderBookingCard";
// import ThemedView from '../../../utils/ThemedView';
// import GoBack from '../../../components/GoBack';
// import ThemedText from '../../../utils/ThemedText';
// import ProviderBookingCard from '../../../components/ProviderBookingCard';
// import { useGetProviderCarBookingQuery } from '../../../redux/slices/providerSlice/carSlice';

const ProviderCarBookingScreen = () => {
  const navigation = useNavigation();
  const {
    data: allProviderBookedCars,
    isLoading,
    isError,
  } = useGetProviderCarBookingQuery();
  console.log(isError, "LINE AT21", allProviderBookedCars);

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
        <ThemedText styles="text-xl font-SemiBold">Car Bookings</ThemedText>
      </View>
      <FlatList
        data={allProviderBookedCars?.data || []}
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
            {allProviderBookedCars?.data?.length <= 0 && (
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

export default ProviderCarBookingScreen;
