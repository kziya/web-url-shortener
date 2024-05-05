import styles from './auth.module.scss';
import { Link } from '@mui/joy';
import { AuthNavbar } from './components/AuthNavbar';
import {
  AuthFormInputs,
  AuthFormInputsType,
} from './components/AuthFormInputs';
import { useAuth } from '../../auth/AuthContext';
import { useState } from 'react';
import { getAuthErrorText } from './error/ErrorMessageMapper';
import { Link as ReactRouterLink } from 'react-router-dom';

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
    <>
      <AuthNavbar />
      <main className={styles.main}>
        <div className={styles.form}>
          <div className={styles.formTitle}>
            <h1>Login and start sharing</h1>
            <h4>
              Don't have an account ?
              <Link to="/auth/sign-up" component={ReactRouterLink}>
                Sign up
              </Link>
            </h4>
          </div>
          <AuthFormInputs
            type={AuthFormInputsType.Login}
            onFormSubmit={onLoginSubmit}
            errorMessage={errorMessage}
          />
        </div>
      </main>
    </>
  );
}
