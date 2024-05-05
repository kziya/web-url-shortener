import styles from './auth.module.scss';
import { Alert, Button } from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Loading } from '../Loading/Loading';
import AuthService from '../../auth/services/AuthService';
import { useAuth } from '../../auth/AuthContext';
import { AuthNavbar } from './components/AuthNavbar';

export function VerifyByUid() {
  const { uid } = useParams();
  const { authData, setAuthData } = useAuth();
  const [error, setError] = useState<boolean>();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    let timeout: any = null;
    AuthService.verifyByUid(uid)
      .then(() => {
        setIsVerified(true);
        authData.user.isVerified = true;

        setAuthData(authData);
        timeout = setTimeout(() => {
          window.location.reload();
        }, 5000);
      })
      .catch(() => {
        setError(true);
      });

    return () => clearInterval(timeout);
  }, [uid]);

  if (isVerified) {
    return (
      <>
        <AuthNavbar />
        <main className={styles.main}>
          <div className={styles.form}>
            <div className={styles.formTitle}>
              <h1>Congratulations !</h1>
              <br />
              <Alert severity="success">
                You have successfully verified account, you will be redirected
                to the main page
              </Alert>
            </div>
            <br />
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return <Navigate to="/404" />;
  }

  return <Loading />;
}
