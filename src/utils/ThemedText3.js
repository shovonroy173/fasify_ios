import React from 'react';
import {Text} from 'react-native';
import {useColorScheme} from 'react-native';

const ThemedText3 = ({children, styles, style, ...props}) => {
  const theme = useColorScheme();

  // Apply theme-based text colors and other styles
  const themedStyles = `${
    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
  } ${styles}`;

  return (
    <Text {...props} style={style} className={themedStyles}>
      {children}
    </Text>
  );
};

export default ThemedText3;
