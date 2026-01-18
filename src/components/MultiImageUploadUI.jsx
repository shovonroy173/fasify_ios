/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Image,
  Pressable,
  useColorScheme,
  StyleSheet,
} from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useThemeColor } from '../utils/useThemeColor';
import ThemedText from '../utils/ThemedText';
import ThemedText3 from '../utils/ThemedText3';
import { CircleX, Upload } from 'lucide-react-native';

const MultiImageUploadUI = ({ value = [], label, onPress, onRemove }) => {
  const theme = useColorScheme();
  const { icon2 } = useThemeColor();

  const themedLabelClasses = `${
    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
  } text-md`;

  const maxReached = value.length >= 5;

  return (
    <View style={{ gap: 8 }}>
      {label && (
        <ThemedText styles={` font-Medium text-md mb-1`}>
          {label}
        </ThemedText>
      )}

      <Pressable
        style={[
          styles.uploadButton,
          maxReached && styles.uploadButtonDisabled,
        ]}
        onPress={!maxReached ? onPress : null}
      >
        <Upload size={20} color={icon2}/>
     
        <ThemedText styles="font-SemiBold">
          {maxReached ? 'Maximum 5 Images' : label}
        </ThemedText>
      </Pressable>

      <View style={styles.imagesContainer}>
        {value.map((uri, idx) => (
          <View key={idx} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} />
            <Pressable style={styles.removeIcon} onPress={() => onRemove(idx)}>
            
              <CircleX size={20} color="#f43f5e"/>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  uploadButton: {
    borderWidth: 1,
    borderColor: '#d1d5db', // zinc-300
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    alignItems: 'center',
  },
  uploadButtonDisabled: {
    opacity: 0.5,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
    paddingHorizontal: 8,
  },
  imageWrapper: {
    position: 'relative',
    width: responsiveWidth(30),
    height: responsiveHeight(15),
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 8,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  removeIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 1,
  },
});

export default MultiImageUploadUI;
