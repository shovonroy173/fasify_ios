import React from 'react';
import {View} from 'react-native';
import {useColorScheme} from 'react-native';

const ThemedViewYellow = ({children, styles, style, ...props}) => {
  const theme = useColorScheme();

  const themedStyles = `${
    theme === 'dark' ? 'bg-yellow-100 border-primary' : 'bg-yellow-50 border-primary'
  } ${styles}`;

  return (
    <View {...props} style={style} className={themedStyles}>
      {children}
    </View>
  );
};

export default ThemedViewYellow;
