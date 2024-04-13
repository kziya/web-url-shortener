import React from 'react';
import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';

export const NotAuthGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { authData } = useAuth();

  if (authData?.user && authData.refreshToken && authData.accessToken) {
    return <Navigate to="/" />;
  }

  return children;
};
