import { Stack } from 'expo-router';
import { Text } from 'react-native';


export default function AppLayout() {
const isLoading = false; // Replace with your loading state
  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
