import styles from '../auth.module.scss';
import { Button, Alert, TextField } from '@mui/material';
import { Link } from '@mui/joy';
import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

export enum AuthFormInputsType {
  Login = 'login',
  SignUp = 'sign-up',
  ForgetPassword = 'forget-password',
}

const submitButtonTextMapper = {
  [AuthFormInputsType.Login]: 'Login',
  [AuthFormInputsType.SignUp]: 'Sign up',
  [AuthFormInputsType.ForgetPassword]: 'Reset',
};

export function AuthFormInputs({
  type,
  onFormSubmit,
  errorMessage,
  successMessage,
}: {
  type: AuthFormInputsType;
  onFormSubmit: (email: string, password: string) => void;
  errorMessage?: string;
  successMessage?: string;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (successMessage) {
    return (
      <div className={styles.formInputs}>
        <Alert severity="success">{successMessage}</Alert>
      </div>
    );
  }

  return (
    <div className={styles.formInputs}>
      {errorMessage && (
        <>
          <Alert severity="error">{errorMessage}</Alert>
          <br />{' '}
        </>
      )}
      <div className={styles.textInputs}>
        <TextField
          id="email-input"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        {type !== AuthFormInputsType.ForgetPassword && (
          <TextField
            id="password-input"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
      </div>
      {type === AuthFormInputsType.Login && (
        <div className={styles.forgetPassword}>
          <Link to="/auth/forget-password" component={ReactRouterLink}>
            Forget your password ?
          </Link>
        </div>
      )}
      <div className={styles.submitButton}>
        <Button
          variant="contained"
          onClick={() => {
            onFormSubmit(email, password);
          }}
        >
          {submitButtonTextMapper[type]}
        </Button>
      </div>
    </div>
  );
}
