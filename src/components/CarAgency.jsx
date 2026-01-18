import { View, Pressable } from 'react-native';
import React from 'react';
import ThemedView from '../utils/ThemedView';
import ThemedText from '../utils/ThemedText';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
import { useThemeColor } from '../utils/useThemeColor';
import { Controller, useFormContext } from 'react-hook-form';

const CarAgency = ({ item, name, navigation, path }) => {
  const { icon2 } = useThemeColor();
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Pressable
          onPress={() => {
            onChange(item);
            navigation.navigate(path, { item });
          }}
        >
          <ThemedView styles="flex-row items-start gap-5 border rounded-lg p-3">
            {/* <Ionicons name="car-sport-outline" size={20} color={icon2} /> */}
            <View className="gap-2">
              <ThemedText>{item.agencyName}</ThemedText>
              <View className="flex-row items-center gap-2">
                {/* <Feather name="map-pin" size={15} color="#999" /> */}
                <ThemedText>{item.location}</ThemedText>
              </View>
            </View>
          </ThemedView>
        </Pressable>
      )}
    />
  );
};

export default CarAgency;
