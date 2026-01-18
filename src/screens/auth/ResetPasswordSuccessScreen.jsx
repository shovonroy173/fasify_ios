import { View, Text, Image } from 'react-native';
import React from 'react';
import ThemedView from '@/utils/ThemedView';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Button from '@/components/Button';
import { useNavigation } from '@react-navigation/native';
import ThemedText from '@/utils/ThemedText';
import useT from '@/utils/useT';

const ResetPasswordSuccessScreen = () => {
  const navigation = useNavigation();
  const t = useT();
  return (
    <ThemedView
      styles="flex-1 justify-between"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(5),
      }}
    >
      <View className="flex-1 justify-center items-center gap-5">
        <Image
          source={require('@/../assets/images/resetpasswordsuccess.webp')}
          style={{
            width: responsiveWidth(60),
            height: responsiveHeight(30),
            objectFit: 'cover',
          }}
        />
      <ThemedText styles="font-SemiBold text-xl text-center">
         {t('passwordSuccess.message')}
      </ThemedText>
      
      </View>
      <Button title={t('passwordSuccess.button')} navigation={navigation} path="Signin" />
    </ThemedView>
  );
};

export default ResetPasswordSuccessScreen;
