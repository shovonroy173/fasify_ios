import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Linking,
  StyleSheet,
  useColorScheme,
} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { useThemeColor } from '../utils/useThemeColor';
import useT from '../utils/useT';

const CallModal = ({ visible, onClose, phoneNumber }) => {
  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
    onClose(); // optional: close modal after opening dialer
  };
  const theme = useColorScheme();
  const styles = getStyles(theme);
  const { icon } = useThemeColor();
  const t = useT();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.label}>{t('callRideStatus.callPrompt')}</Text>
          <Text style={styles.phone}>{phoneNumber}</Text>

          <Pressable style={styles.callButton} onPress={handleCall}>
            {/* <Ionicons name="call" size={24} color={icon} /> */}
            <Text style={styles.callText}>{t('callRideStatus.callNow')}</Text>
          </Pressable>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>{t('cancel')}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CallModal;

const getStyles = theme =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: 300,
      backgroundColor: theme === 'dark' ? '#000' : '#fff',
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
    },
    label: {
      fontSize: 16,
      marginBottom: 10,
      color: theme === 'dark' ? '#a1a1aa' : '#52525b',
      fontFamily: 'Inter_18pt-Regular',
    },
    phone: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: theme === 'dark' ? '#f4f4f4' : '#040404',
    },
    callButton: {
      backgroundColor: theme === 'dark' ? '#2563eb' : '#1d4ed8',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 8,
      marginBottom: 15,
    },
    callText: {
   
      //   fontWeight: 'bold',
      color: theme === 'dark' ? '#040404' : '#f4f4f4',
      fontFamily: 'Inter_18pt-SemiBold',
    },
    closeButton: {
      padding: 5,
    },
    closeText: {
      color: '#555',
      fontFamily: 'Inter_18pt-Medium',
    },
  });
