/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import ThemedView from '@/utils/ThemedView';
import GoBack from '@/components/GoBack';
import ThemedText from '@/utils/ThemedText';
import ThemedText3 from '@/utils/ThemedText3';
import ThemedText2 from '@/utils/ThemeText2';
import CancelConfirmationModal from '@/components/CancelConfirmationModal';
import useT from '@/utils/useT';
import { useFormContext } from 'react-hook-form';
import {
  useCancelBookingAttractionMutation,
  useCancelBookingPaystackAttractionMutation,
  useGetSingleAttractionAppealQuery,
  useGetSingleAttractionQuery,
} from '@/redux/slices/userSlice/attractionSlice';
import { useSelector } from 'react-redux';

export default function UserCancelAttractionBookingScreen() {
  // const [showAvailability, setShowAvailability] = useState(false);
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const t = useT();
  const { getValues, handleSubmit } = useFormContext();
  const { selectedCancelAttraction: item } = getValues();
  // console.log('LINE AT 27', item);

  const {
    data: singleAttractionData,
    // isLoading: singleAttractionLoading,
    // isFetching: isSingleFetchingMore,
    // isError: singleAttractionError,
  } = useGetSingleAttractionAppealQuery(item?.appeal?.id, {
    refetchOnMountOrArgChange: true,
  });

  // const token = useSelector((state)=> state.auth.token);
  // console.log("LINE AT 44", singleAttractionData);

  const paymentType = item?.payment?.[0]?.provider;
  const [cancelBookingAttraction, { isLoading: stripeAttractionLoading }] =
    useCancelBookingAttractionMutation();
  const [
    cancelBookingPaystackAttraction,
    { isLoading: paystackAttractionLoading },
  ] = useCancelBookingPaystackAttractionMutation();

  const handleCancelAttractionBooking = async () => {
    try {
      const cancelData = {
        attractionId: item?.id,
        type: 'attraction',
      };

      let response;

      if (paymentType === 'STRIPE') {
        response = await cancelBookingAttraction(cancelData).unwrap();
      } else if (paymentType === 'PAYSTACK') {
        response = await cancelBookingPaystackAttraction(cancelData).unwrap();
      } else {
        throw new Error(`Unsupported payment type: ${paymentType}`);
      }

      console.log('✅ Cancel security response:', response);
      if (response?.success) {
        setShowModal(!showModal);
        navigation.navigate('BookingMain', { tab: 'attraction' });
      }
    } catch (error) {
      console.log('❌ Cancel security error:', error);
    }
  };

  const attractionIsLoading =
    stripeAttractionLoading || paystackAttractionLoading;

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(5),
        gap: responsiveHeight(3),
      }}
    >
      {/* Header */}
      <GoBack navigation={navigation} />

      <ScrollView
        contentContainerStyle={{ gap: responsiveHeight(2) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title and Description */}
        <Image
          source={{
            uri: singleAttractionData?.data?.attractionImages[0],
          }}
          style={{
            width: responsiveWidth(88),
            height: responsiveHeight(35),
            objectFit: 'cover',
            borderRadius: 12,
          }}
        />
        <View>
          <ThemedText styles="text-2xl font-Bold mb-2">
            {singleAttractionData?.data?.attractionDestinationType}
          </ThemedText>
          <ThemedText3 styles="font-Regular mb-3">
            {singleAttractionData?.data?.attractionDescription}
          </ThemedText3>

          {/* Rating and Price */}
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center">
              {/* <FontAwesome name="star" size={16} color="#facc15" /> */}
              <Text className="ml-1 font-Medium text-sm text-yellow-600">
                {singleAttractionData?.data?.attractionRating}
              </Text>
              <Text className="ml-1 text-sm text-gray-500 font-Regular">
                ({singleAttractionData?.data?.attractionReviewCount}{' '}
                {t('attractionDetail.ratingText')})
              </Text>
            </View>
            <Text className="text-lg font-Bold text-gray-500 w-2/3">
              {t('attractionDetail.fromPrice')} {item?.displayCurrency}{' '}
              {item?.totalPrice}
            </Text>
          </View>
        </View>
        {/* Description */}
        {singleAttractionData?.data?.attractionBusinessDescription ? (
          <View className="mb-6">
            <ThemedText styles="text-lg font-SemiBold mb-2 ">
              {t('attractionDetail.descriptionTitle')}
            </ThemedText>
            <Text className="text-gray-500 leading-relaxed">
              {singleAttractionData?.data?.attractionBusinessDescription}
            </Text>
          </View>
        ) : (
          <ThemedText styles="text-lg font-SemiBold mb-2 ">
            No Description
          </ThemedText>
        )}

        {/* Rating Breakdown */}
        {/* <View className="mb-6"> */}
        {/* <View className="flex-row items-center"> */}
        {/* <FontAwesome name="star" size={16} color="#facc15" /> */}
        {/* <Text className="ml-1 font-Medium text-sm text-yellow-600">
              {singleAttractionData?.data?.attractionRating}
            </Text>
            <Text className="ml-1 text-sm text-gray-500 font-Regular">
              ({singleAttractionData?.data?.attractionReviewCount}{' '}
              {t('attractionDetail.ratingText')})
            </Text>
          </View> */}
        {/* {[
            {
              label: t('attractionDetail.ratingBreakdown.goodValue'),
              rating: 4.9,
            },
            {
              label: t('attractionDetail.ratingBreakdown.qualityOfService'),
              rating: 3.9,
            },
            {
              label: t('attractionDetail.ratingBreakdown.facilities'),
              rating: 4.1,
            },
            {
              label: t('attractionDetail.ratingBreakdown.easeOfAccess'),
              rating: 4.4,
            },
          ].map((item, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center mb-2"
            >
              <Text className="text-sm text-gray-500">{item.label}</Text>
              <View className="flex-row items-center space-x-2">
                <View className="w-24 h-2 bg-gray-200 rounded-full">
                  <View
                    className="h-2 bg-yellow-400 rounded-full"
                    style={{ width: `${(item.rating / 5) * 100}%` }}
                  />
                </View>
                <Text className="w-8 text-right text-sm font-medium">
                  {item.rating}
                </Text>
              </View>
            </View>
          ))} */}
        {/* </View> */}

        {/* Visitor Review */}

        {/* What's Included */}
        <View className="mb-6">
          <ThemedText styles="text-lg font-Semibold mb-2 ">
            {t('attractionDetail.whatsIncludedTitle')}
          </ThemedText>

          {singleAttractionData?.data?.attractionServicesOffered.map(
            (data, index) => (
              <Text key={index} className="ml-2 text-gray-700">
                {data}
              </Text>
            ),
          )}
        </View>
      </ScrollView>

      {/* Bottom Booking Bar */}
      <View className="w-full  pb-5">
        <Pressable
          onPress={() => setShowModal(true)}
          className="bg-red-500 rounded-lg py-4 items-center"
        >
          <ThemedText2 styles=" font-SemiBold text-lg">
            {t('cancel')}
          </ThemedText2>
        </Pressable>
      </View>

      {/* Modal for Date & Time Selection */}
      <CancelConfirmationModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleSubmit(handleCancelAttractionBooking)}
        isLoading={attractionIsLoading}
      />
    </ThemedView>
  );
}

