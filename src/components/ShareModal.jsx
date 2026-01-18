import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  Clipboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useThemeColor } from '../utils/useThemeColor';
import ThemedText2 from '../utils/ThemeText2';
import ThemedView from '../utils/ThemedView';

export default function ShareModal({ link , visible, setVisible}) {
  const { icon2 } = useThemeColor();
//   const [visible, setVisible] = useState(false);

  const handleCopy = () => {
    Clipboard.setString(link);
    Alert.alert('Copied!', 'Link has been copied to clipboard.');
  };

  return (

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/40 px-6">
          <View className="bg-white dark:bg-zinc-800 rounded-xl w-full p-5 gap-5">
            <Text className="text-lg font-SemiBold dark:text-white">
              Share this link
            </Text>

            <View className="flex-row items-center bg-zinc-100 dark:bg-zinc-700 rounded-lg p-3">
              <Text
                className="flex-1 text-sm font-Medium dark:text-white"
                numberOfLines={1}
                ellipsizeMode="middle"
              >
                {link}
              </Text>
              <TouchableOpacity onPress={handleCopy}>
                <Feather name="copy" size={20} color={icon2} />
              </TouchableOpacity>
            </View>

            <Pressable
              onPress={() => setVisible(false)}
              className="bg-primary py-2 rounded-lg"
            >
              <ThemedText2 styles="text-center font-SemiBold text-white">
                Close
              </ThemedText2>
            </Pressable>
          </View>
        </View>
      </Modal>
 
  );
}
