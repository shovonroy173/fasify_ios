import React from 'react';
import {Image, Pressable, useColorScheme, View} from 'react-native';
import {Controller, useFormContext} from 'react-hook-form';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedText3 from '../utils/ThemedText3';

const BusinessTypeSelector = ({item, name, navigation}) => {
  const {control, watch} = useFormContext();
  const theme = useColorScheme();

  const isSelected = watch(name)?.id === item?.id;

  const borderColor = isSelected
    ? theme === 'dark'
      ? 'border-primary_dark'
      : 'border-primary'
    : theme === 'dark'
    ? 'border-zinc-500'
    : 'border-zinc-300';

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange}}) => (
        <View className="relative">
          <Pressable
            onPress={() => onChange(item)}
            className={`rounded-xl px-4 py-5 border ${borderColor} flex-row items-center gap-5`}
            style={{
              minHeight: responsiveHeight(7),
            }}
          >
            <Image source={item.uri} 
            style={{
              width: responsiveWidth(10),
              height: responsiveWidth(10),
              objectFit: 'cover'
            }}
            />
            <ThemedText3 styles="font-Medium text-md">
              {item.title}
            </ThemedText3>
          </Pressable>
        </View>
      )}
    />
  );
};

export default BusinessTypeSelector;
