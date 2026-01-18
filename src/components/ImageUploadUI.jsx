/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, Pressable } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useThemeColor } from '../utils/useThemeColor';
import ThemedText from '../utils/ThemedText';
import { Upload } from 'lucide-react-native';

const ImageUploadUI = ({ value, label, onPress }) => {
  const { icon2 } = useThemeColor();

  return (
    <View style={{ gap: 8 }}>
      {label && (
        <ThemedText styles={`font-Medium text-md mb-1`}>{label}</ThemedText>
      )}
      <Pressable
        className="border border-zinc-300 rounded-xl p-3 flex-row justify-center gap-2"
        onPress={onPress}
      >
        {/* <Feather name="upload" size={20} color={icon2} /> */}
        <Upload size={20} color={icon2}/>
        <ThemedText styles="font-SemiBold">{label}</ThemedText>
      </Pressable>
      {value && (
        <View className="justify-center px-4">
          <Image
            source={{ uri: value }}
            style={{
              width: responsiveWidth(80),
              height: responsiveHeight(20),
              objectFit: 'cover',
              borderRadius: 20,
              overflow: 'hidden',
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ImageUploadUI;
