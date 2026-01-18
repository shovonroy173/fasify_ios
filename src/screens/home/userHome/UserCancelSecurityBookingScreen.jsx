// /* eslint-disable react-native/no-inline-styles */
// import React, { useState } from "react";
// import { View, Text, Image, Pressable } from "react-native";
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from "react-native-responsive-dimensions";

// import { useNavigation } from "@react-navigation/native";
// import ThemedView from "@/utils/ThemedView";
// import GoBack from "@/components/GoBack";
// import ThemedText from "@/utils/ThemedText";
// import ThemedText2 from "@/utils/ThemeText2";
// import ThemedText3 from "@/utils/ThemedText3";
// import CancelConfirmationModal from "@/components/CancelConfirmationModal";
// import useT from "@/utils/useT";
// import { useFormContext } from "react-hook-form";
// // import Icon from 'react-native-vector-icons/Ionicons';
// import {
//   useCancelBookingPaystackSecurityMutation,
//   useCancelBookingSecurityMutation,
// } from "@/redux/slices/userSlice/securityBookingSlice";

// const UserCancelSecurityBookingScreen = () => {
//   const navigation = useNavigation();
//   const [showModal, setShowModal] = useState(false);
//   const t = useT();
//   const { getValues, handleSubmit } = useFormContext();

//   const { selectedCancelSecurity: item } = getValues();
//   const paymentType = item?.payment?.[0]?.provider;
//   console.log("LINE AT 33", item, paymentType);
//   const [cancelBookingSecurity, { isLoading: stripeSecurityLoading }] =
//     useCancelBookingSecurityMutation();
//   const [
//     cancelBookingPaystackSecurity,
//     { isLoading: paystackSecurityLoading },
//   ] = useCancelBookingPaystackSecurityMutation();

//   console.log("LINE AT 40", item);

//   const handleCancelSecurityBooking = async () => {
//     try {
//       const cancelData = {
//         securityId: item?.id,
//         type: "security",
//       };

//       let response;

//       if (paymentType === "STRIPE") {
//         response = await cancelBookingSecurity(cancelData).unwrap();
//       } else if (paymentType === "PAYSTACK") {
//         response = await cancelBookingPaystackSecurity(cancelData).unwrap();
//       } else {
//         throw new Error(`Unsupported payment type: ${paymentType}`);
//       }

//       console.log("✅ Cancel security response:", response);
//       if (response?.success) {
//         setShowModal(!showModal);
//         navigation.navigate("BookingMain", { tab: "security" });
//       }
//     } catch (error) {
//       console.log("❌ Cancel security error:", error);
//     }
//   };

//   const securityIsLoading = stripeSecurityLoading || paystackSecurityLoading;
//   return (
//     <ThemedView
//       styles="flex-1"
//       style={{
//         paddingHorizontal: responsiveWidth(6),
//         paddingVertical: responsiveHeight(5),
//         gap: responsiveHeight(5),
//       }}
//     >
//       <GoBack navigation={navigation} />

//       <View
//         className="flex-1 "
//         style={{
//           gap: responsiveHeight(3),
//           justifyContent: "space-between",
//         }}
//       >
//         <ThemedView styles="gap-3">
//           {/* Profile Section */}
//           <View className="items-center">
//             <View className="w-20 h-20 rounded-full overflow-hidden mb-4">
//               <Image
//                 // source={{
//                 //   uri: item?.securityImages[0],
//                 // }}
//                 className="w-full h-full"
//                 resizeMode="cover"
//               />
//             </View>

//             <Text className="text-2xl font-bold dark:text-gray-200 text-gray-900 mb-1">
//               {item?.security?.securityName}
//             </Text>

//             <Text className="text-gray-500 text-sm">
//               {/* <Icon name="star" size={14} color="#FFA500" /> */}
//               {item?.security_Guard?.securityRating}
//             </Text>
//           </View>

