import styles from './auth.module.scss';
import { AuthNavbar } from './components/AuthNavbar';
import {
  AuthFormInputs,
  AuthFormInputsType,
} from './components/AuthFormInputs';
import { useState } from 'react';
import AuthHttpService from '../../auth/services/AuthHttpService';

export function ForgetPassword() {
  const [isSentEmail, setIsSentEmail] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const onForgetPasswordSubmit = (email: string) => {
    AuthHttpService.sendResetPasswordMail(email)
      .then(() => setIsSentEmail(true))
      .catch(() => setError(true));
  };

  return (
    <>
      <AuthNavbar />
      <main className={styles.main}>
        <div className={styles.form}>
          <div className={styles.formTitle}>
            <h1>Reset your password</h1>
            {!isSentEmail && (
              <h4>Enter your email to request a password reset link</h4>
            )}
          </div>
          <AuthFormInputs
            type={AuthFormInputsType.ForgetPassword}
            onFormSubmit={onForgetPasswordSubmit}
            successMessage={
              isSentEmail ? 'Successfully sent reset email' : null
            }
            errorMessage={error ? 'Something went wrong' : null}
          />
        </div>
      </main>
    </>
  );
}
