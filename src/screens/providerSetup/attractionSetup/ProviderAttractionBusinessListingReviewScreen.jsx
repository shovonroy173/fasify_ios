

/* eslint-disable react-native/no-inline-styles */
import {
  View,
  ScrollView,
  Image,
  // FlatList,
  // Pressable,
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
import { useCreateAttractionListingMutation,} from '@/redux/slices/providerSlice/attractionSlice';
// import { openDocument } from '@/utils/useDocumentViewer';
// import Feather from 'react-native-vector-icons/Feather';

const ProviderAttractionBusinessListingReviewScreen = () => {
  const {
    getValues,
  } = useFormContext();
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const [createAttractionListing] = useCreateAttractionListingMutation();
  
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
        <ThemedText styles="font-SemiBold text-xl">
          Review Attraction Listing Information
        </ThemedText>
      </View>
      
      <ScrollView
        className="flex-grow"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: responsiveHeight(2),
        }}
      >
        <ThemedText styles="font-SemiBold text-lg">
          Attraction Details
        </ThemedText>

        <ThemedReviewComponent
          label="Destination Type"
          ans={getValues('attractionDestinationType') || ''}
        />
        <ThemedReviewComponent
          label="Description"
          ans={getValues('attractionDescription') || ''}
        />
        <ThemedReviewComponent
          label="Services Offered"
          ans={getValues('attractionServicesOffered') || ''}
        />
        <ThemedReviewComponent
          label="Rating"
          ans={getValues('attractionRating') || ''}
        />
         <ThemedReviewComponent
          label="Currency"
          ans={getValues('currency') || ''}
        />
        <ThemedReviewComponent
          label="Adult Price"
          ans={getValues('attractionAdultPrice') || ''}
        />
        <ThemedReviewComponent
          label="Child Price"
          ans={getValues('attractionChildPrice') || ''}
        />
        <ThemedReviewComponent
          label="Category"
          ans={getValues('category') || ''}
        />
        <ThemedReviewComponent
          label="Discount"
          ans={getValues('discount') ? `${getValues('discount')}%` : '0%'}
        />
        {/* <ThemedReviewComponent
          label="VAT"
          ans={getValues('vat') ? `${getValues('vat')}%` : '0%'}
        /> */}

        <ThemedText styles="font-SemiBold text-lg">
          Location Information
        </ThemedText>

        <ThemedReviewComponent
          label="Address"
          ans={getValues('attractionAddress') || ''}
        />
        <ThemedReviewComponent
          label="City"
          ans={getValues('attractionCity') || ''}
        />
        <ThemedReviewComponent
          label="Postal Code"
          ans={getValues('attractionPostalCode') || ''}
        />
        <ThemedReviewComponent
          label="District / State / Province"
          ans={getValues('attractionDistrict') || ''}
        />
        <ThemedReviewComponent
          label="Country"
          ans={getValues('attractionCountry') || ''}
        />

        <ThemedText styles="font-SemiBold text-lg">
          Amenities
        </ThemedText>

        <View style={{ gap: responsiveHeight(1) }}>
          <ThemedReviewComponent
            label="Free WiFi"
            ans={getValues('attractionFreeWifi') ? 'Yes' : 'No'}
          />
          <ThemedReviewComponent
            label="Free Parking"
            ans={getValues('attractionFreeParking') ? 'Yes' : 'No'}
          />
          <ThemedReviewComponent
            label="Kitchen"
            ans={getValues('attractionKitchen') ? 'Yes' : 'No'}
          />
          <ThemedReviewComponent
            label="TV"
            ans={getValues('attractionTv') ? 'Yes' : 'No'}
          />
          <ThemedReviewComponent
            label="Air Conditioning"
            ans={getValues('attractionAirConditioning') ? 'Yes' : 'No'}
          />
          <ThemedReviewComponent
            label="Pool"
            ans={getValues('attractionPool') ? 'Yes' : 'No'}
          />
        </View>

        <ThemedText3 styles="font-Medium text-md mb-1">
          Attraction Photos
        </ThemedText3>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {getValues('attractionImages')?.length > 0 ? (
            getValues('attractionImages').map((item, index) => (
              <Image
                key={index}
                source={{ uri: item.uri || item }}
                style={{
                  width: responsiveWidth(42),
                  height: responsiveHeight(30),
                  marginBottom: responsiveHeight(2),
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}
              />
            ))
          ) : (
            <Text className="text-red-500 font-Medium">No Photos Uploaded</Text>
          )}
        </View>
        
      </ScrollView>

      <View style={{
          marginBottom: responsiveHeight(5)
        }}>
        <Button
          title="Submit"
          navigation={navigation}
          path="ProviderBottomTab"
          onComplete={() => setShowModal(true)}
          submission={createAttractionListing}
          isAttractionListingCreate={true}
        />
      </View>
      <SuccessModal visible={showModal} setVisible={setShowModal} />
    </ThemedView>
  );
};

export default ProviderAttractionBusinessListingReviewScreen;