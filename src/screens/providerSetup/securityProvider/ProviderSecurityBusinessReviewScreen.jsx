/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  // KeyboardAvoidingView,
  // Platform,
  // TouchableWithoutFeedback,
  // Keyboard,
  ScrollView,
  // useColorScheme,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {  useFormContext } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import ThemedReviewComponent from '@/utils/ThemedReviewComponent';
import ThemedView from '@/utils/ThemedView';
import ThemedText from '@/utils/ThemedText';
// import WeeklySchedule from '@/components/WeeklySchedule';
import Button from '@/components/Button';
import GoBack from '@/components/GoBack';
import ThemedText3 from '@/utils/ThemedText3';
// import DocumentsUploadUI from '@/components/DocumentUploadUI';
// import { useDocumentsPicker } from '@/utils/useDocumentsPicker';
import { useCreateSecurityMutation } from '@/redux/slices/providerSlice/securitySlice';
import SuccessModal from '@/components/SuccessModal';
// import Feather from 'react-native-vector-icons/Feather';
import { openDocument } from '@/utils/useDocumentViewer';
import { Eye } from 'lucide-react-native';

const ProviderSecurityBusinessReviewScreen = () => {
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
  // const { pickDocuments } = useDocumentsPicker();

  const [createSecurity] = useCreateSecurityMutation();

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
          Review Security Details
        </ThemedText>
      </View>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        className="flex-1"
      > */}
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1"> */}
      <ScrollView
        className="flex-grow"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: responsiveHeight(2),
        }}
      >
        <ThemedReviewComponent
          label="Business Name"
          ans={getValues('securityBusinessName') || 'Not provided'}
        />
        <ThemedReviewComponent
          label="Full Name"
          ans={getValues('securityName') || 'Not provided'}
        />
        <ThemedReviewComponent
          label="Business Type"
          ans={getValues('securityBusinessType') || 'Not provided'}
        />
        <ThemedReviewComponent
          label="Government Registration Number"
          ans={getValues('securityRegNum') || 'Not provided'}
        />
        <ThemedReviewComponent
          label="Date of Business Registration"
          ans={getValues('securityRegDate') || 'Not provided'}
        />
        <ThemedReviewComponent
          label="Phone"
          ans={getValues('securityPhone') || 'Not provided'}
        />
        <ThemedReviewComponent
          label="Protocol Type"
          ans={getValues('securityProtocolType') || 'Not provided'}
        />
        <ThemedReviewComponent
          label="Email"
          ans={getValues('securityEmail') || 'Not provided'}
        />

        {/* Business Logo */}
        <ThemedText3 styles="font-Medium text-md mb-1">
          Business Logo
        </ThemedText3>
        {getValues('businessLogo') ? (
          <Image
            source={{ uri: getValues('businessLogo') }}
            style={{
              width: responsiveWidth(42),
              height: responsiveHeight(20),
              marginBottom: responsiveHeight(2),
              resizeMode: 'cover',
              borderRadius: 10,
            }}
          />
        ) : (
          <Text className="text-red-500 font-Medium">No Logo Uploaded</Text>
        )}

        {/* Professional Details Section */}
        {/* <ThemedText styles="font-SemiBold text-lg mt-4">
          Professional Details
        </ThemedText> */}

        <ThemedReviewComponent
          label="Security Tagline"
          ans={getValues('securityTagline') || 'Not provided'}
        />
        <ThemedReviewComponent
          label="Description"
          ans={getValues('securityProtocolDescription') || 'Not provided'}
        />
        <ThemedReviewComponent
          label="Booking Condition"
          ans={getValues('securityBookingCondition') || 'Not provided'}
        />
        <ThemedReviewComponent
          label="Cancellation Policy"
          ans={getValues('securityCancelationPolicy') || 'Not provided'}
        />

        {/* Business Registration and Policy Docs */}
        <ThemedText3 styles="font-Medium text-md mb-1">
          Business Registration and Policy Docs
        </ThemedText3>
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

      {/* </TouchableWithoutFeedback> */}
      <View style={{
          marginBottom: responsiveHeight(5)
        }}>
        <Button
          title="Submit"
          navigation={navigation}
          path="ProviderCarBusinessListing"
          // ids={[
          //   'buisnessSecurityName',
          //   'buisnessSecurityId',
          //   'buisnessSecurityDob',
          //   'hotelAddress', // used multiple times, but included once
          //   'hotelCity',
          //   'hotelDistrict',
          //   'hotelCountry',
          //   'buisnessSecurityDescription',
          //   'buisnessSecurityPhotos',
          //   'providerSetupSecurityPrice',
          //   'buisnessCarServices',
          //   'buisnessCarCategory',
          // ]}
          onComplete={() => setShowModal(true)}
          submission={createSecurity}
          isSecurityCreate={true}
        />
      </View>
      <SuccessModal visible={showModal} setVisible={setShowModal} />
      {/* </KeyboardAvoidingView> */}
    </ThemedView>
  );
};

export default ProviderSecurityBusinessReviewScreen;
