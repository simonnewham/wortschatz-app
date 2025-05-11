import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/providers/SessionProvider';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { useColorScheme, View } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider >
        <Slot />
        <View style={{ alignItems: 'center', backgroundColor: "black" }}>
          <Footer />
        </View>
      </AuthProvider>
    </ThemeProvider>
  );
}
