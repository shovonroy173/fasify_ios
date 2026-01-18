import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React from "react";
import { useGetAllHotelBookingQuery } from "@/redux/slices/userSlice/hotelbookingSlice";
import { useGetAllCarBookingQuery } from "@/redux/slices/userSlice/carBookingSlice";
import { useGetAllSecurityBookingQuery } from "@/redux/slices/userSlice/securityBookingSlice";
import { useGetAllAttractionBookingQuery } from "@/redux/slices/userSlice/attractionSlice";
import ThemedText from "@/utils/ThemedText";
import ThemedView from "@/utils/ThemedView";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import GoBack from "@/components/GoBack";
import { useNavigation } from "@react-navigation/native";

// Reusable booking card
const BookingCard = ({ item }) => {
  console.log("lINE AT 10", item);
  const name =
    item?.hotel?.hotelBusinessName ||
    item?.security?.securityName ||
    item?.car?.carName ||
    item?.attraction?.attractionName;
  return (
    <View className="mb-3 p-4 rounded-xl bg-gray-50 shadow">
      <Text className="text-lg font-semibold mb-1">
        {item?.title || item?.name || name}
      </Text>
      <Text className="text-gray-600 text-sm mb-1">ID: {item?._id}</Text>

      {item?.date || item?.createdAt ? (
        <Text className="text-gray-500 text-sm mb-1">
          Date: {new Date(item?.date || item?.createdAt).toLocaleDateString()}
        </Text>
      ) : null}

      {item?.totalPrice ? (
        <Text className="text-gray-800 font-medium">
          Price: ${item?.totalPrice}
        </Text>
      ) : null}

      {item?.bookingStatus ? (
        <Text
          className={`mt-1 text-sm font-bold ${
            item?.bookingStatus === "CONFIRMED"
              ? "text-green-600"
              : item?.bookingStatus === "PENDING"
                ? "text-yellow-600"
                : "text-red-600"
          }`}
        >
          Status: {item?.bookingStatus}
        </Text>
      ) : null}
    </View>
  );
};

// Reusable section renderer
const BookingSection = ({ title, query }) => {
  console.log("LINE AT 55", query, title, query.data?.data?.length);

  if (query.isLoading || query.isFetching) {
    return (
      <View className="mt-4">
        <Text className="text-lg font-semibold mb-2">{title}</Text>
        <ActivityIndicator size="small" />
        <Text className="text-gray-500">Loading {title.toLowerCase()}...</Text>
      </View>
    );
  }

  if (query.isError) {
    return (
      <View className="mt-4">
        <Text className="text-lg font-semibold mb-2">{title}</Text>
        <Text className="text-red-500">
          Error loading {title.toLowerCase()}
        </Text>
      </View>
    );
  }

  if (query.data?.data?.length <= 0) {
    return (
      <View className="mt-4">
        <Text className="text-lg font-semibold mb-2">{title}</Text>
        <Text className="text-gray-400">No {title.toLowerCase()} found.</Text>
      </View>
    );
  }

  return (
    <View className="mt-4">
      <Text className="text-lg font-semibold mb-2">{title}</Text>
      {query?.data?.data.map((item, index) => (
        <BookingCard key={item._id || index} item={item} />
      ))}
    </View>
  );
};

const UserMyOrdersScreen = () => {
  const hotelQuery = useGetAllHotelBookingQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const carQuery = useGetAllCarBookingQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const securityQuery = useGetAllSecurityBookingQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const attractionQuery = useGetAllAttractionBookingQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const navigation = useNavigation();
  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(5),
        gap: responsiveHeight(2),
      }}
    >
      <GoBack navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedText styles="text-xl font-bold mb-4">My Orders</ThemedText>

        <BookingSection title="Hotel Bookings" query={hotelQuery} />
        <BookingSection title="Car Bookings" query={carQuery} />
        <BookingSection title="Security Bookings" query={securityQuery} />
        <BookingSection title="Attraction Bookings" query={attractionQuery} />
      </ScrollView>
    </ThemedView>
  );
};

export default UserMyOrdersScreen;
