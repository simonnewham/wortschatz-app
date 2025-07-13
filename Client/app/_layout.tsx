import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/providers/AuthProvider';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { useColorScheme, View } from 'react-native';

export default function AppRoot() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider >
        {/* App content */}
        <Slot />
        <View style={{ alignItems: 'center', backgroundColor: "black" }}>
          <Footer />
        </View>
      </AuthProvider>
    </ThemeProvider>
  );
}
