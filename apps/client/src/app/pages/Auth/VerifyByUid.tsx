import { Loading } from '../Loading/Loading';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import AuthService from '../../auth/services/AuthService';
import { useAuth } from '../../auth/AuthContext';

export function VerifyByUid() {
  const { uid } = useParams();
  const { authData, setAuthData } = useAuth();
  const [error, setError] = useState<boolean>();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    AuthService.verifyByUid(uid)
      .then(() => {
        setIsVerified(true);
        authData.user.isVerified = true;

        setAuthData(authData);
      })
      .catch(() => {
        setError(true);
      });
  }, [uid]);

  if (isVerified) {
    return <Navigate to="/" />;
  }

  if (error) {
    return <Navigate to="/404" />;
  }

  return <Loading />;
}
