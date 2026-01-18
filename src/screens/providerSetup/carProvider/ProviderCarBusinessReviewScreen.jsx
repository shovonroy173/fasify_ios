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
  Image,
  // Text,
  FlatList,
  Pressable,
  Text,
} from "react-native";
import React, { useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import ThemedText from "@/utils/ThemedText";
import ThemedReviewComponent from "@/utils/ThemedReviewComponent";
import ThemedText3 from "@/utils/ThemedText3";
// import WeeklySchedule from '@/components/WeeklySchedule';
import Button from "@/components/Button";
// import { useDocumentsPicker } from '@/utils/useDocumentsPicker';
import SuccessModal from "@/components/SuccessModal";
import { useCreateCarMutation } from "@/redux/slices/providerSlice/carSlice";
import { openDocument } from "@/utils/useDocumentViewer";
// import Feather from 'react-native-vector-icons/Feather';

const ProviderCarBusinessReviewScreen = () => {
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
  const [createCar] = useCreateCarMutation();

  // console.log('LINE AT 58', getValues('businessLogo'));

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
          Review Car Details
        </ThemedText>
        <ThemedReviewComponent
          label="Business Name"
          ans={getValues("carBusinessName") || ""}
        />
        <ThemedReviewComponent
          label="Full Name"
          ans={getValues("carName") || ""}
        />
        <ThemedReviewComponent
          label="Business Type"
          ans={getValues("carBusinessType") || ""}
        />
        <ThemedReviewComponent
          label="Government Registration Number"
          ans={getValues("carRegNum") || ""}
        />
        <ThemedReviewComponent
          label="Date of Business Registration (DOB)"
          ans={getValues("carRegDate") || ""}
        />
        <ThemedReviewComponent
          label="Car Rental Type"
          ans={getValues("carRentalType") || ""}
        />
        <ThemedReviewComponent
          label="Phone"
          ans={getValues("carPhone") || ""}
        />
        <ThemedReviewComponent
          label="Email"
          ans={getValues("carEmail") || ""}
        />

        <ThemedReviewComponent
          label="Business Type"
          ans={getValues("carBusinessType") || ""}
        />

        <ThemedReviewComponent
          label="Business Tagline"
          ans={getValues("carTagline") || ""}
        />
        <ThemedReviewComponent
          label="Business Description"
          ans={getValues("carRentalDescription") || ""}
        />

        <ThemedText3 styles="font-Medium text-md mb-1">
          Business Logo
        </ThemedText3>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {getValues("businessLogo") ? (
            <Image
              source={{ uri: getValues("businessLogo") }}
              style={{
                width: responsiveWidth(88), // Use 47% to leave ~6% total spacing between two images
                height: responsiveHeight(30),
                marginBottom: responsiveHeight(2), // spacing between rows
                resizeMode: "cover",
                borderRadius: 10,
              }}
            />
          ) : (
            <Text className="text-gray-500">No Car Images Uploaded</Text>
          )}
        </View>

        <ThemedReviewComponent
          label="Booking Condition"
          ans={getValues("carBookingCondition") || ""}
        />
        <ThemedReviewComponent
          label="Cancelation Policy"
          ans={getValues("carCancelationPolicy") || ""}
        />

        <ThemedText3 styles="font-Medium text-md mb-1">
          Business Registration and Policy Docs
        </ThemedText3>
        {getValues("carDocs")?.length > 0 ? (
          <FlatList
            data={getValues("carDocs")}
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

      {/* </TouchableWithoutFeedback> */}

      <View
        style={{
          marginBottom: responsiveHeight(6),
        }}
      >
        <Button
          title="Submit"
          navigation={navigation}
          path="ProviderCarBusinessListing" // Or string / object if you want navigation
          // ids={[
          //   'providerVehicleName',
          //   'providerVehiclePrice',
          //   'providerVehicleCity',
          //   'providerVehicleImage',
          // ]}
          // onComplete={() => setShowModal(true)} // ✅ Modal will show only if form is valid

          onComplete={() => setShowModal(true)}
          submission={createCar}
          isCarCreate={true}
        />
      </View>
      <SuccessModal visible={showModal} setVisible={setShowModal} />
    </ThemedView>
  );
};

export default ProviderCarBusinessReviewScreen;
