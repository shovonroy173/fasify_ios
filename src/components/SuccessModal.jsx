/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';
import { useThemeColor } from '../utils/useThemeColor';
import ThemedText2 from '../utils/ThemeText2';
import ThemedViewLightBlue from '../utils/ThemedViewLightBlue';
import ThemedView from '../utils/ThemedView';

export default function SuccessModal({ link, visible, setVisible }) {
  const { icon2 } = useThemeColor();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000); // 2 seconds delay
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <View className="flex-1 justify-center items-center bg-black/40 px-6">
        <ThemedView styles="p-3 rounded-xl items-center ">
          <ActivityIndicator
            size="large"
            color={icon2}
            style={{ marginBottom: 10 }}
          />
          <ThemedViewLightBlue styles="p-3 rounded-xl items-center ">
            <ThemedText2 styles="font-SemiBold text-center">
              Listing Successfull
            </ThemedText2>
          </ThemedViewLightBlue>
        </ThemedView>
      </View>
    </Modal>
  );
}
