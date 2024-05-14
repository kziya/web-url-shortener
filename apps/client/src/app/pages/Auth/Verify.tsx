import { useEffect, useState } from 'react';

import { Alert, Button } from '@mui/material';
import AuthHttpService from '../../auth/services/AuthHttpService';
import AuthService from '../../auth/services/AuthService';

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
    <main>
      <div>
        <div>
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
          <div>
            <Button
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
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
