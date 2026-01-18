import React from 'react';
import {Pressable} from 'react-native';
import {useColorScheme} from 'react-native';

const ThemedPressableWhite = ({children, onPress, styles, style, ...props}) => {
  const theme = useColorScheme();

  const themedStyles = `${
    theme === 'dark' ? 'bg-black border-zinc-600' : 'bg-white border-zinc-300'
  } ${styles}`;

  return (
    <Pressable {...props} style={style} onPress={onPress} className={themedStyles}>
      {children}
    </Pressable>
  );
};

export default ThemedPressableWhite;
