import {
  View,
  // Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  useColorScheme,
} from 'react-native';
import React, { useState } from 'react';
import ThemedView from '@/utils/ThemedView';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedTextInput from '@/utils/ThemedTextInput';
import { Controller, useFormContext } from 'react-hook-form';
import GoBack from '@/components/GoBack';
import TitleComponent from '@/components/TitleComponent';
import { useNavigation } from '@react-navigation/native';
import DropdownBox from '@/components/DropdownBox';
import { countries, hotelAccomodationTypes, hotelBusinessTypes } from '@/../assets/data/data';
import ThemedText3 from '@/utils/ThemedText3';
import Button from '@/components/Button';
import DatePicker from '@/components/DatePicker';
import ThemedTextArea from '@/utils/ThemedTextArea';
import ImageUploadUI from '@/components/ImageUploadUI';
import ImagePickerModal from '@/utils/ImagePickerModal';
import DocumentsUploadUI from '@/components/DocumentUploadUI';
import { useImagePicker } from '@/utils/useImagePicker';
import { useDocumentsPicker } from '@/utils/useDocumentsPicker';
import ThemedText from '@/utils/ThemedText';


const ProviderHotelBusinessDetailScreen = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const theme = useColorScheme();
  const navigation = useNavigation();
  const themedLabelClasses = `${
    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
  } text-md`;
  const [modalVisible, setModalVisible] = useState(false);
  const { pickFromGallery } = useImagePicker();
  const { pickDocuments } = useDocumentsPicker();

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

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: responsiveHeight(2),
            paddingBottom: responsiveHeight(2),
          }}
          keyboardShouldPersistTaps="handled"
        >
          <TitleComponent
            title="Business Details"
            subTitle="Please provide business information so we can setup your account."
          />
          <ThemedTextInput
            name="hotelBusinessName"
            control={control}
            error={errors?.hotelBusinessName?.message}
            label="Business Name"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextInput
            name="hotelName"
            control={control}
            error={errors?.hotelName?.message}
            label="Full Name"
            placeholder="Type here..."
            type="text"
          />
          <View>
            <ThemedText styles={` font-Medium text-md mb-1`}>
              Business Type
            </ThemedText>
            <DropdownBox
              name="hotelBusinessType"
              options={hotelBusinessTypes}
              zIndex={1000}
            />
          </View>
          <ThemedTextInput
            name="hotelRegNum"
            control={control}
            error={errors?.hotelRegNum?.message}
            label="Government Registration Number"
            placeholder="Type here..."
            type="text"
          />
          <DatePicker
            name="hotelRegDate"
            control={control}
            label="Date of Business Registration (DOB)"
            error={errors?.hotelRegDate?.message}
          />
          <ThemedTextInput
            name="hotelPhone"
            control={control}
            error={errors?.hotelPhone?.message}
            label="Phone"
            placeholder="Type here..."
            type="number"
          />
          <ThemedTextInput
            name="hotelEmail"
            control={control}
            error={errors?.hotelEmail?.message}
            label="Email"
            placeholder="Type here..."
            type="email"
          />
          <ThemedTextInput
            name="businessTagline"
            control={control}
            error={errors?.businessTagline?.message}
            label="Business Tagline"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextArea
            name="businessDescription"
            control={control}
            error={errors?.businessDescription?.message}
            label="Business Description"
            placeholder="Type here..."
            type="text"
          />
          <View>
            <ThemedText styles={` font-Medium text-md mb-1`}>
              Accommodation Type
            </ThemedText>
            <DropdownBox
              name="hotelAccommodationType"
              options={hotelAccomodationTypes}
              zIndex={900}
            />
          </View>
          <Controller
            name="businessLogo"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <ImageUploadUI
                  value={value}
                  label="Upload Hotel Picture"
                  onPress={() => setModalVisible(true)}
                />

                <ImagePickerModal
                  visible={modalVisible}
                  onClose={() => setModalVisible(false)}
                  onPickGallery={() =>
                    pickFromGallery(onChange, () => setModalVisible(false))
                  }
                />
              </>
            )}
          />
          <ThemedTextInput
            name="hotelBookingCondition"
            control={control}
            error={errors?.hotelBookingCondition?.message}
            label="Booking Condition"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextArea
            name="hotelCancelationPolicy"
            control={control}
            error={errors?.hotelCancelationPolicy?.message}
            label="Cancelation Policy"
            placeholder="Type here..."
            type="text"
          />

          <Controller
            name="hotelDocs"
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <DocumentsUploadUI
                label="Business Registration and Policy Docs"
                docs={value}
                onPick={() =>
                  pickDocuments(files => {
                    console.log(files.uri);
                    const combined = [...value, ...files].slice(0, 5);
                    onChange(combined);
                  })
                }
                onRemove={idx => {
                  const updated = [...value];
                  updated.splice(idx, 1);
                  onChange(updated);
                }}
              />
            )}
          />

          <ThemedTextInput
            name="hotelAddress"
            control={control}
            error={errors?.hotelAddress?.message}
            label="Address"
            placeholder="Type here..."
            type="text"
          />

          <ThemedTextInput
            name="hotelCity"
            control={control}
            error={errors?.hotelCity?.message}
            label="City"
            placeholder="Type here..."
            type="text"
          />

          <ThemedTextInput
            name="hotelPostalCode"
            control={control}
            error={errors?.hotelPostalCode?.message}
            label="Postal Code"
            placeholder="Type here..."
            type="text"
          />

          <ThemedTextInput
            name="hotelDistrict"
            control={control}
            error={errors?.hotelDistrict?.message}
            label="District / State / Province"
            placeholder="Type here..."
            type="text"
          />

          <View style={{ height: responsiveHeight(10) }}>
            <ThemedText styles={`font-Medium text-md mb-1`}>
              Country
            </ThemedText>
            <DropdownBox
              name="hotelCountry"
              options={countries}
              zIndex={900}
            />
          </View>
        </ScrollView>

        <View
          style={{
            paddingVertical: responsiveHeight(2),
          }}
        >
          <Button
            title="Next"
            navigation={navigation}
            path="ProviderHotelBusinessLogo"
            ids={[
              'hotelBusinessName',
              'hotelName',
              'hotelBusinessType',
              'hotelAccommodationType',
              'hotelRegNum',
              'hotelRegDate',
              'hotelPhone',
              'hotelEmail',
              'businessTagline',
              'businessDescription',
              'businessLogo',
              'hotelBookingCondition',
              'hotelCancelationPolicy',
              'hotelDocs',
              'hotelAddress',
              'hotelCity',
              'hotelPostalCode',
              'hotelDistrict',
              'hotelCountry',
            ]}
            noicon={true}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderHotelBusinessDetailScreen;