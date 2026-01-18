import React from 'react';
import {Pressable} from 'react-native';
import {useColorScheme} from 'react-native';

const ThemedPressable2 = ({children, onPress, styles, style, ...props}) => {
  const theme = useColorScheme();

  const themedStyles = `${
    theme === 'dark' ? 'bg-zinc-600' : 'bg-zinc-200'
  } ${styles}`;

  return (
    <Pressable {...props} style={style} onPress={onPress} className={themedStyles}>
      {children}
    </Pressable>
  );
};

export default ThemedPressable2;
