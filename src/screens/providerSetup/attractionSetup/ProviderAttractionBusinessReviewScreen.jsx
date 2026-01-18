/* eslint-disable react-native/no-inline-styles */
import {
  View,
  ScrollView,
  Image,
  FlatList,
  Pressable,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useFormContext } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import ThemedView from '@/utils/ThemedView';
import GoBack from '@/components/GoBack';
import ThemedText from '@/utils/ThemedText';
import ThemedReviewComponent from '@/utils/ThemedReviewComponent';
import ThemedText3 from '@/utils/ThemedText3';
import Button from '@/components/Button';
import SuccessModal from '@/components/SuccessModal';
import { useCreateAttractionMutation } from '@/redux/slices/providerSlice/attractionSlice';
import { openDocument } from '@/utils/useDocumentViewer';
// import Feather from 'react-native-vector-icons/Feather';

const ProviderAttractionBusinessReviewScreen = () => {
  const { getValues } = useFormContext();
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const [createAttraction] = useCreateAttractionMutation();

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(5),
        paddingBottom: responsiveHeight(2),
        gap: responsiveHeight(5),
      }}
    >
      <View className="gap-5">
        <GoBack navigation={navigation} />
      </View>

      <ScrollView
        className="flex-grow"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: responsiveHeight(2),
        }}
      >
        <ThemedText styles="font-SemiBold text-xl">
          Review Attraction Business Information
        </ThemedText>

        <ThemedReviewComponent
          label="Business Name"
          ans={getValues('attractionBusinessName') || ''}
        />
        <ThemedReviewComponent
          label="Full Name"
          ans={getValues('attractionName') || ''}
        />
        <ThemedReviewComponent
          label="Business Type"
          ans={getValues('attractionBusinessType') || ''}
        />
        <ThemedReviewComponent
          label="Government Registration Number"
          ans={getValues('attractionRegNum') || ''}
        />
        <ThemedReviewComponent
          label="Date of Business Registration (DOB)"
          ans={getValues('attractionRegDate') || ''}
        />
        <ThemedReviewComponent
          label="Phone"
          ans={getValues('attractionPhone') || ''}
        />
        <ThemedReviewComponent
          label="Email"
          ans={getValues('attractionEmail') || ''}
        />

        <ThemedReviewComponent
          label="Business Tagline"
          ans={getValues('attractionBusinessTagline') || ''}
        />
        <ThemedReviewComponent
          label="Business Description"
          ans={getValues('attractionBusinessDescription') || ''}
        />

        <ThemedText3 styles="font-Medium text-md mb-1">
          Business Logo
        </ThemedText3>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {getValues('businessLogo') ? (
            <Image
              source={{ uri: getValues('businessLogo') }}
              style={{
                width: responsiveWidth(88),
                height: responsiveHeight(30),
                marginBottom: responsiveHeight(2),
                resizeMode: 'cover',
                borderRadius: 10,
              }}
            />
          ) : (
            <Text className="text-red-500 font-Medium">
              No Business Logo Uploaded
            </Text>
          )}
        </View>

        <ThemedReviewComponent
          label="Booking Condition"
          ans={getValues('attractionBookingCondition') || ''}
        />
        <ThemedReviewComponent
          label="Cancelation Policy"
          ans={getValues('attractionCancelationPolicy') || ''}
        />

        <ThemedText3 styles="font-Medium text-md mb-1">
          Business Registration and Policy Docs
        </ThemedText3>
        {getValues('attractionDocs')?.length > 0 ? (
          <FlatList
            data={getValues('attractionDocs')}
            keyExtractor={(d, i) => d.uri + i}
            renderItem={({ item }) => (
              <View className="flex-row items-center gap-3">
                <Pressable onPress={() => openDocument(item)}>
                  {/* <Feather name="eye" size={18} color="#3b82f6" /> */}
                </Pressable>
                <Text numberOfLines={1}>{item.name}</Text>
              </View>
            )}
          />
        ) : (
          <Text className="text-red-500 font-Medium">
            No Documents Uploaded
          </Text>
        )}
      </ScrollView>

      <View style={{
          marginBottom: responsiveHeight(5)
        }}>
        <Button
          title="Submit"
          navigation={navigation}
          path="ProviderAttractionBusinessListing"
          onComplete={() => setShowModal(true)}
          submission={createAttraction}
          isAttractionCreate={true}
        />
      </View>
      <SuccessModal visible={showModal} setVisible={setShowModal} />
    </ThemedView>
  );
};

export default ProviderAttractionBusinessReviewScreen;
