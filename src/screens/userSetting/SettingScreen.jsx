/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  View,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";

import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

import { useFormContext } from "react-hook-form";
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';

import ThemedView from "../../utils/ThemedView";
import GoBack from "../../components/GoBack";
import ThemedText from "../../utils/ThemedText";
import SettingOption from "../../components/SettingOption";
import ThemedText3 from "../../utils/ThemedText3";
import ToggleSwitch from "../../components/ToggleSwitch";
import {
  languageOptions,
  securityOptionsAccount,
  securityOptionsOther,
} from "../../../assets/data/data";
import { useThemeColor } from "../../utils/useThemeColor";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../utils/languageSetup";
import useT from "../../utils/useT";

import DeviceInfo from "react-native-device-info";
import { useSelector } from "react-redux";
import { usePaymentOnboardingMutation } from "../../redux/slices/authSlice";

const SettingScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useFormContext();
  const theme = useColorScheme();
  const { icon3 } = useThemeColor();
  const route = useRoute();
  console.log(route);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(null);
  // console.log(value);
  const saveLanguage = async (lang) => {
    await AsyncStorage.setItem("appLanguage", lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    if (value) {
      saveLanguage(value);
    }
  }, [value]);
  const t = useT();

  const appVersion = DeviceInfo.getVersion();
  return (
    <View className="flex-1 bg-red-500">
      <ThemedView
        styles="flex-1"
        style={{
          paddingHorizontal: responsiveWidth(6),
          paddingVertical: responsiveHeight(5),
          gap: responsiveHeight(4),
        }}
      >
        <GoBack navigation={navigation} />

        <View
          style={{
            gap: responsiveHeight(3),
          }}
        >
          <ThemedText styles="text-3xl font-SemiBold">
            {t("settings.title")}
          </ThemedText>
          <View className="gap-2">
            <ThemedText styles="text-lg font-SemiBold">
              {t("settings.general")}
            </ThemedText>
            <ThemedView
              styles={`flex-row justify-between items-center gap-2 border-b ${
                theme === "dark" ? "border-zinc-600" : "border-zinc-200"
              }  pb-3`}
            >
              <ThemedText3 styles="font-Medium text-md">
                {t("settings.location")}
              </ThemedText3>

              <ToggleSwitch name="Location" control={control} />
            </ThemedView>
            <DropDownPicker
              open={open}
              value={value}
              defaultValue={languageOptions[0]?.title}
              items={languageOptions}
              setOpen={setOpen}
              setValue={setValue}
              // setItems={setItems}
              placeholder={t("settings.language")}
              showTickIcon={false}
              theme={theme === "dark" ? "DARK" : "LIGHT"}
              style={{
                // backgroundColor: '#ffffff',
                borderWidth: 0, // remove all borders
                borderBottomWidth: 1, // add only bottom border
                borderBottomColor: "#d1d5db", // make sure this is set
                // height: 50,
                paddingHorizontal: 0,
              }}
              dropDownContainerStyle={{
                // backgroundColor: '#f9f9f9',
                borderColor: theme === "dark" ? "#71717a" : "#a1a1aa",
                borderWidth: 1,
                borderRadius: 8,
              }}
              textStyle={{
                fontFamily: "Inter_18pt-Medium",
                // fontSize: 16,
                color: theme === "dark" ? "#71717a" : "#a1a1aa",
              }}
              labelStyle={{
                fontWeight: "600",
              }}
              listItemLabelStyle={{
                color: "#111827",
              }}
            />
          </View>
          <View className="gap-2">
            <ThemedText styles="text-lg font-SemiBold">
              {t("settings.account_security")}
            </ThemedText>
            {securityOptionsAccount.map((item) => (
              <SettingOption key={item.id} item={item} />
            ))}
          </View>
          <View className="gap-2">
            <ThemedText styles="text-lg font-SemiBold">
              {t("settings.other")}
            </ThemedText>
            {securityOptionsOther.map((item) => (
              <SettingOption key={item.id} item={item} />
            ))}
          </View>
          <ThemedView styles={`flex-row justify-between items-center gap-2 `}>
            <ThemedText3 styles="font-Medium text-md">
              {t("settings.version")}
            </ThemedText3>
            <ThemedText3 styles="font-Medium text-md">
              v{appVersion}
            </ThemedText3>
          </ThemedView>
        </View>
      </ThemedView>
    </View>
  );
};

export default SettingScreen;