//           {/* Stats Section */}
//           <View className="flex-row">
//             <View className="flex-1 bg-blue-50 dark:bg-blue-400 rounded-lg p-4 mr-2">
//               <Text className="text-blue-600 dark:text-blue-950 font-semibold mb-1">
//                 {t("securityProfile.dailyRateLabel")}
//               </Text>
//               <View className="flex-row items-baseline">
//                 <Text className="text-2xl font-bold text-gray-900">
//                   {item?.displayCurrency} {item?.convertedPrice}
//                 </Text>
//                 <Text className="text-gray-500 dark:text-gray-700 text-sm ml-1">
//                   {t("securityProfile.perDay")}
//                 </Text>
//               </View>
//             </View>
//           </View>

//           <ThemedView styles="gap-2">
//             <ThemedText styles="text-lg font-SemiBold">
//               {t("securityProfile.charge")}
//             </ThemedText>
//             <View className="flex-row justify-between">
//               <ThemedText3 styles="font-Regular">
//                 {item?.security?.securityName}/
//                 {t("securityProfile.chargeDetail")}
//               </ThemedText3>
//               <ThemedText3 styles="font-Regular">
//                 {item?.displayCurrency} {item?.payment[0]?.amount}
//               </ThemedText3>
//             </View>
//           </ThemedView>
//         </ThemedView>

//         {/* Book Now Button */}
//         <View className="">
//           <Pressable
//             onPress={() => setShowModal(true)}
//             className="bg-red-500 rounded-lg py-4 items-center"
//           >
//             <ThemedText2 styles=" font-SemiBold text-lg">
//               {t("cancel")}
//             </ThemedText2>
//           </Pressable>
//         </View>

//         <CancelConfirmationModal
//           visible={showModal}
//           onClose={() => setShowModal(false)}
//           onConfirm={handleSubmit(handleCancelSecurityBooking)}
//           isLoading={securityIsLoading}
//         />
//       </View>
//     </ThemedView>
//   );
// };

// export default UserCancelSecurityBookingScreen;

/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { View, Text, Image, Pressable, Alert } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

import { useNavigation } from "@react-navigation/native";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import ThemedText from "@/utils/ThemedText";
import ThemedText2 from "@/utils/ThemeText2";
import ThemedText3 from "@/utils/ThemedText3";
import CancelConfirmationModal from "@/components/CancelConfirmationModal";
import useT from "@/utils/useT";
import { useFormContext } from "react-hook-form";
import {
  useCancelBookingPaystackSecurityMutation,
  useCancelBookingSecurityMutation,
} from "@/redux/slices/userSlice/securityBookingSlice";