/* eslint-disable react-native/no-inline-styles */
// import React, { useState } from "react";
// import { View, Text, ScrollView, Pressable, Image, Alert } from "react-native";
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from "react-native-responsive-dimensions";
// import { CommonActions, useNavigation } from "@react-navigation/native";
// import ThemedView from "@/utils/ThemedView";
// import GoBack from "@/components/GoBack";
// import ThemedText from "@/utils/ThemedText";
// import ThemedText3 from "@/utils/ThemedText3";
// import ThemedText2 from "@/utils/ThemeText2";
// import CancelConfirmationModal from "@/components/CancelConfirmationModal";
// import useT from "@/utils/useT";
// import { useFormContext } from "react-hook-form";
// import {
//   useCancelBookingAttractionMutation,
//   useCancelBookingPaystackAttractionMutation,
//   useGetSingleAttractionAppealQuery,
// } from "@/redux/slices/userSlice/attractionSlice";

// export default function UserCancelAttractionBookingScreen() {
//   const navigation = useNavigation();
//   const [showModal, setShowModal] = useState(false);
//   const [isCancelling, setIsCancelling] = useState(false);
//   const t = useT();
//   const { getValues } = useFormContext();
//   const { selectedCancelAttraction: item } = getValues();

//   const { data: singleAttractionData } = useGetSingleAttractionAppealQuery(
//     item?.appeal?.id,
//     {
//       refetchOnMountOrArgChange: true,
//     }
//   );

