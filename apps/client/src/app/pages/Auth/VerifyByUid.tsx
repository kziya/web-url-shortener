import { Alert } from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Loading } from '../Loading/Loading';
import AuthService from '../../auth/services/AuthService';
import { useAuth } from '../../auth/AuthContext';
import AuthLayout from './AuthLayout';

export function VerifyByUid() {
  const { uid } = useParams();
  const { authData, setAuthData } = useAuth();
  const [error, setError] = useState<boolean>();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout = null;
    AuthService.verifyByUid(uid)
      .then(() => {
        setIsVerified(true);
        authData.user.isVerified = true;

        setAuthData(authData);
        timeout = setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      })
      .catch(() => {
        setError(true);
      });

    return () => clearInterval(timeout);
  }, [uid]);

  if (isVerified) {
    return (
      <AuthLayout formTitle="Congratulations !">
        <div>
          <Alert severity="success">
            You have successfully verified account, you will be redirected to
            the main page
          </Alert>
        </div>
      </AuthLayout>
    );
  }

  if (error) {
    return <Navigate to="/404" />;
  }

  return <Loading />;
}
