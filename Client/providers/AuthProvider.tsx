import { IUserInfo } from '@/models/IUserInfo';
import authService from '@/services/AuthService';
import userService from '@/services/UserService';
import { createContext, use, useState, type PropsWithChildren } from 'react';

const AuthContext = createContext<{
  login: (email: string, password: string) => Promise<boolean | void>;
  register: (email: string, password: string) => Promise<boolean | void>;
  logout: () => Promise<boolean | void>;
  userInfo?: IUserInfo | null;
}>({
  login: async () => { },
  register: async () => { },
  logout: async () => { },
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
  const [user, setUser] = useState<IUserInfo | null>(null);
  
  return (
    <AuthContext
      value={{
        login: async (email: string, password: string) => {
          const result = await authService.login({ email: email, password: password })
          if (result.success) {
            const userInfo = await userService.getUserInfo();
            console.log('User Info:', userInfo);
            setUser(userInfo);
            
            return true;
          }

          throw new Error('Login failed');
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
