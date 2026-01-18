
// // new payment method using webview final version --hopefully

import {
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
  // TextInput,
  TouchableOpacity,
  // useColorScheme,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import ThemedView from '@/utils/ThemedView';
import { useNavigation, useRoute } from '@react-navigation/native';
import GoBack from '@/components/GoBack';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedText from '@/utils/ThemedText';
import ThemedText3 from '@/utils/ThemedText3';
import RatingModal from '@/components/RatingModal';
import {
  usePaymentMutation,
  usePayStackPaymentMutation,
} from '@/redux/slices/authSlice';
import { useAddReviewHotelMutation } from '@/redux/slices/userSlice/hotelbookingSlice';
import { useAddReviewSecurityMutation } from '@/redux/slices/userSlice/securityBookingSlice';
import { useAddReviewCarMutation } from '@/redux/slices/userSlice/carBookingSlice';
import { useAddReviewAttractionMutation } from '@/redux/slices/userSlice/attractionSlice';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { getCountryCode } from '@/utils/simpleLocationService';
import { getPaymentGateway } from '@/utils/paymentGateways';
import { WebView } from 'react-native-webview';
import { calculatevatFee } from '@/utils/calculateVatFee';
import PriceBreakdownComponent from '@/components/PriceBreakdownComponent';
import { useFormContext } from 'react-hook-form';
import HotelBookingDetail from '@/components/HotelBookingDetail';
import BookUserDetail from '@/components/BookUserDetail';
import BookHotelDetail from '@/components/BookHotelDetail';
import useT from '@/utils/useT';
import BookedCar from '@/components/BookedCar';
import AgencyAddress from '@/components/AgencyAddress';
import moment from 'moment';
import { Text } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native';
import { CircleXIcon, CreditCard } from 'lucide-react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';

// Generic Payment WebView Component
const PaymentWebView = ({
  paymentUrl,
  onSuccess,
  onClose,
  onError,
  gatewayName = 'Payment',
  successPatterns = ['/success', 'successful', 'status=success', 'return_url'],
  cancelPatterns = ['/cancel', 'cancelled'],
}) => {
  const [webViewVisible, setWebViewVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const {
    getValues,
    formState: { errors },
  } = useFormContext();
  const {
    selectedHotel: item,
    rooms,
    adults,
    children,
    bookedToDate,
    bookedFromDate,
    selectedRoom,
  } = getValues();

  const handleNavigationStateChange = navState => {
    console.log(`${gatewayName} navigation state:`, navState.url);

    // Detect successful payment
    const isSuccess = successPatterns.some(pattern =>
      navState.url.includes(pattern),
    );

    // Detect cancelled payment
    const isCancelled = cancelPatterns.some(pattern =>
      navState.url.includes(pattern),
    );

    if (isSuccess) {
      console.log(`${gatewayName} payment successful`);
      setWebViewVisible(false);
      setLoading(false);
      onSuccess();
    }

    if (isCancelled) {
      console.log(`${gatewayName} payment cancelled`);
      setWebViewVisible(false);
      setLoading(false);
      onClose();
    }

    // Hide loading when page loads
    if (!navState.loading) {
      setLoading(false);
    }
  };

  const handleError = syntheticEvent => {
    const { nativeEvent } = syntheticEvent;
    console.error(`${gatewayName} WebView error:`, nativeEvent);
    setLoading(false);
    onError(nativeEvent.description || 'Payment failed');
  };

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  if (!webViewVisible) return null;

  return (
    <View
      style={{
        flex: 1,
        // height: '100%',
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        height: responsiveHeight(150),
        // height: 100,
        // backgroundColor: 'white',
        zIndex: 1000, // Ensure it's on top
        // overflow: 'scroll'
      }}
    >
      {/* Loading Indicator */}

      {/* WebView Container - Takes remaining space */}
      {/* <View
        style={{
          flex: 1, // This makes it take all remaining space
          backgroundColor: 'red',
        }}
      > */}
      <WebView
        source={{ uri: paymentUrl }}
        onNavigationStateChange={handleNavigationStateChange}
        onError={handleError}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        startInLoadingState={true}
        renderLoading={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
          >
            <ActivityIndicator size="large" />
            {/* <ThemedText styles="mt-4">Loading {gatewayName}@.</ThemedText> */}
          </View>
        )}
        // style={{ flex: 1 }} // WebView should also have flex: 1
      />
      {/* </View> */}
    </View>
  );
};

// Card Input Form
const CardInputForm = ({
  onCancel,
  onSubmit,
  type = 'stripe',
  amount,
  bookingResponse,
  bookingType,
}) => {
  // const [cardDetails, setCardDetails] = useState({
  //   number: '',
  //   expiry: '',
  //   cvc: '',
  //   name: '',
  //   email: '',
  // });
  const t = useT();

  const {
    getValues,
    formState: { errors },
  } = useFormContext();
  const {
    selectedHotel: item,
    rooms,
    adults,
    children,
    bookedToDate,
    bookedFromDate,
    selectedRoom,
    securityBookedFromDate,
    securityBookedToDate,
    selectedSecurity,
    selectedCar,
    carBookedFromDate,
    carBookedToDate,
    attractionDate,
    selectedAttraction,
    attractionTime,
    attractionAdults,
    attractionChildren,
  } = getValues();
  const [loading, setLoading] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [webViewType, setWebViewType] = useState('');
  // const theme = useColorScheme();

  console.log('LINE AT 4688', bookingResponse);

  const address = {
    // agencyName: item?.carBusinessName,
    address: selectedCar?.carAddress,
    city: selectedCar?.carCity,
    country: selectedCar?.carCountry,
    postal: selectedCar?.carPostalCode,
  };

  function formatDateDisplay(dateString) {
    if (!dateString) return '';
    return moment(dateString).format('MMM D, YYYY');
  }

  // Format day for display
  function formatDayDisplay(dateString) {
    if (!dateString) return '';
    return moment(dateString).format('dddd');
  }
  function getSelectedTimeSlot(attraction, timeSlotId) {
    if (!attraction || !timeSlotId) return null;

    for (const schedule of attraction.attractionSchedule) {
      const foundSlot = schedule.slots.find(slot => slot.id === timeSlotId);
      if (foundSlot) {
        return {
          from: formatTimeDisplay(foundSlot.from),
          to: formatTimeDisplay(foundSlot.to),
          displayTime: `${formatTimeDisplay(
            foundSlot.from,
          )} - ${formatTimeDisplay(foundSlot.to)}`,
        };
      }
    }
    return null;
  }
  function formatTimeDisplay(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    const hourInt = parseInt(hours, 10);
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const displayHour = hourInt % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  }
  const selectedTimeSlot = getSelectedTimeSlot(
    selectedAttraction,
    attractionTime,
  );

  const [payStackPayment] = usePayStackPaymentMutation();
  const [payment] = usePaymentMutation();

  // Stripe payment handler with WebView
  const handleStripePayment = async () => {
    try {
      setLoading(true);

      // Create Stripe Checkout Session
      const stripeResponse = await payment({
        id: bookingResponse?.data?.id,
        type: bookingType,
        inApp: true,
        returnUrl: 'serviceapp://payment-success', // Custom URL scheme for success
        cancelUrl: 'serviceapp://payment-cancel', // Custom URL scheme for cancel
      }).unwrap();

      console.log('Stripe payment response:', stripeResponse);

      let checkoutUrl = '';

      if (stripeResponse?.data?.url) {
        checkoutUrl = stripeResponse.data.url;
      } else if (stripeResponse?.url) {
        checkoutUrl = stripeResponse.url;
      } else if (stripeResponse?.data?.checkoutUrl) {
        checkoutUrl = stripeResponse.data.checkoutUrl;
      } else {
        throw new Error('No valid Stripe checkout URL received from server');
      }

      setPaymentUrl(checkoutUrl);
      setWebViewType('stripe');
      setShowWebView(true);
    } catch (error) {
      console.error('Stripe payment error:', error);
      Alert.alert(
        'Payment Error',
        error.message || 'Failed to process payment',
      );
      setLoading(false);
    }
  };

  // Paystack payment handler
  const handlePaystackPayment = async () => {
    try {
      setLoading(true);

      const paymentResponse = await payStackPayment({
        id: bookingResponse?.data?.id,
        type: bookingType,
        inApp: true,
        // cardDetails: {
        //   number: cardDetails.number.replace(/\s/g, ''),
        //   expiry: cardDetails.expiry,
        //   cvc: cardDetails.cvc,
        //   name: cardDetails.name,
        //   email: cardDetails.email,
        // },
      }).unwrap();

      console.log('Paystack payment response:', paymentResponse);

      let paymentUrls = '';

      if (paymentResponse?.data.authorization_url) {
        paymentUrls = paymentResponse?.data?.authorization_url;
      } else if (paymentResponse?.data?.checkoutUrl) {
        paymentUrls = paymentResponse?.data?.checkoutUrl;
      } else if (paymentResponse.reference) {
        paymentUrls = `https://paystack.com/pay/${paymentResponse?.data?.reference}`;
      } else {
        throw new Error('No valid payment URL received from server');
      }

      setPaymentUrl(paymentUrls);
      setWebViewType('paystack');
      setShowWebView(true);
    } catch (error) {
      console.error('Paystack payment error:', error);
      Alert.alert(
        'Payment Error',
        error.message || 'Failed to process payment',
      );
      setLoading(false);
    }
  };

  const handleWebViewSuccess = () => {
    setShowWebView(false);
    setLoading(false);
    onSubmit(); // Call the original onSubmit
  };

  const handleWebViewClose = () => {
    setShowWebView(false);
    setLoading(false);
    onCancel();
  };

  const handleWebViewError = error => {
    setShowWebView(false);
    setLoading(false);
    Alert.alert('Payment Error', error || `${webViewType} payment failed`);
  };

  const handleSubmit = async () => {
    if (type === 'paystack') {
      await handlePaystackPayment();
    } else {
      await handleStripePayment();
    }
  };

  // Show WebView if active
  if (showWebView) {
    return (
      <PaymentWebView
        paymentUrl={paymentUrl}
        onSuccess={handleWebViewSuccess}
        onClose={handleWebViewClose}
        onError={handleWebViewError}
        gatewayName={webViewType === 'stripe' ? 'Stripe' : 'Paystack'}
        successPatterns={
          webViewType === 'stripe'
            ? [
                '/success',
                'successful',
                'status=success',
                'return_url',
                'payment-success',
                'booking-confirmation',
              ]
            : ['/success', 'successful', 'status=success']
        }
        cancelPatterns={
          webViewType === 'stripe'
            ? ['/cancel', 'cancelled', 'payment-cancel']
            : ['/cancel', 'cancelled']
        }
      />
    );
  }

  // const formatCardNumber = text => {
  //   let cleaned = text.replace(/\D/g, '');
  //   if (cleaned.length > 0) {
  //     cleaned = cleaned.match(/.{1,4}/g).join(' ');
  //   }
  //   return cleaned;
  // };

  // const formatExpiry = text => {
  //   let cleaned = text.replace(/\D/g, '');
  //   if (cleaned.length > 2) {
  //     cleaned = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
  //   }
  //   return cleaned;
  // };

  // For Stripe, show a simple button to launch WebView
  if (type === 'stripe') {
    return (
      <ThemedView styles="flex-1 rounded-lg gap-4">
        <BookUserDetail />
        {bookingType === 'hotel' ? (
          <>
            <BookHotelDetail item={item} />
            <HotelBookingDetail
              item={selectedRoom}
              rooms={rooms}
              adults={adults}
              children={children}
              bookedToDate={bookedToDate}
              bookedFromDate={bookedFromDate}
            />
          </>
        ) : bookingType === 'security' ? (
          <>
            <ThemedView
              styles=""
              style={{
                gap: responsiveHeight(1),
              }}
            >
              <ThemedText styles="font-SemiBold text-lg mb-2">
                Security Details
              </ThemedText>

              {/* Security Guard Name */}
              <View className="flex-row justify-between items-center">
                <ThemedText3 styles="font-Medium">Guard Name:</ThemedText3>
                <ThemedText3 styles="font-Medium">
                  {selectedSecurity?.securityGuardName}
                </ThemedText3>
              </View>

              {/* Security Type */}

              {/* Category */}
              <View className="flex-row justify-between items-center">
                <ThemedText3 styles="font-Medium">Category:</ThemedText3>
                <ThemedText3 styles="font-Medium">
                  {selectedSecurity?.category}
                </ThemedText3>
              </View>

              {/* Address */}
              <View className="flex-row justify-between items-start">
                <ThemedText3 styles="font-Medium">Address:</ThemedText3>
                <ThemedText3
                  styles="font-Medium text-right"
                  style={{ flex: 1, marginLeft: 10 }}
                >
                  {selectedSecurity?.securityAddress},{' '}
                  {selectedSecurity?.securityCity},{' '}
                  {selectedSecurity?.securityDistrict},{' '}
                  {selectedSecurity?.securityCountry}
                </ThemedText3>
              </View>

              {/* Availability */}
            </ThemedView>
            <ThemedView
              styles=""
              style={{
                gap: responsiveHeight(1),
              }}
            >
              <ThemedText styles="font-SemiBold text-lg mb-2">
                {t('carPayment.scheduleTitle')}
              </ThemedText>
              <View className="flex-row justify-between items-center">
                <ThemedText3 styles="font-Medium">
                  {t('carPayment.from')} :
                </ThemedText3>
                <ThemedText3 styles="font-Medium">
                  {securityBookedFromDate}
                </ThemedText3>
              </View>
              <View className="flex-row justify-between items-center">
                <ThemedText3 styles="font-Medium">
                  {t('carPayment.to')} :{' '}
                </ThemedText3>
                <ThemedText3 styles="font-Medium">
                  {securityBookedToDate}
                </ThemedText3>
              </View>
            </ThemedView>
          </>
        ) : bookingType === 'car' ? (
          <>
            <BookedCar item={selectedCar} />
            <AgencyAddress address={address} />
            <ThemedView
              styles=""
              style={{
                gap: responsiveHeight(1),
              }}
            >
              <ThemedText styles="font-SemiBold text-lg mb-2">
                {t('carPayment.scheduleTitle')}
              </ThemedText>
              <View className="flex-row justify-between items-center">
                <ThemedText3 styles="font-Medium">
                  {t('carPayment.from')} :{' '}
                </ThemedText3>
                <ThemedText3 styles="font-Medium">
                  {carBookedFromDate}
                </ThemedText3>
              </View>
              <View className="flex-row justify-between items-center">
                <ThemedText3 styles="font-Medium">
                  {t('carPayment.to')} :{' '}
                </ThemedText3>
                <ThemedText3 styles="font-Medium">
                  {carBookedToDate}
                </ThemedText3>
              </View>
            </ThemedView>
          </>
        ) : (
          <>
            <View className="flex-row gap-2">
              <Image
                source={{
                  uri:
                    selectedAttraction?.attractionImages.length > 0
                      ? selectedAttraction?.attractionImages[0]
                      : 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
                style={{
                  width: responsiveWidth(10),
                  height: responsiveHeight(10),
                  objectFit: 'cover',
                  borderRadius: 12,
                }}
              />
              <View>
                <ThemedText styles="text-2xl font-Bold mb-2">
                  {selectedAttraction?.attractionDestinationType}
                </ThemedText>

                {/* Rating and Price */}
                <View className="flex-row items-center gap-1 w-2/3">
                  {/* <Ionicons name="location-outline" size={16} color="#facc15" /> */}
                  <Text className="ml-1 font-Medium text-sm text-yellow-600">
                    {selectedAttraction?.attractionAddress},{' '}
                    {selectedAttraction?.attractionCity},{' '}
                    {selectedAttraction?.attractionCountry}
                  </Text>
                </View>
              </View>
            </View>

            <ThemedView
              styles=""
              style={{
                gap: responsiveHeight(1),
              }}
            >
              <ThemedText styles="font-SemiBold text-lg mb-2">
                {t('carPayment.scheduleTitle')}
              </ThemedText>
              <View className="flex-row justify-between items-center">
                <ThemedText3 styles="font-Medium">
                  {/* {t('carPayment.date')} : */}
                  Date
                </ThemedText3>
                <ThemedText3 styles="font-Medium">
                  {formatDayDisplay(attractionDate)},{' '}
                  {formatDateDisplay(attractionDate)}
                </ThemedText3>
              </View>
              <View className="flex-row justify-between items-center">
                <ThemedText3 styles="font-Medium">
                  {/* {t('carPayment.time')} : */}
                  Time
                </ThemedText3>
                <ThemedText3 styles="font-Medium">
                  {selectedTimeSlot?.displayTime || attractionTime}
                </ThemedText3>
              </View>
            </ThemedView>

            <ThemedView styles="gap-2">
              <View className="gap-1 flex-row justify-between">
                <ThemedText3 className="font-Regular">
                  {t('hotelBooking.adults')}
                </ThemedText3>
                <ThemedText3 className="font-Medium">
                  {attractionAdults}
                </ThemedText3>
              </View>
              <View className="gap-1 flex-row justify-between">
                <ThemedText3 className="font-Regular">
                  {t('hotelBooking.children')}
                </ThemedText3>
                <ThemedText3 className="font-Medium">
                  {attractionChildren}
                </ThemedText3>
              </View>
            </ThemedView>
          </>
        )}

        <View className=" items-start bg-blue-50 p-3 rounded-lg border border-blue-200 gap-4">
          <View className="flex-row items-center ">
            {/* <CircleXIcon size={20} color={'red'} /> */}
            <Text className="text-blue-700 text-sm font-Medium">
              Free Cancellation Up to 24 hours
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <CreditCard size={20} color={'green'} />
            <Text className="text-blue-700 text-sm font-Medium">Pay online</Text>
          </View>
        </View>
        <View className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-4">
          <ThemedText styles="text-blue-800 dark:text-blue-200 font-SemiBold text-center">
            Total: {bookingResponse?.data?.displayCurrency} {(amount + calculatevatFee(amount)).toFixed(2)}
          </ThemedText>
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity
            className="flex-1 bg-gray-300 py-3 rounded-lg items-center"
            onPress={onCancel}
            disabled={loading}
          >
            <ThemedText>Cancel</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-primary py-3 rounded-lg items-center"
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <ThemedText styles="text-white">Next</ThemedText>
            )}
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  // Paystack form (with card input)
  return (
    <ThemedView styles="flex-1 rounded-lg gap-4">
      <BookUserDetail />
      <BookHotelDetail item={item} />
      <HotelBookingDetail
        item={selectedRoom}
        rooms={rooms}
        adults={adults}
        children={children}
        bookedToDate={bookedToDate}
        bookedFromDate={bookedFromDate}
      />

      <View className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-4">
        <ThemedText styles="text-blue-800 dark:text-blue-200 font-SemiBold text-center">
          Amount: {amount + calculatevatFee(amount)}
        </ThemedText>
      </View>

      <View className="flex-row gap-2">
        <TouchableOpacity
          className="flex-1 bg-gray-300 py-3 rounded-lg items-center"
          onPress={onCancel}
          disabled={loading}
        >
          <ThemedText>Cancel</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-primary py-3 rounded-lg items-center"
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <ThemedText styles="text-white">Pay Now</ThemedText>
          )}
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

// Main Payment Screen
const PaymentScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const { bookingResponse, bookingType } = route.params;

  const [selectedGateway, setSelectedGateway] = useState(null);
  const [detectingLocation, setDetectingLocation] = useState(true);
  const [paymentError, setPaymentError] = useState(null);

  const [addReviewHotel] = useAddReviewHotelMutation();
  const [addReviewSecurity] = useAddReviewSecurityMutation();
  const [addReviewCar] = useAddReviewCarMutation();
  const [addReviewAttraction] = useAddReviewAttractionMutation();

  console.log('Booking Response:', bookingResponse);

  useEffect(() => {
    detectUserLocation();
  }, []);

  const detectUserLocation = async () => {
    try {
      setDetectingLocation(true);
      const countryCode = await getCountryCode();
      const gateway = getPaymentGateway(countryCode);
      setSelectedGateway(gateway);
    } catch (error) {
      console.error('Error detecting location:', error);
      setSelectedGateway('stripe');
    } finally {
      setDetectingLocation(false);
    }
  };

  const handleStripePayment = async () => {
    // This will be handled in the CardInputForm component via WebView
    setModalVisible(true);
  };

  const handlePaystackPayment = async () => {
    // This will be handled in the CardInputForm component via WebView
    setModalVisible(true);
  };

  const handleCancelPayment = () => {
    navigation.goBack();
  };

  const handleSubmitRating = async ({ rating, comment }) => {
    try {
      let response;

      switch (bookingType) {
        case 'hotel':
          response = await addReviewHotel({
            roomId: bookingResponse?.data?.roomId,
            rating,
            comment,
          }).unwrap();
          break;

        case 'security':
          response = await addReviewSecurity({
            security_GuardId: bookingResponse?.data?.security_GuardId,
            rating,
            comment,
          }).unwrap();
          break;

        case 'car':
          response = await addReviewCar({
            carId: bookingResponse?.data?.carId,
            rating,
            comment,
          }).unwrap();
          break;

        case 'attraction':
          response = await addReviewAttraction({
            appealId: bookingResponse?.data?.appealId,
            rating,
            comment,
          }).unwrap();
          break;

        default:
          console.warn('Unknown booking type:', bookingType);
          return;
      }

      navigation.navigate('OrderSuccess');
    } catch (error) {
      console.error('Error submitting review:', error);
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    }
  };

  if (detectingLocation) {
    return (
      <ThemedView
        styles="flex-1 justify-center items-center"
        style={{
          paddingHorizontal: responsiveWidth(6),
          paddingVertical: responsiveHeight(5),
        }}
      >
        <ActivityIndicator size="large" />
        <ThemedText styles="mt-4">Setting up secure payment.</ThemedText>
      </ThemedView>
    );
  }

  return (

      <ThemedView
        styles="flex-1"
        style={{
          paddingHorizontal: responsiveWidth(6),
          paddingVertical: responsiveHeight(5),
          gap: responsiveHeight(3),
        }}
      >
        <GoBack navigation={navigation} />
        <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
          <View className="flex-1 gap-8 ">
            {paymentError && (
              <View className="p-3 bg-red-100 rounded-lg">
                <ThemedText styles="text-red-600">{paymentError}</ThemedText>
              </View>
            )}

            {selectedGateway && (
              <CardInputForm
                type={selectedGateway}
                onCancel={handleCancelPayment}
                onSubmit={
                  selectedGateway === 'stripe'
                    ? handleStripePayment
                    : handlePaystackPayment
                }
                amount={bookingResponse?.data?.totalPrice}
                bookingResponse={bookingResponse}
                bookingType={bookingType}
              />
            )}

            <ThemedView styles="p-4 rounded-lg">

            </ThemedView>
          </View>
        </ScrollView>

        <RatingModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            navigation.navigate('OrderSuccess');
          }}
          onSubmit={handleSubmitRating}
        />
      </ThemedView>
  );
};

export default PaymentScreen;
