import { Pressable, useColorScheme } from 'react-native';
import React from 'react';
import ThemedView from '../utils/ThemedView';
// import ThemedText from '../utils/ThemedText';
// import Entypo from 'react-native-vector-icons/Entypo';
import ThemedText3 from '../utils/ThemedText3';
import { useNavigation } from '@react-navigation/native';
import useT from '../utils/useT';

const SettingOption = ({ item }) => {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const t = useT();
  return (
    <Pressable onPress={() => navigation.navigate(item.path)}>
      <ThemedView
        styles={`flex-row justify-between items-center gap-2 border-b ${
          theme === 'dark' ? 'border-zinc-600' : 'border-zinc-200'
        }  pb-3`}
      >
        <ThemedText3 styles="font-Medium text-md">{t(item.title)}</ThemedText3>

        {/* <Entypo
          name="chevron-small-right"
          size={24}
          color={theme === 'dark' ? '#52525b' : '#d4d4d8'}
        /> */}
      </ThemedView>
    </Pressable>
  );
};

export default SettingOption;
