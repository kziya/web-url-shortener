import React, { useEffect, useState } from 'react';

import { AuthContext } from './AuthContext';
import { IAuthData } from './AuthDataInterface';
import AuthService from './services/AuthService';
import AuthLocalstorageService, {
  REFRESH_TOKEN_LOCALSTORAGE_KEY,
} from './services/AuthLocalstorageService';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authData, setAuthData] = useState<IAuthData | null>(
    AuthService.getAuthData()
  );

  const login = async (email: string, password: string) => {
    const authData = await AuthService.login(email, password);
    setAuthData(authData);
  };

  const signUp = async (email: string, password: string) => {
    const authData = await AuthService.signUp(email, password);

    setAuthData(authData);
  };

  const logout = () => {
    AuthService.logout();
    setAuthData(null);
  };

  useEffect(() => {
    const handleRefreshTokenChange = (e: StorageEvent) => {
      if (e.key === REFRESH_TOKEN_LOCALSTORAGE_KEY) {
        setAuthData(AuthLocalstorageService.getAuthData());
      }
    };

    window.addEventListener('storage', handleRefreshTokenChange);

    return () => {
      window.removeEventListener('storage', handleRefreshTokenChange);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ authData, login, signUp, logout, setAuthData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
