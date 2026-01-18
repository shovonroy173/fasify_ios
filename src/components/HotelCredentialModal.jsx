import React from 'react';
import { View, Text, Modal, Pressable, TextInput, useColorScheme } from 'react-native';
import ThemedText from '../utils/ThemedText';
import ThemedText2 from '../utils/ThemeText2';
import ThemedText3 from '../utils/ThemedText3';
// import Feather from 'react-native-vector-icons/Feather';
import { useThemeColor } from '../utils/useThemeColor';
import ThemedView from '../utils/ThemedView';
import DateRangeSelectorWithModal from './DateRangeSelectorWithModal';

const HotelCredentialModal = ({ visible, onClose, onConfirm }) => {
  const { icon2, icon3 } = useThemeColor();
    const theme = useColorScheme();
  

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/40 px-5">
        <View className="bg-white dark:bg-zinc-700 rounded-xl w-full max-w-sm px-6 py-6 shadow-lg gap-5">
          {/* Header */}
          {/* <ThemedView
            styles="relative p-1  rounded-md"
            style={{
              shadowColor: '#a1a1aa', // neutral-400 gray shadow
              shadowOffset: {
                width: 0,
                height: 8, // more vertical offset
              },
              shadowOpacity: 0.4, // slightly more visible
              shadowRadius: 10, // more blur/spread

              // Android shadow
              elevation: 12, // stronger elevation
            }}
          >
            <Feather
              name="search"
              size={24}
              color={icon3}
              style={{ position: 'absolute', left: 10, top: 10 }}
            />
            <TextInput
              style={{
                paddingLeft: 40,
                color: theme === 'dark' ? '#71717a' : '#a1a1aa',
              }}
              placeholder="Search"
              placeholderTextColor={theme === 'dark' ? '#52525b' : '#52525b'}
            />
          </ThemedView> */}

          <DateRangeSelectorWithModal />

          <ThemedView
            styles="relative p-1  rounded-md"
            style={{
              shadowColor: '#a1a1aa', // neutral-400 gray shadow
              shadowOffset: {
                width: 0,
                height: 8, // more vertical offset
              },
              shadowOpacity: 0.4, // slightly more visible
              shadowRadius: 10, // more blur/spread

              // Android shadow
              elevation: 12, // stronger elevation
            }}
          >
            {/* <Feather
              name="users"
              size={24}
              color={icon3}
              style={{ position: 'absolute', left: 10, top: 10 }}
            /> */}
            <TextInput
              style={{
                paddingLeft: 40,
                color: theme === 'dark' ? '#71717a' : '#a1a1aa',
              }}
              placeholder="No. of Persons"
              placeholderTextColor={theme === 'dark' ? '#52525b' : '#52525b'}
            />
          </ThemedView>

          {/* Cancel Button */}
          <Pressable
            onPress={onConfirm}
            className="bg-primary dark:bg-primary_dark rounded-md py-3"
          >
            <ThemedText2 styles=" text-center font-SemiBold">Process</ThemedText2>
          </Pressable>
          <Pressable
            onPress={onClose}
            className="bg-zinc-200 dark:bg-zinc-600 rounded-md py-3"
          >
            <Text className="text-red-500 text-center font-SemiBold">Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default HotelCredentialModal;
