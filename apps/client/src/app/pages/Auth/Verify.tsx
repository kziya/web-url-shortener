import { useEffect, useState } from 'react';

import { Alert, Button, styled } from '@mui/material';
import AuthHttpService from '../../auth/services/AuthHttpService';
import AuthService from '../../auth/services/AuthService';
import AuthLayout from './AuthLayout';

export function Verify() {
  const [isVerifyMailSent, setIsVerifyMailSent] = useState(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      const status = await AuthService.updateVerifyStatus();
      if (status) {
        window.location.reload();
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthLayout formTitle="Thanks for sign-up">
      <div>
        {isVerifyMailSent ? (
          <Alert severity="success">Verification mail successfully sent</Alert>
        ) : (
          <Subtitle> You need to verify you email</Subtitle>
        )}

        {error && (
          <Alert severity="error">Something went wrong, try again later</Alert>
        )}
      </div>
      {!isVerifyMailSent && (
        <div>
          <StyledButton
            variant="contained"
            onClick={() => {
              AuthHttpService.sendVerifyMail()
                .then((result) => {
                  setIsVerifyMailSent(true);
                  setError(false);
                })
                .catch((error) => {
                  setIsVerifyMailSent(false);
                  setError(true);
                });
            }}
          >
            Send verify mail
          </StyledButton>
        </div>
      )}
    </AuthLayout>
  );
}

const Subtitle = styled('h4')({
  color: '#fff',
  fontSize: '20px',
  fontWeight: 400,
  textAlign: 'center',
  padding: "20px 0"
});

const StyledButton = styled(Button)({
  width: '100%',
  marginTop: '15px',
});
