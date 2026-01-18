/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useFormContext } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import ThemedReviewComponent from '@/utils/ThemedReviewComponent';
import ThemedView from '@/utils/ThemedView';
import ThemedText from '@/utils/ThemedText';
import Button from '@/components/Button';
import GoBack from '@/components/GoBack';
import ThemedText3 from '@/utils/ThemedText3';
import {
  useCreateSecurityListingMutation,
  useCreateSecurityMutation,
} from '@/redux/slices/providerSlice/securitySlice';
import SuccessModal from '@/components/SuccessModal';
// import Feather from 'react-native-vector-icons/Feather';
import { openDocument } from '@/utils/useDocumentViewer';
import { Eye } from 'lucide-react-native';

const ProviderSecurityListingReviewScreen = () => {
  const { getValues } = useFormContext();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [createSecurityListing] = useCreateSecurityListingMutation();

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
          Review Listing Details
        </ThemedText>
      </View>

      <ScrollView
        className="flex-grow"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: responsiveHeight(2),
        }}
      >
        {/* Basic Information */}
        <ThemedText styles="font-SemiBold text-lg">
          Basic Information
        </ThemedText>

        <ThemedReviewComponent
          label="Security Guard Name"
          ans={getValues('securityGuardName') || 'Not provided'}
        />
        <ThemedReviewComponent
          label="Description"
          ans={getValues('securityGuardDescription') || 'Not provided'}
        />

        {/* Address Information */}
        <ThemedText styles="font-SemiBold text-lg mt-4">
          Address Information
        </ThemedText>

        <ThemedReviewComponent
          label="Address"
          ans={getValues('securityAddress') || 'Not provided'}
        />
        <ThemedReviewComponent
          label="Postal Code"
          ans={getValues('securityPostalCode') || 'Not provided'}
        />
        <ThemedReviewComponent
          label="District"
          ans={getValues('securityDistrict') || 'Not provided'}
        />
        <ThemedReviewComponent
          label="City"
          ans={getValues('securityCity') || 'Not provided'}
        />
        <ThemedReviewComponent
          label="Country"
          ans={getValues('securityCountry') || 'Not provided'}
        />

        {/* Professional Information */}
        <ThemedText styles="font-SemiBold text-lg mt-4">
          Professional Information
        </ThemedText>

        <ThemedReviewComponent
          label="Experience (Years)"
          ans={
            getValues('experience')
              ? `${getValues('experience')} years`
              : 'Not provided'
          }
        />
        <ThemedReviewComponent
          label="Certification"
          ans={getValues('certification') || 'Not provided'}
        />

        {/* Services & Languages */}
        <ThemedText styles="font-SemiBold text-lg mt-4">
          Services & Languages
        </ThemedText>

        <ThemedReviewComponent
          label="Services Offered"
          ans={
            Array.isArray(getValues('securityServicesOffered'))
              ? getValues('securityServicesOffered').join(', ')
              : getValues('securityServicesOffered') || 'Not provided'
          }
        />
        <ThemedReviewComponent
          label="Languages Spoken"
          ans={
            Array.isArray(getValues('languages'))
              ? getValues('languages').join(', ')
              : getValues('languages') || 'Not provided'
          }
        />

        {/* Availability & Schedule */}
        <ThemedText styles="font-SemiBold text-lg mt-4">
          Availability
        </ThemedText>

        <ThemedReviewComponent
          label="Availability"
          ans={getValues('availability') || 'Not provided'}
        />

        {/* Weekly Schedule */}
        <ThemedText3 styles="font-Medium text-md mb-1">
          Booking Available Days
        </ThemedText3>
        {getValues('securityBookingAbleDays') ? (
          <Text className="text-green-600 font-Medium">
            Weekly schedule configured
          </Text>
        ) : (
          <Text className="text-red-500 font-Medium">
            No schedule configured
          </Text>
        )}

        {/* Pricing & Rating */}
        <ThemedText styles="font-SemiBold text-lg mt-4">
          Pricing & Rating
        </ThemedText>

        <ThemedReviewComponent
          label="Rating"
          ans={getValues('securityRating') || 'Not rated'}
        />
        <ThemedReviewComponent
          label="Price Per Day"
          ans={
            getValues('securityPriceDay')
              ? ` ${getValues('securityPriceDay')}`
              : 'Not provided'
          }
        />
        <ThemedReviewComponent
          label="currency"
          ans={getValues('currency') || 'Not added'}
        />
        <ThemedReviewComponent
          label="Discount"
          ans={
            getValues('discount') ? `${getValues('discount')}%` : 'No discount'
          }
        />
        {/* <ThemedReviewComponent
          label="VAT"
          ans={getValues('vat') ? `${getValues('vat')}%` : '0%'}
        /> */}
        <ThemedReviewComponent
          label="Category"
          ans={getValues('category') || 'Not categorized'}
        />

        {/* Images */}
        <ThemedText styles="font-SemiBold text-lg mt-4">
          Security Images
        </ThemedText>

        {getValues('securityImages')?.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {getValues('securityImages').map((item, index) => (
              <Image
                key={index}
                source={{ uri: item }}
                style={{
                  width: responsiveWidth(42),
                  height: responsiveHeight(20),
                  marginBottom: responsiveHeight(2),
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}
              />
            ))}
          </View>
        ) : (
          <Text className="text-red-500 font-Medium">No Photos Uploaded</Text>
        )}

        {/* Business Registration and Policy Docs */}
        <ThemedText styles="font-SemiBold text-lg mt-4">
          Business Registration and Policy Docs
        </ThemedText>

        {getValues('securityDocs')?.length > 0 ? (
          <FlatList
            data={getValues('securityDocs')}
            scrollEnabled={false}
            keyExtractor={(item, index) => item.uri + index}
            renderItem={({ item }) => (
              <View className="flex-row items-center gap-3 py-2">
                <Pressable onPress={() => openDocument(item)}>
                  {/* <Feather name="eye" size={18} color="#3b82f6" /> */}
                  <Eye size={18} color="#3b82f6"/>
                </Pressable>
                <Text numberOfLines={1} className="flex-1">
                  {item.name || 'Document'}
                </Text>
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
          path="ProviderBottomTab"
          //   ids={[
          //     'securityGuardName',
          //     'securityGuardDescription',
          //     'securityAddress',
          //     'securityPostalCode',
          //     'securityDistrict',
          //     'securityCity',
          //     'securityCountry',
          //     'experience',
          //     'certification',
          //     'securityServicesOffered',
          //     'languages',
          //     'availability',
          //     'securityRating',
          //     'securityPriceDay',
          //     'discount',
          //     'vat',
          //     'category',
          //     'securityBookingAbleDays',
          //     'securityImages',
          //     'securityDocs',
          //   ]}
          onComplete={() => setShowModal(true)}
          submission={createSecurityListing}
          isSecurityProfileCreate={true}
        />
      </View>

      <SuccessModal visible={showModal} setVisible={setShowModal} />
    </ThemedView>
  );
};

export default ProviderSecurityListingReviewScreen;