//   const paymentType = item?.payment?.[0]?.provider;

//   const [cancelBookingAttraction, { isLoading: stripeAttractionLoading }] =
//     useCancelBookingAttractionMutation();
//   const [
//     cancelBookingPaystackAttraction,
//     { isLoading: paystackAttractionLoading },
//   ] = useCancelBookingPaystackAttractionMutation();

//   const handleCancelAttractionBooking = async () => {
//     Alert.alert(
//       "Cancel Booking",
//       "Are you sure you want to cancel this attraction booking?",
//       [
//         {
//           text: "No",
//           style: "cancel",
//         },
//         {
//           text: "Yes, Cancel",
//           style: "destructive",
//           onPress: async () => {
//             try {
//               setIsCancelling(true);

//               if (!item?.id) {
//                 Alert.alert("Error", "Booking ID is missing");
//                 return;
//               }

//               if (!paymentType) {
//                 Alert.alert("Error", "Payment type is missing");
//                 return;
//               }

//               const cancelData = {
//                 attractionId: item.id,
//                 type: "attraction",
//               };

//               console.log("🔄 Cancelling attraction booking:", cancelData);

//               let response;

//               if (paymentType === "STRIPE") {
//                 response = await cancelBookingAttraction(cancelData).unwrap();
//               } else if (paymentType === "PAYSTACK") {
//                 response =
//                   await cancelBookingPaystackAttraction(cancelData).unwrap();
//               } else {
//                 throw new Error(`Unsupported payment type: ${paymentType}`);
//               }

//               console.log("✅ Cancel attraction response:", response);

//               if (response?.success) {
//                 Alert.alert(
//                   "Success",
//                   "Your attraction booking has been cancelled successfully.",
//                   [
//                     {
//                       text: "OK",
//                       onPress: () => {
//                         setShowModal(false);
//                         navigation.navigate("BookingMain", {
//                           tab: "attraction",
//                         });
//                       },
//                     },
//                   ]
//                 );
//               } else {
//                 throw new Error(response?.message || "Cancellation failed");
//               }
//             } catch (error) {
//               console.error("❌ Cancel attraction error:", error);

//               let errorMessage = "Unable to cancel booking. Please try again.";

//               if (error?.status === 404) {
//                 errorMessage = "Booking not found or already cancelled.";
//               } else if (error?.status === 403) {
//                 errorMessage = "You cannot cancel this booking.";
//               } else if (error?.data?.message) {
//                 errorMessage = error.data.message;
//               } else if (error?.message) {
//                 errorMessage = error.message;
//               }

//               Alert.alert("Cancellation Failed", errorMessage);
//             } finally {
//               setIsCancelling(false);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleBackAndGoToBookingTab = () => {
//     navigation.dispatch(
//       CommonActions.reset({
//         index: 0,
//         routes: [
//           {
//             name: "UserHome",
//             state: {
//               routes: [{ name: "Booking" }],
//             },
//           },
//         ],
//       })
//     );
//   };

//   const attractionIsLoading =
//     stripeAttractionLoading || paystackAttractionLoading || isCancelling;

//   return (
//     <ThemedView
//       styles="flex-1"
//       style={{
//         paddingHorizontal: responsiveWidth(6),
//         paddingTop: responsiveHeight(5),
//         gap: responsiveHeight(3),
//       }}
//     >
//       {/* Header with GoBack */}
//       {/* <View className="flex-row items-center">
//         <Pressable onPress={handleBackAndGoToBookingTab} className="mr-4">
       
//           <Text className="text-lg">←</Text>
//         </Pressable>
//         <ThemedText styles="text-xl font-Bold">
//           Cancel Attraction Booking
//         </ThemedText>
//       </View> */}

//       <GoBack navigation={navigation} />

//       <ScrollView
//         contentContainerStyle={{ gap: responsiveHeight(2) }}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Attraction Image */}
//         <Image
//           source={{
//             uri:
//               singleAttractionData?.data?.attractionImages?.[0] ||
//               "https://via.placeholder.com/400x300",
//           }}
//           style={{
//             width: responsiveWidth(88),
//             height: responsiveHeight(35),
//             objectFit: "cover",
//             borderRadius: 12,
//           }}
//         />

