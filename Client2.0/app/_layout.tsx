import { Footer } from '@/components/Footer';
import { SessionProvider } from '@/providers/SessionProvider';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { useColorScheme, View } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SessionProvider >
        <Slot />
        <View style={{ alignItems: 'center', backgroundColor: "black" }}>
          <Footer />
        </View>
      </SessionProvider>
    </ThemeProvider>
  );
}
