import React from 'react';
import {View} from 'react-native';
import {useColorScheme} from 'react-native';

const ThemedView = ({children, styles, ...props}) => {
  const theme = useColorScheme();

  const themedStyles = `${
    theme === 'dark' ? 'bg-black border-zinc-600' : 'bg-white border-zinc-300'
  } ${styles}`;

  return (
    <View {...props}  className={themedStyles}>
      {children}
    </View>
  );
};

export default ThemedView;
