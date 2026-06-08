import authService from '@/services/AuthService';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationDrawer } from './(drawer)/navigation-drawer';

export default function AppLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = async () => {
      setLoading(true);
      if (!await authService.isAuthenticated()) {
        router.replace("/login");
      }
      setLoading(false);
    }
    auth()
  }, [])

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-50">
        <ActivityIndicator size="large" color="#d4fd52" />
      </View>
    );
  }

  return (
    <NavigationDrawer />
  );
}
