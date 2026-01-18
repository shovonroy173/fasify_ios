import React from 'react';
import { View, Text, Pressable } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import ThemedText2 from '@/utils/ThemeText2';
// import ThemedTextColor from '@/utils/ThemedTextColor';
import ThemedViewLightBlue from '@/utils/ThemedViewLightBlue';
import ThemedText from '@/utils/ThemedText';
import ThemedPressable from '@/utils/ThemedPressable';

const Upcoming = ({ navigation }) => {
  return (
    <ThemedViewLightBlue
      styles="flex-1 items-center justify-center  gap-5"
      style={{
        padding: responsiveWidth(5),
      }}
    >
      {/* <Icon
        name="tools"
        size={100}
        color="#1d4ed8" // Tailwind orange-500
        style={{ marginBottom: 20 }}
      /> */}
      <ThemedText2 styles="text-2xl font-Bold  text-center mb-2">
        Coming Soon!
      </ThemedText2>
      <ThemedText styles="text-Regular text-center">
        This screen is under design development. Stay tuned for updates.
      </ThemedText>

      <ThemedPressable onPress={() => navigation.goBack()} styles="p-3 rounded-lg w-full">
        <ThemedText2 styles="text-center font-SemiBold text-lg">Go Back</ThemedText2>
      </ThemedPressable>
    </ThemedViewLightBlue>
  );
};

export default Upcoming;
