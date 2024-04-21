import React from 'react';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { authData } = useAuth();

  if (!authData?.refreshToken) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};
