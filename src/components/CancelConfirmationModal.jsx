import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import ThemedText from '../utils/ThemedText';
import ThemedText2 from '../utils/ThemeText2';
import ThemedText3 from '../utils/ThemedText3';
import useT from '../utils/useT';

const CancelConfirmationModal = ({
  visible,
  onClose,
  onConfirm,
  isLoading,
}) => {
  const t = useT();
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/40 px-5">
        <View className="bg-white dark:bg-zinc-700 rounded-xl w-full max-w-sm px-6 py-6 shadow-lg">
          {/* Header */}
          <Text className="text-center text-red-500 text-base font-SemiBold mb-2">
            {t('cancelModal.title')}
          </Text>

          {/* Message */}
          <ThemedText3 styles="text-center mb-6">
            {t('cancelModal.message')}
          </ThemedText3>

          {/* Confirm Button */}
          <Pressable
            disabled={isLoading}
            onPress={onConfirm}
            className={`${
              isLoading ? 'bg-gray-300' : 'bg-red-600'
            }  rounded-md py-3 mb-3`}
          >
            <ThemedText2 styles="text-center font-SemiBold">
              {t('cancelModal.confirmButton')}
            </ThemedText2>
          </Pressable>

          {/* Cancel Button */}
          <Pressable
            onPress={onClose}
            className="bg-zinc-100 dark:bg-zinc-800 rounded-md py-3"
          >
            <ThemedText styles="text-center font-SemiBold">
              {t('cancelModal.cancelButton')}
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CancelConfirmationModal;
