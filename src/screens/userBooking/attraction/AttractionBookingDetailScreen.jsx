/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  // Modal,
  // TouchableOpacity,
  Image,
} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
import useT from '@/utils/useT';
import { useFormContext } from 'react-hook-form';

export default function AttractionBookingDetailScreen() {
  const [showAvailability, setShowAvailability] = useState(false);
  const navigation = useNavigation();
  const t = useT();
  const { getValues, watch } = useFormContext();
  // const { selectedAttraction } = getValues();
  const selectedAttraction = watch('selectedAttraction');
  console.log('LINE AT 33', selectedAttraction);

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
            uri:
              selectedAttraction?.attractionImages.length > 0
                ? selectedAttraction?.attractionImages[0]
                : 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
        {/* Description */}
        <View className="mb-6">
          <ThemedText styles="text-lg font-SemiBold mb-2 ">
            {t('attractionDetail.descriptionTitle')}
          </ThemedText>
          <Text className="text-gray-500 leading-relaxed">
            {selectedAttraction?.attractionDescription}
          </Text>
        </View>

        {/* Rating Breakdown */}
        <View className="mb-6">
          <View className="flex-row items-center">
            {/* <FontAwesome name="star" size={16} color="#facc15" /> */}
            <Text className="ml-1 font-Medium text-sm text-yellow-600">
              {selectedAttraction?.attractionRating}
            </Text>
            <Text className="ml-1 text-sm text-gray-500 font-Regular">
              ({selectedAttraction?.attractionReviewCount}{' '}
              {t('attractionDetail.ratingText')})
            </Text>
          </View>
          {[
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
          ))}
        </View>

        {/* Visitor Review */}
        {/* <ThemedView styles=" border  p-4 rounded-lg mb-6">
          <View className="flex-row items-center mb-2">
            <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
              <Ionicons name="person" size={16} color="white" />
            </View>
            <View className="ml-3">
              <ThemedText styles="font-Medium ">Sariya</ThemedText>
              <Text className="text-sm text-gray-500">
                United Arab Emirates
              </Text>
            </View>
          </View>
          <View className="flex-row mb-2">
            {[...Array(5)].map((_, i) => (
              <FontAwesome key={i} name="star" size={16} color="#facc15" />
            ))}
          </View>
          <Text className="text-sm text-gray-700">
            A must-see place when in Dubai. Well organized and great service.
          </Text>
          <Text className="text-xs text-gray-500 mt-2">
            Posted 1 year ago on TripAdvisor
          </Text>
        </ThemedView> */}

        {/* What's Included */}
        <View className="mb-6">
          <ThemedText styles="text-lg font-Semibold mb-2 ">
            {t('attractionDetail.whatsIncludedTitle')}
          </ThemedText>
          {/* <View className="flex-row items-center mb-2">
            <Ionicons name="wifi" size={16} color="#9ca3af" />
            <Text className="ml-2 text-gray-700">WiFi access</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <MaterialCommunityIcons
              name="telescope"
              size={16}
              color="#9ca3af"
            />
            <Text className="ml-2 text-gray-700">Use of a telescope</Text>
          </View> */}
          {selectedAttraction?.attractionServicesOffered.map((item, index) => (
            <Text key={index} className="ml-2 text-gray-700">
              {item}
            </Text>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Booking Bar */}
      <View className=" flex-row items-center justify-between pb-5">
        <ThemedText styles="text-lg font-Bold w-1/2">
          {t('attractionDetail.fromPrice')}{' '}
          {selectedAttraction?.displayCurrency}{' '}
          {selectedAttraction?.convertedAdultPrice}
        </ThemedText>
        <Pressable
          onPress={() => navigation.navigate('UserAttractionCredential')}
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          <ThemedText2 styles=" font-Medium">
            {t('attractionDetail.seeAvailability')}
          </ThemedText2>
        </Pressable>
      </View>
    </ThemedView>
  );
}
