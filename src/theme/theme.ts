import { DefaultTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1DA1F2',
    accent: '#1DA1F2',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#000000',
    placeholder: '#9CA3AF',
    border: '#E5E7EB',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#1DA1F2',
    accent: '#1DA1F2',
    background: '#1F2937',
    surface: '#374151',
    text: '#FFFFFF',
    placeholder: '#9CA3AF',
    border: '#4B5563',
  },
};