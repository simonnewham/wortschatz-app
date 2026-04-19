import authService from '@/services/AuthService';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { NavigationDrawer } from './(drawer)/navigation-drawer';

export default function AppLayout() {

  useEffect(() => {
    const auth = async () => {
      if (!await authService.isAuthenticated()) {
        router.replace("/login");
      }
    }
    auth()
  }, [])


  return (
    <NavigationDrawer />
  );
}
