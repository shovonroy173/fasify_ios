import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React from "react";
import ThemedView from "@/utils/ThemedView";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
// import ThemedTextInput from '@/utils/ThemedTextInput';
import { useFormContext } from "react-hook-form";
import GoBack from "@/components/GoBack";
import TitleComponent from "@/components/TitleComponent";
import { useNavigation } from "@react-navigation/native";
import Button from "@/components/Button";
// import ThemedTextArea from '@/utils/ThemedTextArea';
// import ImageUploadUI from '@/components/ImageUploadUI';
// import ImagePickerModal from '@/utils/ImagePickerModal';
// import DocumentsUploadUI from '@/components/DocumentUploadUI';
// import { useImagePicker } from '@/utils/useImagePicker';
// import { useDocumentsPicker } from '@/utils/useDocumentsPicker';
import ThemedText3 from "@/utils/ThemedText3";
import ThemedCheckbox from "@/utils/ThemedCheckbox";

const ProviderHotelBusinessLogoScreen = () => {
  const {
    control,
    formState: { errors },
    // watch,
  } = useFormContext();

  const navigation = useNavigation();
  // const [modalVisible, setModalVisible] = useState(false);
  // const { pickFromGallery } = useImagePicker();
  // const { pickDocuments } = useDocumentsPicker();

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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        className="flex-1"
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1"> */}


          <ScrollView
            className="flex-grow"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: responsiveHeight(2),
            }}
          >
            <TitleComponent
              title="Hotel Amenities"
              subTitle="Please provide business information so we can setup your account."
            />

            <View className="flex-row flex-wrap justify-between">
              <View className="w-1/2">
                <ThemedCheckbox
                  label="Air Conditioning"
                  name="hotelAC"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelAC?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="Parking"
                  name="hotelParking"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelParking?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="WiFi"
                  name="hoitelWifi"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hoitelWifi?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="Breakfast"
                  name="hotelBreakfast"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelBreakfast?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="Swimming Pool"
                  name="hotelPool"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelPool?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="TV"
                  name="hotelTv"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelTv?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="Washing Machine"
                  name="hotelWashing"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelWashing?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="Kitchen"
                  name="hotelKitchen"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelKitchen?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="Restaurant"
                  name="hotelRestaurant"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelRestaurant?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="Gym"
                  name="hotelGym"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelGym?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="Spa"
                  name="hotelSpa"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelSpa?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="24-Hour Front Desk"
                  name="hotel24HourFrontDesk"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotel24HourFrontDesk?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="Airport Shuttle"
                  name="hotelAirportShuttle"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelAirportShuttle?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="Coffee Bar"
                  name="hotelCoffeeBar"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelCoffeeBar?.message}
                />
              </View>
            </View>

            {/* Smoking Preferences */}
            <ThemedText3 styles={`text-lg font-Bold mb-2`}>
              Smoking Preferences
            </ThemedText3>

            <View className="flex-row flex-wrap justify-between">
              <View className="w-1/2">
                <ThemedCheckbox
                  label="Smoking Allowed"
                  name="hotelSmoking"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelSmoking?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="No Smoking Preference"
                  name="hotelNoSmokingPreference"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelNoSmokingPreference?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="No Smoking"
                  name="hotelNoNSmoking"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelNoNSmoking?.message}
                />
              </View>
            </View>

            {/* Pet Policies */}
            <ThemedText3 styles={`text-lg font-Bold mb-2`}>
              Pet Policies
            </ThemedText3>

            <View className="flex-row flex-wrap justify-between">
              <View className="w-1/2">
                <ThemedCheckbox
                  label="Pets Allowed"
                  name="hotelPetsAllowed"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelPetsAllowed?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="No Pets Preference"
                  name="hotelNoPetsPreferences"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelNoPetsPreferences?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="Pets Not Allowed"
                  name="hotelPetsNotAllowed"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelPetsNotAllowed?.message}
                />
              </View>
            </View>

            {/* Location Features */}
            <ThemedText3 styles={`text-lg font-Bold mb-2`}>
              Location Features
            </ThemedText3>

            <View className="flex-row flex-wrap justify-between">
              <View className="w-1/2">
                <ThemedCheckbox
                  label="Water View"
                  name="hotelLocationFeatureWaterView"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelLocationFeatureWaterView?.message}
                />
              </View>

              <View className="w-1/2">
                <ThemedCheckbox
                  label="Island Location"
                  name="hotelLocationFeatureIsland"
                  defaultChecked={null}
                  control={control}
                  error={errors?.hotelLocationFeatureIsland?.message}
                />
              </View>
            </View>
          </ScrollView>
        {/* </TouchableWithoutFeedback> */}
        <View
          style={{
            marginVertical: responsiveHeight(3),
          }}
        >
          <Button
            title="Next"
            navigation={navigation}
            path="ProviderHotelBusinessReview"
            // ids={
            //   [
            //     'businessTagline',
            //     'businessDescription',
            //     'businessLogo',
            //     'hotelBookingCondition',
            //     'hotelCancelationPolicy',
            //     'hotelDocs',
            //   ]
            // }
            noicon={true}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderHotelBusinessLogoScreen;
