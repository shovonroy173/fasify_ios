import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import GoBack from "@/components/GoBack";
import BookUserDetail from "@/components/BookUserDetail";
import BookHotelDetail from "@/components/BookHotelDetail";
import HotelBookingDetail from "@/components/HotelBookingDetail";
import ThemedView from "@/utils/ThemedView";
import { Alert, Pressable, ScrollView } from "react-native";
import ThemedText2 from "@/utils/ThemeText2";
import CancelConfirmationModal from "@/components/CancelConfirmationModal";
import useT from "@/utils/useT";
import {
  useCancelBookingHotelMutation,
  useCancelBookingPaystackHotelMutation,
} from "@/redux/slices/userSlice/hotelbookingSlice";

const UserCancelHotelBookingScreen = ({ route }) => {
  const navigation = useNavigation();
  // const { item } = route.params;
  const {
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useFormContext();
  // console.log("LINE AT 120", item);

  const { selectedCancelHotel: itemData } = getValues();
  const paymentType = itemData?.payment?.[0]?.provider; // "stripe" | "paystack"
  console.log("LINE AT 123", itemData, errors);

  const t = useT();
  const [showModal, setShowModal] = useState(false);

  // two separate cancel mutations
  const [cancelBookingHotel, { isLoading: stripeLoading }] =
    useCancelBookingHotelMutation();
  const [cancelBookingPaystackHotel, { isLoading: paystackLoading }] =
    useCancelBookingPaystackHotelMutation();

  // const handleCancelHotelBooking = async () => {
  //   try {
  //     const cancelData = {
  //       roomId: itemData?.id,
  //       type: "hotel",
  //     };

  //     let response;

  //     if (paymentType === "STRIPE") {
  //       response = await cancelBookingHotel(cancelData).unwrap();
  //       //  setShowModal(false);
  //       // navigation.navigate('BookingMain', { tab: 'hotel' });
  //     } else if (paymentType === "PAYSTACK") {
  //       response = await cancelBookingPaystackHotel(cancelData).unwrap();
  //       //  setShowModal(false);
  //       // navigation.navigate('BookingMain', { tab: 'hotel' });
  //     } else {
  //       throw new Error(`Unsupported payment type: ${paymentType}`);
  //     }

  //     console.log("✅ Cancel response:", response);

  //     if (response.success) {
  //       setShowModal(false);
  //       navigation.navigate("BookingMain", { tab: "hotel" });
  //     }
  //     // maybe navigate back or show success alert here
  //   } catch (error) {
  //     console.log("❌ Cancel error:", error);
  //     setError("hotelCancelError", error);
  //   }
  // };

  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelHotelBooking = async () => {
    // Step 1: Show confirmation dialog
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this hotel booking?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: async () => {
            try {
              setIsCancelling(true);

              // Validate data
              if (!itemData?.id) {
                Alert.alert("Error", "Booking ID is missing");
                return;
              }

              if (!paymentType) {
                Alert.alert("Error", "Payment type is missing");
                return;
              }

              const cancelData = {
                roomId: itemData.id,
                type: "hotel",
              };

              console.log("🔄 Cancelling booking:", cancelData);

              let response;

              // Handle payment types
              if (paymentType === "STRIPE") {
                response = await cancelBookingHotel(cancelData).unwrap();
              } else if (paymentType === "PAYSTACK") {
                response =
                  await cancelBookingPaystackHotel(cancelData).unwrap();
              } else {
                throw new Error(`Unsupported payment type: ${paymentType}`);
              }

              console.log("✅ Cancel response:", response);

              // Check success
              if (response?.success) {
                Alert.alert(
                  "Success",
                  "Your booking has been cancelled successfully.",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        setShowModal(false);
                        navigation.navigate("BookingMain", { tab: "hotel" });
                      },
                    },
                  ]
                );
              } else {
                throw new Error(response?.message || "Cancellation failed");
              }
            } catch (error) {
              console.error("❌ Cancel error:", error);

              // Determine error message
              let errorMessage = "Unable to cancel booking. Please try again.";

              if (error?.status === 404) {
                errorMessage = "Booking not found or already cancelled.";
              } else if (error?.status === 403) {
                errorMessage = "You cannot cancel this booking.";
              } else if (error?.data?.message) {
                errorMessage = error.data.message;
              } else if (error?.message) {
                errorMessage = error.message;
              }

              // Show error
              Alert.alert("Cancellation Failed", errorMessage);

              // Set form error if available
              if (setError) {
                setError("hotelCancelError", {
                  type: "manual",
                  message: errorMessage,
                });
              }
            } finally {
              setIsCancelling(false);
            }
          },
        },
      ]
    );
  };
  const isLoading = stripeLoading || paystackLoading;

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: responsiveHeight(2) }}
      >
        <BookUserDetail />
        <BookHotelDetail item={itemData?.hotel} />
        <HotelBookingDetail item={itemData} itemData={itemData} />

        {/* <Text className="text-red-500">{errors && errors?.root?.message}</Text> */}

        <Pressable
          onPress={() => setShowModal(true)}
          className="rounded-lg p-3 bg-red-500 flex-row items-center justify-center gap-2"
        >
          <ThemedText2 styles="text-center font-SemiBold text-lg">
            {t("cancel")}
          </ThemedText2>
        </Pressable>
      </ScrollView>
      <CancelConfirmationModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleSubmit(handleCancelHotelBooking)}
        isLoading={isLoading}
      />
    </ThemedView>
  );
};

export default UserCancelHotelBookingScreen;
