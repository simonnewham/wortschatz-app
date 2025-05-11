import { createContext, use, type PropsWithChildren } from 'react';
import { useStorageState } from '../hooks/useStorageState';

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  session?: string | null;
  userInfo?: any;
  isLoading: boolean;
}>({
  signIn: async () => { },
  signOut: async () => { },
  session: null,
  userInfo: undefined,
  isLoading: false
});

export function useAuthSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('Authentication');

  return (
    <AuthContext
      value={{
        signIn: async (email: string, password: string) => {
          setSession('xxx');

        },
        signOut: async () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext>
  );
}
