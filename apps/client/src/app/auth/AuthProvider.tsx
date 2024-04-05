import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { IAuthData } from './AuthDataInterface';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authData, setAuthData] = useState<IAuthData | null>(null);

  const login = () => {
    setAuthData({ token: '' });
  };
  const logout = () => {
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
