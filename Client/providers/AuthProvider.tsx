import { IUserInfo } from '@/models/IUserInfo';
import authService from '@/services/AuthService';
import userService from '@/services/UserService';
import { createContext, use, useEffect, useState, type PropsWithChildren } from 'react';

const AuthContext = createContext<{
  login: (email: string, password: string) => Promise<boolean | void>;
  register: (email: string, password: string) => Promise<boolean | void>;
  logout: () => Promise<boolean | void>;
  refreshUserInfo: () => Promise<void>;
  userInfo?: IUserInfo | null;
}>({
  login: async () => { },
  register: async () => { },
  logout: async () => { },
  refreshUserInfo: async () => { },
  userInfo: undefined,
});

export function useAuthSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <AuthProvider />');
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  // Need to fetch user info on refresh
  const [user, setUser] = useState<IUserInfo | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (await authService.isAuthenticated()) {
        userService.getUserInfo().then((userInfo) => {
          if (userInfo) {
            setUser(userInfo);
          } else {
            authService.logout();
          }
        }).catch(() => {
          authService.logout();
        });
      }
    }
    checkAuth();
  }, []);

  return (
    <AuthContext
      value={{
        login: async (email: string, password: string) => {
          const result = await authService.login({ email: email, password: password })
          if (result.success) {
            const userInfo = await userService.getUserInfo();
            setUser(userInfo);

            return true;
          }

          throw new Error('Login failed');
        },
        refreshUserInfo: async () => {
          const userInfo = await userService.getUserInfo();
          setUser(userInfo);
        },
        register: async (email: string, password: string) => {
          const result = await authService.register({ email: email, password: password })
          if (result.success) {
            return true;
          }
          throw new Error('Register failed');
        },
        logout: async () => {
          authService.logout();
          return true;
        },
        userInfo: user
      }}>
      {children}
    </AuthContext>
  );
}

