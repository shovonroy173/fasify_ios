import React from 'react';
import {View} from 'react-native';
import {useColorScheme} from 'react-native';

const ThemedViewOrange = ({children, styles, ...props}) => {
  const theme = useColorScheme();

  const themedStyles = `${
    theme === 'dark' ? ' bg-[#f25729]' : 'bg-[#FF7D56]'
  } ${styles}`;

  return (
    <View {...props} className={themedStyles}>
      {children}
    </View>
  );
};

export default ThemedViewOrange;
