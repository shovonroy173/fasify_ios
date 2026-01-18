import React from 'react';
import { View, TextInput, Pressable, useColorScheme } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';
import { Controller } from 'react-hook-form';
import { useThemeColor } from '../utils/useThemeColor';
import { useNavigation } from '@react-navigation/native';
import useT from '../utils/useT';

const LocationInput2 = ({ control, name = 'location' }) => {
  const theme = useColorScheme();
  const { icon2 } = useThemeColor();
  const navigation = useNavigation();
  const t = useT();
  return (
    <View
      className={`flex-row items-center rounded-[25px] px-[15px] py-2 ${
        theme === 'dark' ? 'bg-[#52525b]' : ' bg-[#f0f0f0]'
      }`}
    >
      {/* Search Icon */}
      {/* <Ionicons
        name="search-outline"
        size={20}
        color={icon2}
        style={{ marginRight: 8 }}
      /> */}

      {/* Controller Input Field */}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={t('location')}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={{
              flex: 1,
              fontSize: 16,
              paddingVertical: 0,
              color: theme === 'dark' ? '#000' : '#71717a',
            }}
          />
        )}
      />

      {/* Send Icon */}
      {/* <Pressable onPress={()=> navigation.navigate('UserSecurityHome')}>
        <Entypo name="chevron-small-right" size={22} color={icon2} />
      </Pressable> */}
    </View>
  );
};

export default LocationInput2;
