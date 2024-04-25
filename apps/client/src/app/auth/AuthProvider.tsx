import React, { useState } from 'react';

import { AuthContext } from './AuthContext';
import { IAuthData } from './AuthDataInterface';
import AuthService from './services/AuthService';

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

  return (
    <AuthContext.Provider
      value={{ authData, login, signUp, logout, setAuthData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
