import styles from './auth.module.scss';
import { AuthNavbar } from './components/AuthNavbar';
import {
  AuthFormInputs,
  AuthFormInputsType,
} from './components/AuthFormInputs';

export function ForgetPassword() {
  const onForgetPasswordSubmit = (email: string) => {
    console.log(email);
  };

  return (
    <>
      <AuthNavbar />
      <main className={styles.main}>
        <div className={styles.form}>
          <div className={styles.formTitle}>
            <h1>Reset your password</h1>
            <h4>Enter your email to request a password reset link</h4>
          </div>
          <AuthFormInputs
            type={AuthFormInputsType.ForgetPassword}
            onFormSubmit={onForgetPasswordSubmit}
          />
        </div>
      </main>
    </>
  );
}