const UserCancelSecurityBookingScreen = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const t = useT();
  const {
    getValues,
    handleSubmit,
    formState: { errors },
    setError,
  } = useFormContext();

  const { selectedCancelSecurity: item } = getValues();
  const paymentType = item?.payment?.[0]?.provider;

  console.log("LINE AT 33", item, paymentType);

  const [cancelBookingSecurity, { isLoading: stripeSecurityLoading }] =
    useCancelBookingSecurityMutation();
  const [
    cancelBookingPaystackSecurity,
    { isLoading: paystackSecurityLoading },
  ] = useCancelBookingPaystackSecurityMutation();

  console.log("LINE AT 40", item);

  const handleCancelSecurityBooking = async () => {
    // Step 1: Show confirmation dialog
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this security booking?",
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
              if (!item?.id) {
                Alert.alert("Error", "Booking ID is missing");
                return;
              }

              if (!paymentType) {
                Alert.alert("Error", "Payment type is missing");
                return;
              }

              const cancelData = {
                securityId: item.id,
                type: "security",
              };

              console.log("🔄 Cancelling security booking:", cancelData);

              let response;

              // Handle payment types
              if (paymentType === "STRIPE") {
                response = await cancelBookingSecurity(cancelData).unwrap();
              } else if (paymentType === "PAYSTACK") {
                response =
                  await cancelBookingPaystackSecurity(cancelData).unwrap();
              } else {
                throw new Error(`Unsupported payment type: ${paymentType}`);
              }

              console.log("✅ Cancel security response:", response);

              // Check success
              if (response?.success) {
                Alert.alert(
                  "Success",
                  "Your security booking has been cancelled successfully.",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        setShowModal(false);
                        navigation.navigate("BookingMain", { tab: "security" });
                      },
                    },
                  ]
                );
              } else {
                throw new Error(response?.message || "Cancellation failed");
              }
            } catch (error) {
              console.error("❌ Cancel security error:", error);

              // Determine error message
              let errorMessage =
                "Unable to cancel security booking. Please try again.";

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
                setError("securityCancelError", {
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

  const securityIsLoading =
    stripeSecurityLoading || paystackSecurityLoading || isCancelling;

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(5),
      }}
    >
      <GoBack navigation={navigation} />

      <View
        className="flex-1"
        style={{
          gap: responsiveHeight(3),
          justifyContent: "space-between",
        }}
      >
        <ThemedView styles="gap-3">
          {/* Profile Section */}
          <View className="items-center">
            <View className="w-20 h-20 rounded-full overflow-hidden mb-4">
              {item?.security_Guard?.securityImages?.[0] && (
                <Image
                  source={{
                    uri: item?.security_Guard?.securityImages[0],
                  }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              )}
            </View>

            <Text className="text-2xl font-bold dark:text-gray-200 text-gray-900 mb-1">
              {item?.security?.securityName}
            </Text>

            <Text className="text-gray-500 text-sm">
              ⭐ {item?.security_Guard?.securityRating || "N/A"}
            </Text>
          </View>

          {/* Stats Section */}
          <View className="flex-row">
            <View className="flex-1 bg-blue-50 dark:bg-blue-400 rounded-lg p-4 mr-2">
              <Text className="text-blue-600 dark:text-blue-950 font-semibold mb-1">
                {t("securityProfile.dailyRateLabel")}
              </Text>
              <View className="flex-row items-baseline">
                <Text className="text-2xl font-bold text-gray-900">
                  {item?.displayCurrency || item?.payment?.[0]?.currency}{" "}
                  {item?.convertedPrice || item?.payment?.[0]?.amount}
                </Text>
                <Text className="text-gray-500 dark:text-gray-700 text-sm ml-1">
                  {t("securityProfile.perDay")}
                </Text>
              </View>
            </View>
          </View>

          <ThemedView styles="gap-2">
            <ThemedText styles="text-lg font-SemiBold">
              {t("securityProfile.charge")}
            </ThemedText>
            <View className="flex-row justify-between">
              <ThemedText3 styles="font-Regular">
                {item?.security?.securityName}/
                {t("securityProfile.chargeDetail")}
              </ThemedText3>
              <ThemedText3 styles="font-Regular">
                {item?.displayCurrency || item?.payment?.[0]?.currency}{" "}
                {item?.payment?.[0]?.amount}
              </ThemedText3>
            </View>
          </ThemedView>

          {/* Error Display */}
        </ThemedView>

        {/* Cancel Button */}
        <View className="">
          <Pressable
            onPress={() => setShowModal(true)}
            disabled={securityIsLoading}
            className={`bg-red-500 rounded-lg py-4 items-center ${
              securityIsLoading ? "opacity-50" : ""
            }`}
          >
            <ThemedText2 styles="font-SemiBold text-lg">
              {securityIsLoading ? "Cancelling..." : t("cancel")}
            </ThemedText2>
          </Pressable>
        </View>

        <CancelConfirmationModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleSubmit(handleCancelSecurityBooking)}
          isLoading={securityIsLoading}
        />
      </View>
    </ThemedView>
  );
};

export default UserCancelSecurityBookingScreen;
