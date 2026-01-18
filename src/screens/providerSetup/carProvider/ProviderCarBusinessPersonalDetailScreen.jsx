import {
  View,
  // Text,
  KeyboardAvoidingView,
  Platform,
  // TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  useColorScheme,
} from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import TitleComponent from "@/components/TitleComponent";
import ThemedTextInput from "@/utils/ThemedTextInput";
// import ThemedText3 from '@/utils/ThemedText3';
import DropdownBox from "@/components/DropdownBox";
import { carRentalTypes } from "@/../assets/data/data";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
// import ThemedTextArea from '@/utils/ThemedTextArea';
// import ImageUploadUI from '@/components/ImageUploadUI';
// import ImagePickerModal from '@/utils/ImagePickerModal';
// import { useImagePicker } from '@/utils/useImagePicker';
// import MultiImageUploadUI from '@/components/MultiImageUploadUI';
// import MultiImagePickerModal from '@/components/MultiImagePickerModal';
// import { useMultiImagePicker } from '@/utils/useMultiImagePicker';
import ThemedText from "@/utils/ThemedText";

const ProviderCarBusinessPersonalDetailScreen = () => {
  const {
    control,
    formState: { errors },
    // watch,
  } = useFormContext();

  // const [modalVisible, setModalVisible] = useState(false);
  const theme = useColorScheme();
  const navigation = useNavigation();
  // const { pickFromGallery } = useImagePicker();
  // const { pickFromGalleryMulti } = useMultiImagePicker();

  const themedLabelClasses = `${
    theme === "dark" ? "text-zinc-500" : "text-zinc-400"
  } text-md`;

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
      <TitleComponent
        title="Business Details"
        subTitle="Please provide business information so we can setup your account."
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={{ flex: 1 }}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1"> */}
        <ScrollView
          className="flex-grow"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: responsiveHeight(2),
          }}
        >
          <ThemedTextInput
            name="carBusinessName"
            control={control}
            error={errors?.carBusinessName?.message}
            label="Business Name"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextInput
            name="carName"
            control={control}
            error={errors?.carName?.message}
            label="Full Name"
            placeholder="Type here..."
            type="text"
          />
          <View>
            <ThemedText styles={`font-Medium text-md mb-1`}>
              Business Type
            </ThemedText>
            <DropdownBox
              name="carBusinessType"
              options={carRentalTypes}
              zIndex={1000}
            />
          </View>
          <ThemedTextInput
            name="carRegNum"
            control={control}
            error={errors?.carRegNum?.message}
            label="Government Registration Number"
            placeholder="Type here..."
            type="text"
          />
          <DatePicker
            name="carRegDate"
            control={control}
            label="Date of Business Registration (DOB)"
            error={errors?.carRegDate?.message}
          />
          <ThemedTextInput
            name="carPhone"
            control={control}
            error={errors?.carPhone?.message}
            label="Phone"
            placeholder="Type here..."
            type="number"
          />
          <ThemedTextInput
            name="carEmail"
            control={control}
            error={errors?.carEmail?.message}
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
            path="ProviderCarBusinessVehicleDetail"
            ids={[
              "carBusinessName",
              "carName",
              "carBusinessType",
              "carRegNum",
              "carRegDate",
              "carPhone",
              "carEmail",
            ]}
            noicon={true}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderCarBusinessPersonalDetailScreen;
