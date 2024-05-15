import {
  AuthFormInputs,
  AuthFormInputsType,
} from './components/AuthFormInputs';
import { useState } from 'react';
import AuthHttpService from '../../auth/services/AuthHttpService';
import AuthLayout from './AuthLayout';

export function ForgetPassword() {
  const [isSentEmail, setIsSentEmail] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const onForgetPasswordSubmit = (email: string) => {
    AuthHttpService.sendResetPasswordMail(email)
      .then(() => {
        setIsSentEmail(true);
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 3000);
      })
      .catch(() => setError(true));
  };

  return (
    <AuthLayout formTitle="Reset your password">
      <AuthFormInputs
        type={AuthFormInputsType.ForgetPassword}
        onFormSubmit={onForgetPasswordSubmit}
        successMessage={
          isSentEmail
            ? 'Successfully sent reset email, you will be redirected to the login page'
            : null
        }
        errorMessage={error ? 'Something went wrong' : null}
      />
    </AuthLayout>
  );
}
