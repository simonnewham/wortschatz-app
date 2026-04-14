import { AuthProvider } from '@/providers/AuthProvider';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function AppRoot() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
      <AuthProvider >
        {/* App content */}
        <Slot />
      </AuthProvider>
    </ThemeProvider>
  );
}
