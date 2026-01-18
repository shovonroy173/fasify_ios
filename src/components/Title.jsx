import { View, Text, Pressable } from 'react-native';
import React from 'react';
import ThemedText from '../utils/ThemedText';
import ThemedText3 from '../utils/ThemedText3';
// import Entypo from 'react-native-vector-icons/Entypo';
import { useThemeColor } from '../utils/useThemeColor';
import { useNavigation } from '@react-navigation/native';
import useT from '../utils/useT';

const Title = ({ title }) => {
  const { icon3 } = useThemeColor();
  const navigation = useNavigation();
  const t = useT();
  return (
    <View className="flex-row justify-between items-center">
      <ThemedText styles="text-lg font-SemiBold ">{title}</ThemedText>
      {/* <Pressable
        onPress={() => navigation.navigate('DefaultSeeAll')}
        className="flex-row items-center gap-1"
      >
        <ThemedText3 styles="font-Medium text-sm">
          {t('securityBooking.seeAll')}
        </ThemedText3>
        <Entypo name="chevron-small-right" size={24} color={icon3} />
      </Pressable> */}
    </View>
  );
};

export default Title;
