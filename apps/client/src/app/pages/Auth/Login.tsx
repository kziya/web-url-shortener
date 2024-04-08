import styles from './auth.module.scss';
import { Link } from '@mui/joy';
import { AuthNavbar } from './components/AuthNavbar';
import {
  AuthFormInputs,
  AuthFormInputsType,
} from './components/AuthFormInputs';

export function Login() {
  const onLoginSubmit = (email: string, password: string) => {
    console.dir({
      email,
      password,
    });
  };

  return (
    <>
      <AuthNavbar />
      <main className={styles.main}>
        <div className={styles.form}>
          <div className={styles.formTitle}>
            <h1>Login and start sharing</h1>
            <h4>
              Don't have an account ? <Link href="/auth/sign-up">Sign up</Link>
            </h4>
          </div>
          <AuthFormInputs
            type={AuthFormInputsType.Login}
            onFormSubmit={onLoginSubmit}
          />
        </div>
      </main>
    </>
  );
}
