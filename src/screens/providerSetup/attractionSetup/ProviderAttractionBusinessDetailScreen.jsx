import {
  View,
  // Text,
  KeyboardAvoidingView,
  Platform,
  // TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import TitleComponent from "@/components/TitleComponent";
import ThemedTextInput from "@/utils/ThemedTextInput";
import ThemedText3 from "@/utils/ThemedText3";
import {
  attractionBusinessTypes,
  // hotelBusinessTypes,
} from "@/../assets/data/data";
import DropdownBox from "@/components/DropdownBox";
import Button from "@/components/Button";
import { useFormContext } from "react-hook-form";
import DatePicker from "@/components/DatePicker";
import ThemedText from "@/utils/ThemedText";
// import DocumentsUploadUI from '@/components/DocumentUploadUI';
// import { useDocumentsPicker } from '@/utils/useDocumentsPicker';
// import ThemedTextArea from '@/utils/ThemedTextArea';

const ProviderAttractionBusinessDetailScreen = () => {
  const {
    control,
    formState: { errors },
    // watch,
  } = useFormContext();

  const navigation = useNavigation();

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
        style={{
          flex: 1,
        }}
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
            title="Business Details"
            subTitle="Please provide business information so we can setup your account."
          />
          <ThemedTextInput
            name="attractionBusinessName"
            control={control}
            error={errors?.attractionBusinessName?.message}
            label="Business Name"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextInput
            name="attractionName"
            control={control}
            error={errors?.attractionName?.message}
            label="Full Name"
            placeholder="Type here..."
            type="text"
          />
          <View>
            <ThemedText styles={`font-Medium text-md mb-1`}>
              Business Type
            </ThemedText>
            <DropdownBox
              name="attractionBusinessType"
              options={attractionBusinessTypes}
              zIndex={1000}
            />
          </View>
          <ThemedTextInput
            name="attractionRegNum"
            control={control}
            error={errors?.attractionRegNum?.message}
            label="Government Registration Number"
            placeholder="Type here..."
            type="text"
          />
          <DatePicker
            name="attractionRegDate"
            control={control}
            label="Date of Business Registration (DOB)"
            error={errors?.attractionRegDate?.message}
          />
          <ThemedTextInput
            name="attractionPhone"
            control={control}
            error={errors?.attractionPhone?.message}
            label="Phone"
            placeholder="Type here..."
            type="number"
          />
          <ThemedTextInput
            name="attractionEmail"
            control={control}
            error={errors?.attractionEmail?.message}
            label="Email"
            placeholder="Type here..."
            type="email"
          />
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
            path="ProviderAttractionBusinessLogo"
            ids={[
              "attractionBusinessName",
              "attractionName",
              "attractionBusinessType",
              "attractionRegNum",
              "attractionRegDate",
              "attractionPhone",
              "attractionEmail",
            ]}
            noicon={true}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderAttractionBusinessDetailScreen;
