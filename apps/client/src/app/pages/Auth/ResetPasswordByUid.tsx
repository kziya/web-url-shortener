import { Alert, Button, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loading } from '../Loading/Loading';
import AuthHttpService from '../../auth/services/AuthHttpService';
import { NotFound } from '../NotFound/NotFound';

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
    <main>
      <div>
        <div>
          <h1>Reset your password</h1>
        </div>
        {resetPassword ? (
          <Alert severity="success">
            Successfully reset password, you will be redirected to the login
            page
          </Alert>
        ) : (
          <div>
            {error && (
              <>
                <Alert severity="error">{'Something went wrong'}</Alert>
                <br />
              </>
            )}
            <div>
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

            <div>
              <Button
                variant="contained"
                onClick={() => {
                  AuthHttpService.resetPassword(uid, password, confirmPassword)
                    .then(() => {
                      setResetPassword(true);
                      setTimeout(() => {
                        window.location.href = '/auth/login';
                      }, 3000);
                    })
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
  );
}
