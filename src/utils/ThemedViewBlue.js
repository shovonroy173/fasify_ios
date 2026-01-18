import React from 'react';
import {View} from 'react-native';
import {useColorScheme} from 'react-native';

const ThemedViewBlue = ({children, styles, style, ...props}) => {
  const theme = useColorScheme();

  const themedStyles = `${
    theme === 'dark' ? 'bg-primary_dark' : 'bg-primary'
  } ${styles}`;

  return (
    <View {...props} style={style} className={themedStyles}>
      {children}
    </View>
  );
};

export default ThemedViewBlue;
