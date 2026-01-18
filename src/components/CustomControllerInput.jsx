// src/components/CounterInput.js
import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import ThemedText from '../utils/ThemedText';

export default function CounterInput({ control, name, label , price , min}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={min}
      render={({ field: { value, onChange } }) => (
        <View className="flex-row justify-between items-center border-b border-gray-200 py-3">
          <View>
            <ThemedText styles="text-base font-Medium">{label}</ThemedText>
            {/* <ThemedText styles="text-base font-Medium"> {price}</ThemedText> */}
          </View>

          <View className="flex-row items-center border border-gray-300 rounded-md overflow-hidden">
            <Pressable
              className="w-8 h-8 bg-gray-100 items-center justify-center"
              onPress={() => onChange(Math.max(min, value - 1))}
            >
              <Text className="text-xl">−</Text>
            </Pressable>

            <ThemedText styles="px-4 text-base font-Regular"> {value}</ThemedText>

            <Pressable
              className="w-8 h-8 bg-gray-100 items-center justify-center"
              onPress={() => onChange(value + 1)}
            >
              <Text className="text-xl">+</Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
}
