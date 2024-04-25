import { useState } from 'react';
import { AuthNavbar } from './components/AuthNavbar';
import styles from './auth.module.scss';
import { Alert, Button } from '@mui/material';
import AuthHttpService from '../../auth/services/AuthHttpService';

export function Verify() {
  const [isVerifyMailSent, setIsVerifyMailSent] = useState(false);
  const [error, setError] = useState<boolean>(false);

  return (
    <>
      <AuthNavbar />
      <main className={styles.main}>
        <div className={styles.form}>
          <div className={styles.formTitle}>
            <h1>Thanks for sign-up</h1>
            <br />
            {isVerifyMailSent ? (
              <Alert severity="success">
                Verification mail successfully sent
              </Alert>
            ) : (
              <h4> You need to verify you email</h4>
            )}

            {error && (
              <Alert severity="error">
                Something went wrong, try again later
              </Alert>
            )}
          </div>
          <br />

          {!isVerifyMailSent && (
            <div className={styles.submitButton}>
              <Button
                variant="contained"
                onClick={() => {
                  AuthHttpService.sendVerifyMail()
                    .then((result) => {
                      setIsVerifyMailSent(true);
                    })
                    .catch((error) => {
                      setError(true);
                    });
                }}
              >
                Send verify mail
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
