/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, Text } from 'react-native';
// import { Feather } from 'react-native-vector-icons';
import ThemedView from '../utils/ThemedView';
import ThemedText from '../utils/ThemedText';

const DestinationCardGrid = ({ destinations }) => {
  const rows = Array.from({ length: Math.ceil(destinations.length / 2) });

  return (
    <View className="gap-4">
      {rows.map((_, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-between">
          {[0, 1].map((colIndex) => {
            const idx = rowIndex * 2 + colIndex;
            if (idx >= destinations.length)
              return <View key={colIndex} className="w-[48%]" />;
            const place = destinations[idx];
            return (
              <ThemedView
                key={colIndex}
                style={{
                  shadowColor: '#a1a1aa',
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.4,
                  shadowRadius: 10,
                  elevation: 12,
                }}
                styles="w-[48%] rounded-lg overflow-hidden"
              >
                <Image
                  source={{ uri: place.image }}
                  className="w-full h-24"
                  resizeMode="cover"
                />
                <View className="p-2">
                  <View className="flex-row items-center gap-1">
                    {/* <Feather name="map-pin" size={12} color="gray" /> */}
                    <ThemedText styles="text-sm font-Medium">
                      {place.name}
                    </ThemedText>
                  </View>
                  <Text className="text-xs text-gray-500">
                    {place.count} things to do
                  </Text>
                </View>
              </ThemedView>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default DestinationCardGrid;
