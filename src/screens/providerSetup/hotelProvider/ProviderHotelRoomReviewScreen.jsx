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
  // Pressable,
  Image,
  // FlatList,
} from "react-native";
import React, { useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
// import Feather from 'react-native-vector-icons/Feather';
import { useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
// import { useImagePicker } from '@/utils/useImagePicker';
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import ThemedText from "@/utils/ThemedText";
import ThemedText3 from "@/utils/ThemedText3";
// import DropdownBox from '@/components/DropdownBox';
// import { hotelBusinessTypes } from '@/../assets/data/data';
// import ThemedTextInput from '@/utils/ThemedTextInput';
// import ThemedTextArea from '@/utils/ThemedTextArea';
// import ImageUploadUI from '@/components/ImageUploadUI';
// import ImagePickerModal from '@/utils/ImagePickerModal';
// import DatePicker from '@/components/DatePicker';
import Button from "@/components/Button";
import SuccessModal from "@/components/SuccessModal";
import ThemedReviewComponent from "@/utils/ThemedReviewComponent";
// import DocumentsUploadUI from '@/components/DocumentUploadUI';
// import { useDocumentsPicker } from '@/utils/useDocumentsPicker';
import {
  // useCreateHotelMutation,
  useCreateHotelRoomMutation,
} from "@/redux/slices/providerSlice/hotelSlice";
// import { openDocument } from '@/utils/useDocumentViewer';

const ProviderHotelRoomReviewScreen = () => {
  const {
    // control,
    // formState: { errors },
    getValues,
  } = useFormContext();

  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);
  // const { pickDocuments } = useDocumentsPicker();

  const [createHotelRoom] = useCreateHotelRoomMutation();

  // Helper function to format boolean values
  // const formatBoolean = value => (value ? 'Yes' : 'No');

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
          Review Hotel Listing Details
        </ThemedText>

        {/* Room Information */}
        <ThemedReviewComponent
          label="Room Type"
          ans={getValues("hotelRoomType") || "Not specified"}
        />

        <ThemedReviewComponent
          label="Room Description"
          ans={getValues("hotelRoomDescription") || "No description provided"}
        />

        <ThemedReviewComponent
          label="Room Capacity"
          ans={getValues("hotelRoomCapacity") || "Not specified"}
        />


        <ThemedReviewComponent
          label="Adults Capacity"
          ans={getValues("hotelNumAdults") || "0"}
        />

        <ThemedReviewComponent
          label="Children Capacity"
          ans={getValues("hotelNumChildren") || "0"}
        />

        {/* Pricing & Rating */}
        <ThemedReviewComponent
          label="Price Per Night"
          ans={`${getValues("hotelRoomPriceNight") || "0"}`}
        />
        <ThemedReviewComponent
          label="Currency"
          ans={`${getValues("currency") || "Not Added"}`}
        />

        <ThemedReviewComponent
          label="Discount"
          ans={`${getValues("discount") || "0"}%`}
        />

        <ThemedReviewComponent
          label="Rating"
          ans={getValues("hotelRating") || "Not rated"}
        />

        <ThemedReviewComponent
          label="Category"
          ans={getValues("category") || "Not categorized"}
        />

        {/* Hotel Facility Images */}
        <ThemedText3 styles="font-Medium text-md mt-4">
          Hotel Images
        </ThemedText3>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {getValues("hotelImages")?.length > 0 ? (
            getValues("hotelImages").map((item, index) => (
              <Image
                key={index}
                source={{ uri: item.uri || item }}
                style={{
                  width: responsiveWidth(42),
                  height: responsiveHeight(20),
                  marginBottom: responsiveHeight(2),
                  resizeMode: "cover",
                  borderRadius: 10,
                }}
              />
            ))
          ) : (
            <Text className="text-gray-500">
              No Hotel Facility Images Uploaded
            </Text>
          )}
        </View>

        {/* Room Images */}
        <ThemedText3 styles="font-Medium text-md mt-4">Room Images</ThemedText3>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {getValues("hotelRoomImages")?.length > 0 ? (
            getValues("hotelRoomImages").map((item, index) => (
              <Image
                key={index}
                source={{ uri: item.uri || item }}
                style={{
                  width: responsiveWidth(42),
                  height: responsiveHeight(20),
                  marginBottom: responsiveHeight(2),
                  resizeMode: "cover",
                  borderRadius: 10,
                }}
              />
            ))
          ) : (
            <Text className="text-gray-500">No Room Images Uploaded</Text>
          )}
        </View>
      </ScrollView>

      <View
        style={{
          marginBottom: responsiveHeight(5),
        }}
      >
        <Button
          title="Submit"
          navigation={navigation}
          path="ProviderBottomTab"
          onComplete={() => setShowModal(true)}
          submission={createHotelRoom}
          isHotelRoomCreate={true}
        />
      </View>

      <SuccessModal visible={showModal} setVisible={setShowModal} />
    </ThemedView>
  );
};

export default ProviderHotelRoomReviewScreen;
