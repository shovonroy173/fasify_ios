import { View, Text, useColorScheme, Pressable } from 'react-native';
import React from 'react';
import ThemedView from '../../utils/ThemedView';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import GoBack from '../../components/GoBack';
import { useNavigation } from '@react-navigation/native';
import ThemedText from '../../utils/ThemedText';
import ThemedText3 from '../../utils/ThemedText3';
import { useFormContext } from 'react-hook-form';
import ToggleSwitch from '../../components/ToggleSwitch';
// import Entypo from 'react-native-vector-icons/Entypo';

const SecuritySettingScreen = () => {
  const navigation = useNavigation();
  const { control } = useFormContext();
  const theme = useColorScheme();

  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(4),
      }}
    >
      <GoBack navigation={navigation} />

      <ThemedText styles="text-3xl font-SemiBold">Security Settings</ThemedText>

      <ThemedView styles="rounded-xl p-3 border gap-2">
        <ThemedText styles="font-SemiBold ">Biometric</ThemedText>
        <View className="flex-row items-start justify-between">
          <View className="w-4/5">
            <ThemedText styles="font-SemiBold ">
              Activate Biometric Feature
            </ThemedText>
            <ThemedText3>
              To log in with fingerprint or face recognition.
            </ThemedText3>
          </View>
          <ToggleSwitch name="biometric" control={control} />
        </View>
      </ThemedView>
      <ThemedView styles="rounded-xl p-3 border gap-2">
        <ThemedText styles="font-SemiBold ">Device</ThemedText>
        <View className="flex-row items-start justify-between">
          <View className="w-4/5">
            <ThemedText styles="font-SemiBold ">
              Set Device as Trusted
            </ThemedText>
          </View>
          <ToggleSwitch name="device" control={control} />
        </View>
      </ThemedView>

<Pressable onPress={()=> navigation.navigate('UserPinSetting')}>

      <ThemedView styles="rounded-xl p-3 border gap-2">
        <ThemedText styles="font-SemiBold ">Pin</ThemedText>
        <View className="flex-row items-start justify-between">
          <View className="w-4/5">
            <ThemedText styles="font-SemiBold ">Set PIN</ThemedText>
            <ThemedText3>
              Set a 6 digit verification PIN to secure your accounts.
            </ThemedText3>
          </View>

          {/* <Entypo
            name="chevron-small-right"
            size={24}
            color={theme === 'dark' ? '#52525b' : '#d4d4d8'}
          /> */}
        </View>
      </ThemedView>
</Pressable>

    </ThemedView>
  );
};

export default SecuritySettingScreen;
