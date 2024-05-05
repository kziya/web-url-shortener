import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loading } from '../Loading/Loading';
import AuthHttpService from '../../auth/services/AuthHttpService';
import { NotFound } from '../NotFound/NotFound';
import { AuthNavbar } from './components/AuthNavbar';
import styles from './auth.module.scss';
import { Alert, Button, TextField } from '@mui/material';

export function ResetPasswordByUid() {
  const { uid } = useParams();
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [uidError, setUidError] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPassword, setResetPassword] = useState(false);

  useEffect(() => {
    AuthHttpService.validateResetPasswordUid(uid)
      .then(() => setIsLoadingPage(false))
      .catch((e) => {
        setUidError(true);
      });
  }, [uid]);

  if (uidError) {
    return <NotFound />;
  }

  if (isLoadingPage) {
    return <Loading />;
  }

  return (
    <>
      <AuthNavbar />
      <main className={styles.main}>
        <div className={styles.form}>
          <div className={styles.formTitle}>
            <h1>Reset your password</h1>
          </div>
          {resetPassword ? (
            <Alert severity="success">
              Successfully reset password, you will be redirected to the login
              page
            </Alert>
          ) : (
            <div className={styles.formInputs}>
              {error && (
                <>
                  <Alert severity="error">{'Something went wrong'}</Alert>
                  <br />
                </>
              )}
              <div className={styles.textInputs}>
                <TextField
                  id="password-input"
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />

                <TextField
                  id="confirm-password-input"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className={styles.submitButton}>
                <Button
                  variant="contained"
                  onClick={() => {
                    AuthHttpService.resetPassword(
                      uid,
                      password,
                      confirmPassword
                    )
                      .then(() => setResetPassword(true))
                      .catch(() => setError(true));
                  }}
                >
                  Reset password
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
