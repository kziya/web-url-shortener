import { Link } from '@mui/joy';
import {
  AuthFormInputs,
  AuthFormInputsType,
} from './components/AuthFormInputs';
import { useAuth } from '../../auth/AuthContext';
import { useState } from 'react';
import { getAuthErrorText } from './error/ErrorMessageMapper';
import { Link as ReactRouterLink } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export function SignUp() {
  const { signUp } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSignUpSubmit = async (email: string, password: string) => {
    try {
      await signUp(email, password);
    } catch (e: any) {
      setErrorMessage(getAuthErrorText(e?.response?.data?.message));
    }
  };

  return (
    <AuthLayout formTitle="Create your account">
      <AuthFormInputs
        type={AuthFormInputsType.SignUp}
        onFormSubmit={onSignUpSubmit}
        errorMessage={errorMessage}
      />
    </AuthLayout>
  );
}
