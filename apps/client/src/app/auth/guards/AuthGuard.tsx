import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../AuthContext';

export const AuthGuard: React.FC<{
  children: React.ReactNode;
  onlyNotVerified?: boolean;
}> = ({ children, onlyNotVerified }) => {
  const { authData } = useAuth();

  if (!authData?.refreshToken) {
    return <Navigate to="/auth/login" />;
  }

  if (!onlyNotVerified && !authData?.user?.isVerified) {
    return <Navigate to="/auth/verify" />;
  }

  if (onlyNotVerified && authData?.user?.isVerified) {
    return <Navigate to="/" />;
  }

  return children;
};
