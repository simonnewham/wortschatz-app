import authService from '@/services/AuthService';
import { Redirect, Stack } from 'expo-router';


export default function AppLayout() {
  // TODO: Add async storage or context for auth state

  if (!authService.isAuthenticated()) {
    return <Redirect href="/login" />;
  }

  return <Stack />;
}
