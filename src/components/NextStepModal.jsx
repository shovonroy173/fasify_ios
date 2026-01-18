// components/NextStepModal.js
import React from 'react';
import { Modal, View, Pressable } from 'react-native';
import ThemedText from '../utils/ThemedText';
import ThemedView from '../utils/ThemedView';

const NextStepModal = ({ visible, onClose, navigation, businessType }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <ThemedView styles="p-6 rounded-2xl w-4/5">
          <ThemedText styles="text-lg font-SemiBold mb-4 text-center">
            What do you want to do?
          </ThemedText>

          <Pressable
            className="bg-blue-600 p-4 rounded-xl mb-3"
            onPress={() => {
              onClose();
              navigation.navigate('ProviderBottomTab'); // 👈 change route name
            }}
          >
            <ThemedText styles="text-white text-center font-Medium">
              Go to Dashboard
            </ThemedText>
          </Pressable>

          <Pressable
            className="bg-green-600 p-4 rounded-xl"
            onPress={() => {
              onClose();
              navigation.navigate(businessType && businessType?.path); // 👈 goes to business flow
            }}
          >
            <ThemedText styles="text-white text-center font-Medium">
              Create Business
            </ThemedText>
          </Pressable>

          <Pressable className="mt-3 p-2" onPress={onClose}>
            <ThemedText styles="text-center text-gray-500 text-center font-Regular">
              Cancel
            </ThemedText>
          </Pressable>
        </ThemedView>
      </View>
    </Modal>
  );
};

export default NextStepModal;
