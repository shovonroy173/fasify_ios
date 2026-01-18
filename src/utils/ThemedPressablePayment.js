import React from 'react';
import {Pressable} from 'react-native';
import {useColorScheme} from 'react-native';

const ThemedPressablePayment = ({children, onPress, styles, style, ...props}) => {
  const theme = useColorScheme();

  const themedStyles = `${
    theme === 'dark' ? 'bg-yellow-300' : 'bg-yellow-100'
  } ${styles}`;

  return (
    <Pressable {...props} style={style} onPress={onPress} className={themedStyles}>
      {children}
    </Pressable>
  );
};

export default ThemedPressablePayment;
