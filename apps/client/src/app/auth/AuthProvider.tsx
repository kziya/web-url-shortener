import React, { useEffect, useState } from 'react';

import { AuthContext } from './AuthContext';
import { IAuthData } from './AuthDataInterface';
import AuthService from './services/AuthService';
import AuthLocalstorageService, {
  ACCESS_TOKEN_LOCALSTORAGE_KEY,
  REFRESH_TOKEN_LOCALSTORAGE_KEY,
  USER_LOCALSTORAGE_KEY,
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
    const handleAuthDataChange = (e: StorageEvent) => {
      const authDataKeys = [
        REFRESH_TOKEN_LOCALSTORAGE_KEY,
        ACCESS_TOKEN_LOCALSTORAGE_KEY,
        USER_LOCALSTORAGE_KEY,
      ];

      if (authDataKeys.includes(e.key)) {
        setAuthData(AuthLocalstorageService.getAuthData());
      }
    };

    window.addEventListener('storage', handleAuthDataChange);

    return () => {
      window.removeEventListener('storage', handleAuthDataChange);
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
