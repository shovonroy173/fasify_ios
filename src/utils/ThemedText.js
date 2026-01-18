import React from 'react';
import {Text, useColorScheme} from 'react-native';

const ThemedText = ({children, styles, style, ...props}) => {
  const theme = useColorScheme();

  // Apply theme-based text colors and other styles
  const themedStyles = `${
    theme === 'dark' ? 'text-zinc-100' : 'text-black'
  } ${styles}`;

  return (
    <Text {...props} style={style} className={themedStyles}>
      {children}
    </Text>
  );
};

export default ThemedText;
