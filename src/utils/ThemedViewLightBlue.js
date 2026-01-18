import React from 'react';
import {useColorScheme, View} from 'react-native';

const ThemedViewLightBlue = ({children, styles,style, ...props}) => {
  const theme = useColorScheme();

  const themedStyles = `${
    theme === 'dark' ? 'bg-blue-500 border-blue-600' : 'bg-blue-500 border-blue-400'
  } ${styles}`;

  return (
    <View {...props} style={style} className={themedStyles}>
      {children}
    </View>
  );
};

export default ThemedViewLightBlue;
