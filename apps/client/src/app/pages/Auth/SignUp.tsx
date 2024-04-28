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
    <>
      <AuthNavbar />
      <main className={styles.main}>
        <form className={styles.form}>
          <div className={styles.formTitle}>
            <h1>Create your account</h1>
            <h4>
              Already have an account ?
              <Link to="/auth/login" component={ReactRouterLink}>
                Login
              </Link>
            </h4>
          </div>
          <AuthFormInputs
            type={AuthFormInputsType.SignUp}
            onFormSubmit={onSignUpSubmit}
            errorMessage={errorMessage}
          />
        </form>
      </main>
    </>
  );
}
