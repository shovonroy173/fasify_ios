// /* eslint-disable react-native/no-inline-styles */
// import {
//   View,
//   // Text,
//   Image,
//   // FlatList,
//   // ScrollView,
//   StyleSheet,
//   useColorScheme,
//   Pressable,
// } from 'react-native';
// import React, { useState } from 'react';
// import {
//   CommonActions,
//   useNavigation,
//   useRoute,
// } from '@react-navigation/native';

// import {
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';

// import { useThemeColor } from '@/utils/useThemeColor';
// // import FontAwesome from 'react-native-vector-icons/FontAwesome';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import AntDesign from 'react-native-vector-icons/AntDesign';

// import { useFormContext } from 'react-hook-form';
// // import ThemedText4 from '@/utils/ThemeText4';
// import ThemedView from '@/utils/ThemedView';
// import ThemedText3 from '@/utils/ThemedText3';
// import ThemedText from '@/utils/ThemedText';
// // import PaymentOption from '@/components/PaymentOption';
// // import { paymentOptions } from 'assets/data/data';
// import ThemedText2 from '@/utils/ThemeText2';
// // import GoBack from '@/components/GoBack';
// import CancelConfirmationModal from '@/components/CancelConfirmationModal';
// import CallModal from '@/components/CallModal';
// // import Octicons from 'react-native-vector-icons/Octicons';
// import useT from '@/utils/useT';
// import {
//   useCancelBookingCarMutation,
//   useCancelBookingPaystackCarMutation,
// } from '@/redux/slices/userSlice/carBookingSlice';
// import { MapPin, Phone } from 'lucide-react-native';

// const UserCancelCarBookingScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { item } = route.params; // Get the car booking item from route params
//   const { icon2 } = useThemeColor();
//   const [showModal, setShowModal] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const paymentType = item?.payment?.[0]?.provider;
//   const { getValues } = useFormContext();
//   const { selectedCancelCar: itemData } = getValues();

//   console.log('LINE AT 342', itemData, paymentType, item);

//   const t = useT();

//   const theme = useColorScheme();
//   const styles = getStyles(theme);

//   // Cancel car booking mutation
//   const [cancelBookingCar, { isLoading: stripeLoading }] =
//     useCancelBookingCarMutation();
//   const [cancelBookingPaystackCar, { isLoading: paystackLoading }] =
//     useCancelBookingPaystackCarMutation();

//   const handleCancelCarBooking = async () => {
//     try {
//       const cancelData = {
//         carId: item?.id,
//         type: 'car',
//       };

//       let response;

//       if (paymentType === 'STRIPE') {
//         response = await cancelBookingCar(cancelData).unwrap();
//       } else if (paymentType === 'PAYSTACK') {
//         response = await cancelBookingPaystackCar(cancelData).unwrap();
//       } else {
//         throw new Error(`Unsupported payment type: ${paymentType}`);
//       }

//       console.log('✅ Cancel response:', response);

//       if (response.success) {
//         setShowModal(false);
//         navigation.navigate('BookingMain', { tab: 'car' });
//       }
//       // maybe navigate back or show success alert here
//     } catch (error) {
//       console.log('❌ Cancel error:', error);
//     }
//   };

//   const handleBackAndGoToBookingTab = () => {
//     navigation.dispatch(
//       CommonActions.reset({
//         index: 0,
//         routes: [
//           {
//             name: 'UserHome',
//             state: {
//               routes: [{ name: 'Booking' }],
//             },
//           },
//         ],
//       }),
//     );
//   };

//   const isLoading = stripeLoading || paystackLoading;

//   return (
//     <ThemedView styles="flex-1 relative ">
//       {/* Car Image */}
//       <View style={styles.imageContainer}>
//         <Image
//           source={require('assets/images/map.png')}
//           style={styles.image}
//         />
//         <View style={styles.imageOverlay} />
//       </View>

//       {/* Scrollable Content with Rounded Corners */}
//       <View style={styles.bottomSheet}>
//         {/* Back Button */}
//         <Pressable onPress={handleBackAndGoToBookingTab}>
//           {/* <Octicons name="arrow-left" size={24} color={icon2} /> */}
//         </Pressable>

//         {/* Heading */}
//         {/* <ThemedText styles="font-Medium text-lg">
//           {t('rideStatus.driverComingIn', { time: '3:35' })}
//         </ThemedText> */}

//         {/* <View className="bg-zinc-600 w-full h-[0.5]" /> */}

//         {/* Driver Info */}
//         <ThemedView styles="flex-row justify-between items-start rounded-lg">
//           <View className="flex-row items-start gap-2">
//             {/* <Image
//               source={require('assets/images/user.png')}
//               style={{
//                 width: responsiveWidth(17),
//                 height: responsiveWidth(10),
//                 objectFit: 'cover',
//                 borderRadius: 10,
//               }}
//             /> */}
//             <View className="gap-1">
//               <ThemedText styles="font-SemiBold text-lg">
//                 {item?.car?.carModel}
//               </ThemedText>

