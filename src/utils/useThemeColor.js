import {useColorScheme} from 'react-native';

export const useThemeColor = () => {
  const theme = useColorScheme();

  const colors = {
    light: {
      text: '#000000',
      icon: '#ffffff',
      icon2: '#000000',
      icon3: '#d4d4d4',
      background: '#ffffff',
      border: '#d4d4d8',
      placeholder: '#a1a1aa',
      text2: 'zinc-300',
    },
    dark: {
      text: '#e4e4e7',
      icon: '#000000',
      icon2: '#f4f4f5',
      icon3: '#525252',
      background: '#18181b',
      border: '#3f3f46',
      placeholder: '#71717a',
      text2: 'zinc-100',
    },
  };

  return theme === 'dark' ? colors.dark : colors.light;
};
