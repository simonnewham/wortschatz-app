import authService from '@/services/AuthService';
import { Redirect } from 'expo-router';
import { NavigationDrawer } from './(drawer)/navigation-drawer';

export default function AppLayout() {
  // TODO: Add async storage or context for auth state

  if (!authService.isAuthenticated()) {
    return <Redirect href="/login" />;
  }

  return (
    <NavigationDrawer />
  );
}
