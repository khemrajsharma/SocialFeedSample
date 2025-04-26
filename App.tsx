import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { store } from './src/store/store';
import { lightTheme, darkTheme } from './src/theme/theme';
import AppNavigator from './src/navigation/AppNavigator';

function ThemedApp() {
  const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);
  return (
    <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AppNavigator />
    </PaperProvider>
  );
}

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemedApp />
    </ReduxProvider>
  );
}
