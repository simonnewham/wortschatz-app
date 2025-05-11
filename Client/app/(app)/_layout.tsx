import { Redirect, Stack } from 'expo-router';
import { Text } from 'react-native';
import { useAuthSession } from '../../providers/SessionProvider';


export default function AppLayout() {
  const { session, isLoading } = useAuthSession();
  
  if (isLoading) {
    return <Text>Loading...</Text>;
   }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <Stack />;
}
