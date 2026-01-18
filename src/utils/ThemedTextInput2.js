import React from 'react';
import {TextInput, useColorScheme} from 'react-native';

const ThemedTextInput2 = ({
  value,
  onChangeText,
  placeholder,
  styles = '',
  placeholderStyles = '',
  ...props
}) => {
  const theme = useColorScheme();

  // Default colors for text and placeholder based on theme
  const textColor = theme === 'dark' ? 'text-zinc-200' : 'text-black';
  const placeholderColor = theme === 'dark' ? '#a1a1aa' : '#6b7280'; // zinc-400 : gray-500

  const combinedStyles = `${textColor} ${styles}`;

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderColor}
      className={combinedStyles}
      {...props}
    />
  );
};

export default ThemedTextInput2;
