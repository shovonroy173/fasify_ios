import React from 'react';
import {Pressable} from 'react-native';
import {useColorScheme} from 'react-native';

const ThemedPressable = ({children, onPress, styles, style, ...props}) => {
  const theme = useColorScheme();

  const themedStyles = `${
    theme === 'dark' ? 'bg-primary_dark' : 'bg-primary'
  } ${styles}`;

  return (
    <Pressable {...props} style={style} onPress={onPress} className={themedStyles}>
      {children}
    </Pressable>
  );
};

export default ThemedPressable;
