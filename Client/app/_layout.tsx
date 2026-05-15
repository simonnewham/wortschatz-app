import { AuthProvider } from '@/providers/AuthProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import { Slot } from 'expo-router';

export default function AppRoot() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Slot />
      </ToastProvider>
    </AuthProvider>
  );
}
