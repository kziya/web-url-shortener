import {
  AuthFormInputs,
  AuthFormInputsType,
} from './components/AuthFormInputs';
import { useAuth } from '../../auth/AuthContext';
import { useState } from 'react';
import { getAuthErrorText } from './error/ErrorMessageMapper';
import AuthLayout from './AuthLayout';

export function Login() {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);

  const onLoginSubmit = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (e: any) {
      setErrorMessage(getAuthErrorText(e?.response?.data?.message));
    }
  };

  return (
    <AuthLayout formTitle="Login and start sharing">
      <AuthFormInputs
        type={AuthFormInputsType.Login}
        onFormSubmit={onLoginSubmit}
        errorMessage={errorMessage}
      />
    </AuthLayout>
  );
}
