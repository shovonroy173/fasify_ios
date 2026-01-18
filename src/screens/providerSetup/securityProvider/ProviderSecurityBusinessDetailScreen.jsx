import {
  View,
  KeyboardAvoidingView,
  Platform,
  // TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  // useColorScheme,
} from "react-native";
import React from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
// import { useImagePicker } from '@/utils/useImagePicker';
import ThemedView from "@/utils/ThemedView";
import GoBack from "@/components/GoBack";
import TitleComponent from "@/components/TitleComponent";
import Button from "@/components/Button";
import ThemedTextInput from "@/utils/ThemedTextInput";
import DocumentsUploadUI from "@/components/DocumentUploadUI";
import { useDocumentsPicker } from "@/utils/useDocumentsPicker";
import ThemedTextArea from "@/utils/ThemedTextArea";

const ProviderSecurityBusinessDetailScreen = () => {
  const {
    control,
    formState: { errors },
    // watch,
  } = useFormContext();

  // const [modalVisible, setModalVisible] = useState(false);
  // const theme = useColorScheme();
  const navigation = useNavigation();
  // const { pickFromGallery } = useImagePicker();
  const { pickDocuments } = useDocumentsPicker();

  // const themedLabelClasses = `${
  //   theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
  // } text-md`;

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
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          // className="flex-grow"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: responsiveHeight(2),
          }}
        >
          <TitleComponent
            title="Professional Details"
            subTitle="Please provide business information so we can setup your account."
          />
          <ThemedTextInput
            name="securityTagline"
            control={control}
            error={errors?.securityTagline?.message}
            label="Security Tagline"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextArea
            name="securityProtocolDescription"
            control={control}
            error={errors?.securityProtocolDescription?.message}
            label="Security Protocol Description"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextInput
            name="securityBookingCondition"
            control={control}
            error={errors?.securityBookingCondition?.message}
            label="Booking Condition"
            placeholder="Type here..."
            type="text"
          />
          <ThemedTextArea
            name="securityCancelationPolicy"
            control={control}
            error={errors?.securityCancelationPolicy?.message}
            label="Cancelation Policy"
            placeholder="Type here..."
            type="text"
          />
          <Controller
            name="securityDocs"
            control={control}
            render={({ field: { value = [], onChange } }) => (
              <DocumentsUploadUI
                label="Business Registration and Policy Docs"
                docs={value}
                onPick={() =>
                  pickDocuments((files) => {
                    const combined = [...value, ...files].slice(0, 5); // limit to 5
                    onChange(combined);
                  })
                }
                onRemove={(idx) => {
                  const updated = [...value];
                  updated.splice(idx, 1);
                  onChange(updated);
                }}
              />
            )}
          />
        </ScrollView>

        <View
          style={{
            marginVertical: responsiveHeight(3),
          }}
        >
          <Button
            title="Next"
            navigation={navigation}
            path="ProviderCarBusinessReview"
            ids={[
              "securityTagline",
              "securityProtocolDescription",
              "securityBookingCondition",
              "securityCancelationPolicy",
              "securityDocs",
            ]}
            noicon={true}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default ProviderSecurityBusinessDetailScreen;