//               <View className="flex-row items-center gap-2">
//                 {/* <FontAwesome name="map-marker" size={16} color="#3B82F6" /> */}
//                 <MapPin size={16} color="#3B82F6" />
//                 <View>
//                   <ThemedText3>
//                     {item?.car?.carAddress}, {item?.car?.carCity},{' '}
//                   </ThemedText3>
//                   <ThemedText3>{item?.car?.carCountry}</ThemedText3>
//                 </View>
//               </View>

//               {/* <View className="flex-row items-center gap-2">

//                 <ThemedText3>
//                   {t('rideStatus.reviews', {
//                     rating: '4.5',
//                     count: '531',
//                   })}
//                 </ThemedText3>
//               </View> */}
//             </View>
//           </View>

//           <Image
//             source={{
//               uri: item?.car?.carImages
//                 ? item?.car?.carImages[0]
//                 : 'https://via.placeholder.com/150',
//             }}
//             style={{
//               width: responsiveWidth(17),
//               height: responsiveWidth(10),
//               objectFit: 'cover',
//               borderRadius: 10,
//             }}
//           />
//         </ThemedView>

//         <View className="bg-zinc-600 w-full h-[0.5]" />

//         {/* Payment Method */}
//         <ThemedView styles="flex-row justify-between items-center">
//           <ThemedText3 styles="text-lg font-SemiBold">
//             {t('rideStatus.paymentMethod')}
//           </ThemedText3>
//           <ThemedText styles="text-3xl font-SemiBold">
//             {item?.displayCurrency} {item?.convertedPrice}
//           </ThemedText>
//         </ThemedView>

//         <View className="bg-zinc-600 w-full h-[0.5]" />

//         {/* Call / Chat / Cancel */}
//         <View className="flex-row justify-between gap-10">
//           <View className="flex-row items-center gap-3">
//             <Pressable
//               className="border border-blue-500 p-3 rounded-full self-start"
//               onPress={() => setIsModalVisible(true)}
//             >
//               <Phone size={20} color="#3B82F6" />
//             </Pressable>
//             <Pressable
//               onPress={() =>
//                 navigation.navigate('UserChat', {
//                   receiverId: item?.partnerId,
//                   // receiverName:
//                   //   profileData?.data?.fullName || profileData?.data?.email,
//                 })
//               }
//             >
//               <View className="border border-blue-500 p-3 rounded-full self-start">
//                 <Image
//                   source={require('assets/images/chatC.webp')}
//                   style={{
//                     width: responsiveWidth(6),
//                     height: responsiveWidth(6),
//                     objectFit: 'cover',
//                   }}
//                 />
//               </View>
//             </Pressable>
//           </View>

//           <Pressable
//             onPress={() => setShowModal(true)}
//             className="flex-1 rounded-lg p-3 bg-red-500 flex-row items-center justify-center gap-2"
//           >
//             <ThemedText2 styles="text-center font-SemiBold text-lg">
//               {t('rideStatus.cancelRide')}
//             </ThemedText2>
//           </Pressable>
//         </View>
//       </View>

//       <CancelConfirmationModal
//         visible={showModal}
//         onClose={() => setShowModal(false)}
//         onConfirm={handleCancelCarBooking}
//         isLoading={isLoading}
//       />
//       <CallModal
//         visible={isModalVisible}
//         onClose={() => setIsModalVisible(false)}
//         phoneNumber="01904167449"
//       />
//     </ThemedView>
//   );
// };

// const getStyles = theme =>
//   StyleSheet.create({
//     header: {
//       position: 'absolute',
//       zIndex: 20,
//       width: '100%',
//       paddingHorizontal: responsiveWidth(6),
//       paddingVertical: responsiveHeight(3),
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//     },
//     image: {
//       width: responsiveWidth(100),
//       height: responsiveHeight(35),
//       resizeMode: 'cover',
//     },
//     imageContainer: {
//       position: 'relative',
//     },
//     imageOverlay: {
//       ...StyleSheet.absoluteFillObject,
//       backgroundColor: 'rgba(0,0,0,0.5)',
//     },

//     bottomSheet: {
//       position: 'absolute',
//       top: responsiveHeight(15),
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: theme === 'dark' ? 'black' : 'white',
//       borderTopLeftRadius: 30,
//       borderTopRightRadius: 30,
//       overflow: 'hidden',
//       paddingHorizontal: responsiveWidth(6),
//       paddingTop: responsiveHeight(5),
//       gap: responsiveHeight(3),
//     },
//     scrollContent: {
//       paddingHorizontal: responsiveWidth(6),
//       paddingBottom: responsiveHeight(18),
//       paddingTop: responsiveHeight(5),
//       gap: responsiveHeight(2),
//     },
//     fixedButton: {
//       position: 'absolute',
//       bottom: 0,
//       left: 0,
//       right: 0,
//       paddingHorizontal: responsiveWidth(6),
//       paddingVertical: responsiveHeight(2),
//       backgroundColor: theme === 'dark' ? 'black' : 'white',
//     },
//     userImage: {
//       width: responsiveWidth(13),
//       height: responsiveWidth(13),
//       resizeMode: 'cover',
//       borderRadius: 10,
//     },
//   });

// export default UserCancelCarBookingScreen;

/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  StyleSheet,
  useColorScheme,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useThemeColor } from "@/utils/useThemeColor";
import { useFormContext } from "react-hook-form";
import ThemedView from "@/utils/ThemedView";
import ThemedText3 from "@/utils/ThemedText3";
import ThemedText from "@/utils/ThemedText";
import ThemedText2 from "@/utils/ThemeText2";
import CancelConfirmationModal from "@/components/CancelConfirmationModal";
import CallModal from "@/components/CallModal";
import useT from "@/utils/useT";
import {
  useCancelBookingCarMutation,
  useCancelBookingPaystackCarMutation,
} from "@/redux/slices/userSlice/carBookingSlice";
import { MapPin, Phone } from "lucide-react-native";

const UserCancelCarBookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const { icon2 } = useThemeColor();
  const [showModal, setShowModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { getValues } = useFormContext();
  const { selectedCancelCar: itemData } = getValues();

  // Get payment type from the item
  const paymentType =
    itemData?.payment?.[0]?.provider || item?.payment?.[0]?.provider;

  console.log("Car Cancellation Data:", {
    itemData,
    routeItem: item,
    paymentType,
  });

  const t = useT();
  const theme = useColorScheme();
  const styles = getStyles(theme);

  // Cancel car booking mutation
  const [cancelBookingCar, { isLoading: stripeLoading }] =
    useCancelBookingCarMutation();
  const [cancelBookingPaystackCar, { isLoading: paystackLoading }] =
    useCancelBookingPaystackCarMutation();

  // Loading state
  const isLoading = stripeLoading || paystackLoading;
  const [isCancelling, setIsCancelling] = useState(false);

  // Handle cancel car booking (similar to hotel)
  const handleCancelCarBooking = async () => {
    // Show confirmation dialog
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this car booking?",
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

              // Use itemData from form if available, otherwise use route item
              const bookingToCancel = itemData || item;

              // Validate data
              if (!bookingToCancel?.id) {
                Alert.alert("Error", "Booking ID is missing");
                return;
              }

              if (!paymentType) {
                Alert.alert("Error", "Payment type is missing");
                return;
              }

              const cancelData = {
                carId: bookingToCancel.id,
                type: "car",
              };

              console.log("🔄 Cancelling car booking:", cancelData);

              let response;

              // Handle payment types
              if (paymentType === "STRIPE") {
                response = await cancelBookingCar(cancelData).unwrap();
              } else if (paymentType === "PAYSTACK") {
                response = await cancelBookingPaystackCar(cancelData).unwrap();
              } else {
                throw new Error(`Unsupported payment type: ${paymentType}`);
              }

              console.log("✅ Cancel response:", response);

              // Check success
              if (response?.success) {
                Alert.alert(
                  "Success",
                  "Your car booking has been cancelled successfully.",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        setShowModal(false);
                        navigation.navigate("BookingMain", { tab: "car" });
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
            } finally {
              setIsCancelling(false);
            }
          },
        },
      ]
    );
  };

  const handleBackAndGoToBookingTab = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "UserHome",
            state: {
              routes: [{ name: "Booking" }],
            },
          },
        ],
      })
    );
  };

  // Use itemData from form if available, otherwise use route item
  const displayItem = itemData || item;

  return (
    <ThemedView styles="flex-1 relative ">
      {/* Car Image */}
      <View style={styles.imageContainer}>
        <Image source={require("assets/images/map.png")} style={styles.image} />
        <View style={styles.imageOverlay} />
      </View>

      {/* Scrollable Content with Rounded Corners */}
      <View style={styles.bottomSheet}>
        {/* Back Button */}
        <Pressable onPress={handleBackAndGoToBookingTab}>
          {/* Back arrow icon can be added here */}
        </Pressable>

        {/* Driver Info */}
        <ThemedView styles="flex-row justify-between items-start rounded-lg">
          <View className="flex-row items-start gap-2">
            <View className="gap-1">
              <ThemedText styles="font-SemiBold text-lg">
                {displayItem?.car?.carModel || displayItem?.carName}
              </ThemedText>

              <View className="flex-row items-center gap-2">
                <MapPin size={16} color="#3B82F6" />
                <View>
                  <ThemedText3>
                    {displayItem?.car?.carAddress}, {displayItem?.car?.carCity}
                    ,{" "}
                  </ThemedText3>
                  <ThemedText3>{displayItem?.car?.carCountry}</ThemedText3>
                </View>
              </View>
            </View>
          </View>

          <Image
            source={{
              uri: displayItem?.car?.carImages
                ? displayItem?.car?.carImages[0]
                : displayItem?.carImages?.[0]
                  ? displayItem.carImages[0]
                  : "https://via.placeholder.com/150",
            }}
            style={{
              width: responsiveWidth(17),
              height: responsiveWidth(10),
              objectFit: "cover",
              borderRadius: 10,
            }}
          />
        </ThemedView>

        <View className="bg-zinc-600 w-full h-[0.5]" />

        {/* Booking Details */}
        <View className="gap-3">
          {/* <View className="flex-row justify-between items-center">
            <ThemedText3 styles="text-lg font-SemiBold">
              Booking Reference
            </ThemedText3>
            <ThemedText styles="font-SemiBold">
              #{displayItem?.bookingReference || displayItem?.id?.slice(-8)}
            </ThemedText>
          </View> */}

          <View className="flex-row justify-between items-center">
            <ThemedText3 styles="text-lg font-SemiBold">
              Total Price
            </ThemedText3>
            <ThemedText styles="text-xl font-SemiBold">
              {displayItem?.displayCurrency || displayItem?.currency}{" "}
              {displayItem?.convertedPrice || displayItem?.totalPrice}
            </ThemedText>
          </View>

          {/* <View className="flex-row justify-between items-center">
            <ThemedText3 styles="text-lg font-SemiBold">
              Booking Date
            </ThemedText3>
            <ThemedText styles="font-Medium">
              {displayItem?.createdAt
                ? new Date(displayItem.createdAt).toLocaleDateString()
                : "N/A"}
            </ThemedText>
          </View> */}
        </View>

 

        {/* Payment Method */}
        {/* <ThemedView styles="flex-row justify-between items-center">
          <ThemedText3 styles="text-lg font-SemiBold">
            Payment Method
          </ThemedText3>
          <ThemedText styles="text-lg font-SemiBold">
            {paymentType || "Unknown"}
          </ThemedText>
        </ThemedView> */}

        <View className="bg-zinc-600 w-full h-[0.5]" />

        {/* Action Buttons */}
        <View className="flex-row justify-between gap-10">
          <View className="flex-row items-center gap-3">
            <Pressable
              className="border border-blue-500 p-3 rounded-full self-start"
              onPress={() => setIsModalVisible(true)}
            >
              <Phone size={20} color="#3B82F6" />
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate("UserChat", {
                  receiverId: displayItem?.partnerId,
                  receiverName: displayItem?.partnerName || "Car Owner",
                })
              }
            >
              <View className="border border-blue-500 p-3 rounded-full self-start">
                <Image
                  source={require("assets/images/chatC.webp")}
                  style={{
                    width: responsiveWidth(6),
                    height: responsiveWidth(6),
                    objectFit: "cover",
                  }}
                />
              </View>
            </Pressable>
          </View>

          {/* Cancel Button */}
          <Pressable
            onPress={() => setShowModal(true)}
            className="flex-1 rounded-lg p-3 bg-red-500 flex-row items-center justify-center gap-2"
            disabled={isLoading || isCancelling}
          >
            <ThemedText2 styles="text-center font-SemiBold text-lg">
              {isLoading || isCancelling ? "Cancelling..." : "Cancel "}
            </ThemedText2>
          </Pressable>
        </View>
      </View>

      {/* Cancel Confirmation Modal */}
      <CancelConfirmationModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleCancelCarBooking}
        isLoading={isLoading || isCancelling}
        title="Cancel Car Booking"
        message="Are you sure you want to cancel this car booking? You may be subject to cancellation fees."
      />

      {/* Call Modal */}
      <CallModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        phoneNumber={displayItem?.partnerPhone || "Not available"}
      />
    </ThemedView>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    image: {
      width: responsiveWidth(100),
      height: responsiveHeight(35),
      resizeMode: "cover",
    },
    imageContainer: {
      position: "relative",
    },
    imageOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    bottomSheet: {
      position: "absolute",
      top: responsiveHeight(15),
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme === "dark" ? "black" : "white",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: "hidden",
      paddingHorizontal: responsiveWidth(6),
      paddingTop: responsiveHeight(5),
      gap: responsiveHeight(3),
    },
  });

export default UserCancelCarBookingScreen;