//         {/* Attraction Details */}
//         <View>
//           <ThemedText styles="text-2xl font-Bold mb-2">
//             {singleAttractionData?.data?.attractionDestinationType ||
//               item?.appeal?.attractionDestinationType}
//           </ThemedText>
//           <ThemedText3 styles="font-Regular mb-3">
//             {singleAttractionData?.data?.attractionDescription ||
//               item?.appeal?.attractionDescription}
//           </ThemedText3>

//           {/* Rating and Price */}
//           <View className="flex-row items-center justify-between">
//             <View className="flex-row items-center">
//               <Text className="ml-1 font-Medium text-sm text-yellow-600">
//                 {singleAttractionData?.data?.attractionRating || "N/A"}
//               </Text>
//               <Text className="ml-1 text-sm text-gray-500 font-Regular">
//                 ({singleAttractionData?.data?.attractionReviewCount || 0}{" "}
//                 {t("attractionDetail.ratingText")})
//               </Text>
//             </View>
//             <Text className="text-lg font-Bold">
//               {item?.displayCurrency} {item?.totalPrice}
//             </Text>
//           </View>
//         </View>

//         {/* Booking Details Card */}
//         <View className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
//           <ThemedText styles="text-lg font-SemiBold mb-3">
//             Booking Details
//           </ThemedText>

//           <View className="gap-2">
//             <View className="flex-row justify-between">
//               <ThemedText3>Booking ID:</ThemedText3>
//               <ThemedText styles="font-Medium">
//                 #{item?.id?.slice(-8) || "N/A"}
//               </ThemedText>
//             </View>

//             <View className="flex-row justify-between">
//               <ThemedText3>Payment Method:</ThemedText3>
//               <ThemedText styles="font-Medium">
//                 {paymentType || "Unknown"}
//               </ThemedText>
//             </View>

//             <View className="flex-row justify-between">
//               <ThemedText3>Booking Date:</ThemedText3>
//               <ThemedText styles="font-Medium">
//                 {item?.createdAt
//                   ? new Date(item.createdAt).toLocaleDateString()
//                   : "N/A"}
//               </ThemedText>
//             </View>
//           </View>
//         </View>

//         {/* Description */}
//         {singleAttractionData?.data?.attractionBusinessDescription ? (
//           <View className="mb-6">
//             <ThemedText styles="text-lg font-SemiBold mb-2">
//               {t("attractionDetail.descriptionTitle")}
//             </ThemedText>
//             <Text className="text-gray-500 dark:text-gray-400 leading-relaxed">
//               {singleAttractionData.data.attractionBusinessDescription}
//             </Text>
//           </View>
//         ) : (
//           <ThemedText styles="text-lg font-SemiBold mb-2">
//             No Description Available
//           </ThemedText>
//         )}

//         {/* What's Included */}
//         {singleAttractionData?.data?.attractionServicesOffered?.length > 0 && (
//           <View className="mb-6">
//             <ThemedText styles="text-lg font-Semibold mb-2">
//               {t("attractionDetail.whatsIncludedTitle")}
//             </ThemedText>
//             {singleAttractionData.data.attractionServicesOffered.map(
//               (service, index) => (
//                 <View key={index} className="flex-row items-center mb-1">
//                   <Text className="text-gray-700 dark:text-gray-300 ml-2">
//                     • {service}
//                   </Text>
//                 </View>
//               )
//             )}
//           </View>
//         )}
//       </ScrollView>

//       {/* Bottom Action Bar */}
//       <View className="w-full pb-5 pt-3 border-t border-gray-200 dark:border-gray-700">
//         <Pressable
//           onPress={() => setShowModal(true)}
//           className="bg-red-500 rounded-lg py-4 items-center"
//           disabled={attractionIsLoading}
//         >
//           <ThemedText2 styles="font-SemiBold text-lg">
//             {attractionIsLoading ? "Cancelling..." : t("cancel")}
//           </ThemedText2>
//         </Pressable>
//       </View>

//       {/* Cancel Confirmation Modal */}
//       <CancelConfirmationModal
//         visible={showModal}
//         onClose={() => setShowModal(false)}
//         onConfirm={handleCancelAttractionBooking}
//         isLoading={attractionIsLoading}
//         title="Cancel Attraction Booking"
//         message="Are you sure you want to cancel this attraction booking? You may be subject to cancellation fees."
//       />
//     </ThemedView>
//   );
// }
