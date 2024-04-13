import React, { useState } from 'react';

import { AuthContext } from './AuthContext';
import { IAuthData } from './AuthDataInterface';
import AuthHttpService from './services/AuthHttpService';
import AuthLocalstorageService from './services/AuthLocalstorageService';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authData, setAuthData] = useState<IAuthData | null>(
    AuthLocalstorageService.getAuthData()
  );

  const login = async (email: string, password: string) => {
    const authData = await AuthHttpService.login(email, password);
    AuthLocalstorageService.setAuthData(authData);
    setAuthData(authData);
  };

  const signUp = async (email: string, password: string) => {
    const authData = await AuthHttpService.signUp(email, password);

    AuthLocalstorageService.setAuthData(authData);
    setAuthData(authData);
  };

  const logout = () => {
    AuthLocalstorageService.clearAuthData();
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ authData, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
