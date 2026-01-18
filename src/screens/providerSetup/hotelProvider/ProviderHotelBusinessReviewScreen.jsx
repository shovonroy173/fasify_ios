/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
// import Feather from 'react-native-vector-icons/Feather';
import { useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import ThemedText from "@/utils/ThemedText";
import ThemedText3 from "@/utils/ThemedText3";

import Button from "@/components/Button";
import SuccessModal from "@/components/SuccessModal";
import ThemedReviewComponent from "@/utils/ThemedReviewComponent";
import { useCreateHotelMutation } from "@/redux/slices/providerSlice/hotelSlice";
import { openDocument } from "@/utils/useDocumentViewer";

const ProviderHotelBusinessReviewScreen = () => {
  const { getValues } = useFormContext();

  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);

  const [createHotel] = useCreateHotelMutation();
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
          Review Hotel Business Details
        </ThemedText>
      </View>

      <ScrollView
        className="flex-grow"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: responsiveHeight(2),
        }}
      >
        {/* Business Information */}
        <ThemedReviewComponent
          label="Business Name"
          ans={getValues("hotelBusinessName") || ""}
        />

        <ThemedReviewComponent
          label="Full Name"
          ans={getValues("hotelName") || ""}
        />

        <ThemedReviewComponent
          label="Government Registration Number"
          ans={getValues("hotelRegNum") || ""}
        />

        <ThemedReviewComponent
          label="Date of Business Registration (DOB)"
          ans={getValues("hotelRegDate") || ""}
        />

        <ThemedReviewComponent
          label="Business Type"
          ans={getValues("hotelBusinessType") || ""}
        />

        <ThemedReviewComponent
          label="Accommodation Type"
          ans={getValues("hotelAccommodationType") || ""}
        />

        <ThemedReviewComponent
          label="Business Tagline"
          ans={getValues("businessTagline") || ""}
        />

        <ThemedReviewComponent
          label="Business Description"
          ans={getValues("businessDescription") || ""}
        />

        <ThemedReviewComponent
          label="Phone"
          ans={getValues("hotelPhone") || ""}
        />

        <ThemedReviewComponent
          label="Email"
          ans={getValues("hotelEmail") || ""}
        />

        {/* Hotel Picture */}
        <ThemedText3 styles="font-Medium text-md mb-1">
          Uploaded Hotel Picture
        </ThemedText3>
        {getValues("businessLogo") ? (
          <Image
            source={{ uri: getValues("businessLogo") }}
            style={{
              width: responsiveWidth(88),
              height: responsiveHeight(30),
              marginBottom: responsiveHeight(2),
              resizeMode: "cover",
              borderRadius: 10,
            }}
          />
        ) : (
          <Text className="text-red-500 font-Medium">No Image Uploaded</Text>
        )}

        {/* Policies */}
        <ThemedReviewComponent
          label="Booking Condition"
          ans={getValues("hotelBookingCondition") || ""}
        />

        <ThemedReviewComponent
          label="Cancelation Policy"
          ans={getValues("hotelCancelationPolicy") || ""}
        />

        {/* Documents */}
        <ThemedText3 styles="font-Medium text-md mb-1">
          Uploaded Hotel Policy Document
        </ThemedText3>
        {getValues("hotelDocs") && getValues("hotelDocs").length > 0 ? (
          <FlatList
            data={getValues("hotelDocs")}
            keyExtractor={(d, i) => d.uri + i}
            renderItem={({ item, index }) => (
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
            No documents uploaded
          </Text>
        )}

        {/* Location Details */}
        <ThemedReviewComponent
          label="Address"
          ans={getValues("hotelAddress") || ""}
        />

        <ThemedReviewComponent
          label="City"
          ans={getValues("hotelCity") || ""}
        />

        <ThemedReviewComponent
          label="Postal Code"
          ans={getValues("hotelPostalCode") || ""}
        />

        <ThemedReviewComponent
          label="District / State / Province"
          ans={getValues("hotelDistrict") || ""}
        />

        <ThemedReviewComponent
          label="Country"
          ans={getValues("hotelCountry") || ""}
        />

        {/* Hotel Amenities */}
        <ThemedText3 styles="text-lg font-Bold mb-2">
          Hotel Amenities
        </ThemedText3>

        <View className="flex-row flex-wrap justify-between">
          <View className="w-1/2">
            <ThemedReviewComponent
              label="Air Conditioning"
              ans={getValues("hotelAC") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="Parking"
              ans={getValues("hotelParking") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="WiFi"
              ans={getValues("hoitelWifi") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="Breakfast"
              ans={getValues("hotelBreakfast") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="Swimming Pool"
              ans={getValues("hotelPool") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="TV"
              ans={getValues("hotelTv") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="Washing Machine"
              ans={getValues("hotelWashing") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="Kitchen"
              ans={getValues("hotelKitchen") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="Restaurant"
              ans={getValues("hotelRestaurant") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="Gym"
              ans={getValues("hotelGym") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="Spa"
              ans={getValues("hotelSpa") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="24-Hour Front Desk"
              ans={getValues("hotel24HourFrontDesk") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="Airport Shuttle"
              ans={getValues("hotelAirportShuttle") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="Coffee Bar"
              ans={getValues("hotelCoffeeBar") ? "Yes" : "No"}
            />
          </View>
        </View>

        {/* Smoking Preferences */}
        <ThemedText3 styles="text-lg font-Bold mb-2">
          Smoking Preferences
        </ThemedText3>

        <View className="flex-row flex-wrap justify-between">
          <View className="w-1/2">
            <ThemedReviewComponent
              label="Smoking Allowed"
              ans={getValues("hotelSmoking") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="No Smoking Preference"
              ans={getValues("hotelNoSmokingPreference") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="No Smoking"
              ans={getValues("hotelNoNSmoking") ? "Yes" : "No"}
            />
          </View>
        </View>

        {/* Pet Policies */}
        <ThemedText3 styles="text-lg font-Bold mb-2">Pet Policies</ThemedText3>

        <View className="flex-row flex-wrap justify-between">
          <View className="w-1/2">
            <ThemedReviewComponent
              label="Pets Allowed"
              ans={getValues("hotelPetsAllowed") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="No Pets Preference"
              ans={getValues("hotelNoPetsPreferences") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="Pets Not Allowed"
              ans={getValues("hotelPetsNotAllowed") ? "Yes" : "No"}
            />
          </View>
        </View>

        {/* Location Features */}
        <ThemedText3 styles="text-lg font-Bold mb-2">
          Location Features
        </ThemedText3>

        <View className="flex-row flex-wrap justify-between">
          <View className="w-1/2">
            <ThemedReviewComponent
              label="Water View"
              ans={getValues("hotelLocationFeatureWaterView") ? "Yes" : "No"}
            />
          </View>
          <View className="w-1/2">
            <ThemedReviewComponent
              label="Island Location"
              ans={getValues("hotelLocationFeatureIsland") ? "Yes" : "No"}
            />
          </View>
        </View>
      </ScrollView>
      {/* </TouchableWithoutFeedback> */}
      <View
        style={{
          marginBottom: responsiveHeight(5),
        }}
      >
        <Button
          title="Submit"
          navigation={navigation}
          path="ProviderHotelBusinessListing" // Or string / object if you want navigation
          // ids={[
          //   'hotelRoomType',
          //   'hotelRoomPriceNight',
          //   'roomDescription',
          //   'hotelCity',
          //   'hotelDistrict',
          //   'hotelCountry',
          //   'hotelRoomImage',
          //   'hotelAddress',
          // ]}
          onComplete={() => setShowModal(true)} // ✅ Modal will show only if form is valid
          submission={createHotel}
          isHotelCreate={true}
        />
      </View>
      <SuccessModal visible={showModal} setVisible={setShowModal} />
    </ThemedView>
  );
};

export default ProviderHotelBusinessReviewScreen;
