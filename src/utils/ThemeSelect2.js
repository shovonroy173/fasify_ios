import React from 'react';
import {Pressable, useColorScheme, View} from 'react-native';
import {Controller, useFormContext} from 'react-hook-form';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ThemedText2 from './ThemeText2';
import ThemedText3 from './ThemedText3';

const ThemedSelect2 = ({item, name}) => {
  // console.log(item, name);
  const {control, watch, setValue} = useFormContext();

  const theme = useColorScheme();

  const baseStyle =
    theme === 'dark'
      ? 'bg-orange-400 text-zinc-100'
      : 'bg-orange-100 text-black';

  const selectedStyle =
    watch(name)?.id === item?.id
      ? theme === 'dark'
        ? 'border-2 border-zinc-600' // darker border for dark mode
        : 'border-2 border-zinc-800' // lighter border for light mode
      : theme === 'dark'
      ? 'border-2 border-orange-400' // neutral border in dark mode
      : 'border-2 border-orange-100'; // default light border

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, value}}) => (
        <View className="relative">
          <Pressable
            onPress={() => {
            //   console.log('Selected item', item);

              onChange(item);
            }}
            className={`rounded-full w-full px-7 py-2 ${baseStyle} ${selectedStyle}`}
            style={{
            //   minHeight: responsiveHeight(7),
              justifyContent: 'center',
            }}
            // {...props}
          >
            <ThemedText3 styles="font-SemiBold text-center text-md">
              {item.title}
            </ThemedText3>
          </Pressable>
        </View>
      )}
    />
  );
};

export default ThemedSelect2;
