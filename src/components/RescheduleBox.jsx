import { View, Text, useColorScheme } from 'react-native';
import React from 'react';
import DateRangeSelectorWithModal from './DateRangeSelectorWithModal';
import ThemedView from '../utils/ThemedView';
import ThemedText3 from '../utils/ThemedText3';

const RescheduleBox = () => {
  const theme = useColorScheme();

  return (
    <ThemedView
      styles={` items-start justify-between border ${
        theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'
      }  p-4 rounded-xl gap-4`}
    >
        <View className='flex-row justify-between  w-full'>

        <ThemedText3 styles="font-Regular">Previous Date</ThemedText3>
        <ThemedText3 styles="font-Regular">New Date</ThemedText3>
        </View>
      <DateRangeSelectorWithModal />
    </ThemedView>
  );
};

export default RescheduleBox;
