import React from 'react';
import {Text, useColorScheme} from 'react-native';

const ThemedText4 = ({children, styles, style, ...props}) => {
  const theme = useColorScheme();

  // Apply theme-based text colors and other styles
  const themedStyles = `${
    theme === 'dark' ? 'text-zinc-900' : 'text-zinc-700'
  } ${styles}`;

  return (
    <Text {...props} style={style} className={themedStyles}>
      {children}
    </Text>
  );
};

export default ThemedText4;
