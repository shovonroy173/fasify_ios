/* eslint-disable react-native/no-inline-styles */
import {
  View,
  // Text,
  // KeyboardAvoidingView,
  // Platform,
  // TouchableWithoutFeedback,
  // Keyboard,
  ScrollView,
  // useColorScheme,
  // Pressable,
  // Image,
  // Text,
  // FlatList,
//   Pressable,
  Image,
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
// import WeeklySchedule from '@/components/WeeklySchedule';
import Button from '@/components/Button';
// import { useDocumentsPicker } from '@/utils/useDocumentsPicker';
import SuccessModal from '@/components/SuccessModal';
import { useCreateCarListingMutation } from '@/redux/slices/providerSlice/carSlice';

// import { openDocument } from '@/utils/useDocumentViewer';
// import Feather from 'react-native-vector-icons/Feather';

const ProviderCarBusinessListingReviewScreen = () => {
  const {
    // control,
    // formState: { errors },
    // watch,
    getValues,
  } = useFormContext();

  // const theme = useColorScheme();
  const navigation = useNavigation();
  // const [photoPath, setPhotoPath] = useState();
  // const [modalVisible, setModalVisible] = useState(false);
  //   const { pickFromGallery } = useImagePicker();
  const [showModal, setShowModal] = useState(false);

  // const themedLabelClasses = `${
  //   theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
  // } text-md`;
  // const { pickDocuments } = useDocumentsPicker();
  const [createCarListing] = useCreateCarListingMutation();
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
          Review Car Listing Details
        </ThemedText>
      </View>

      <ScrollView
        className="flex-grow"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: responsiveHeight(2),
        }}
      >

        {/* Location Details */}
        {/* <ThemedText styles="font-SemiBold text-lg">Location Details</ThemedText> */}
        <ThemedReviewComponent
          label="Address"
          ans={getValues('carAddress') || ''}
        />
        <ThemedReviewComponent
          label="Postal Code"
          ans={getValues('carPostalCode') || ''}
        />
        <ThemedReviewComponent label="City" ans={getValues('carCity') || ''} />
        <ThemedReviewComponent
          label="District/State"
          ans={getValues('carDistrict') || ''}
        />
        <ThemedReviewComponent
          label="Country"
          ans={getValues('carCountry') || ''}
        />

        {/* Car Description & Images */}
        <ThemedReviewComponent
          label="Car Description"
          ans={getValues('carDescription') || ''}
        />



        <ThemedText3 styles="font-Medium text-md mt-4">
          Uploaded Car Images
        </ThemedText3>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {getValues('carImages')?.length > 0 ? (
            getValues('carImages').map((item, index) => (
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
            ))
          ) : (
            <Text className="text-gray-500">No Car Images Uploaded</Text>
          )}
        </View>

        <ThemedReviewComponent
          label="Services Offered"
          ans={getValues('carServicesOffered') || ''}
        />

        {/* Car Specifications */}
        {/* <ThemedText styles="font-SemiBold text-lg">Car Specifications</ThemedText> */}
        <ThemedReviewComponent
          label="Car Type"
          ans={getValues('carType') || ''}
        />
        <ThemedReviewComponent
          label="Car Seats"
          ans={getValues('carSeats') || ''}
        />
        <ThemedReviewComponent
          label="Fuel Type"
          ans={getValues('fuelType') || ''}
        />
        <ThemedReviewComponent
          label="Oil Type"
          ans={getValues('carOilType') || ''}
        />
        <ThemedReviewComponent
          label="Engine Type"
          ans={getValues('carEngineType') || ''}
        />
        <ThemedReviewComponent
          label="Transmission"
          ans={getValues('carTransmission') || ''}
        />
        <ThemedReviewComponent
          label="Power (HP)"
          ans={getValues('carPower') || ''}
        />
        <ThemedReviewComponent
          label="Drivetrain"
          ans={getValues('carDrivetrain') || ''}
        />
        <ThemedReviewComponent
          label="Mileage"
          ans={getValues('carMileage') || ''}
        />
        <ThemedReviewComponent
          label="Car Model"
          ans={getValues('carModel') || ''}
        />
        <ThemedReviewComponent
          label="Capacity"
          ans={getValues('carCapacity') || ''}
        />
        <ThemedReviewComponent
          label="Car Color"
          ans={getValues('carColor') || ''}
        />
        <ThemedReviewComponent
          label="Gear Type"
          ans={getValues('gearType') || ''}
        />

        {/* Pricing & Rating */}

        <ThemedReviewComponent
          label="Rating"
          ans={getValues('carRating') || ''}
        />
        <ThemedReviewComponent
          label="Price Per Day"
          ans={getValues('carPriceDay') || ''}
        />
        <ThemedReviewComponent
          label="Currency"
          ans={getValues('currency') || ''}
        />
        {/* <ThemedReviewComponent
          label="Discount %"
          ans={getValues('discount') || ''}
        /> */}
        <ThemedReviewComponent label="VAT %" ans={getValues('vat') || ''} />
        <ThemedReviewComponent
          label="Category"
          ans={getValues('category') || ''}
        />

    
      </ScrollView>


      <View  style={{
            marginBottom: responsiveHeight(6),
          }}>
        <Button
          title="Submit"
          navigation={navigation}
          path="ProviderBottomTab" // Or string / object if you want navigation
          // ids={[
          //   'providerVehicleName',
          //   'providerVehiclePrice',
          //   'providerVehicleCity',
          //   'providerVehicleImage',
          // ]}
          // onComplete={() => setShowModal(true)} // ✅ Modal will show only if form is valid

          onComplete={() => setShowModal(true)}
          submission={createCarListing}
          isCarListingCreate={true}
        />
      </View>
      <SuccessModal visible={showModal} setVisible={setShowModal} />
    </ThemedView>
  );
};

export default ProviderCarBusinessListingReviewScreen;
