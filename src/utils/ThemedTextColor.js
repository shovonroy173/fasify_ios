import React from 'react';
import {Text} from 'react-native';
import {useColorScheme} from 'react-native';

const ThemedTextColor = ({children, styles, style, ...props}) => {
  const theme = useColorScheme();

  // Apply theme-based text colors and other styles
  const themedStyles = `${
    theme === 'dark' ? 'text-primary_dark' : 'text-primary'
  } ${styles}`;

  return (
    <Text {...props} style={style} className={themedStyles}>
      {children}
    </Text>
  );
};

export default ThemedTextColor;
