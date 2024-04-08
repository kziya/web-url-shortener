import { Button, TextField } from '@mui/material';
import { Link } from '@mui/joy';

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

export function AuthFormInputs({ type }: { type: AuthFormInputsType }) {
  return (
    <div className="form-inputs">
      <div className="text-inputs">
        <TextField
          id="email-input"
          label="Email"
          variant="outlined"
          type="email"
        />
        <br />
        {type !== AuthFormInputsType.ForgetPassword && (
          <TextField
            id="password-input"
            label="Password"
            variant="outlined"
            type="password"
          />
        )}
      </div>
      {type === AuthFormInputsType.Login && (
        <div className="forget-password">
          <Link href="/auth/forget-password">Forget your password ?</Link>
        </div>
      )}
      <div className="submit-button">
        <Button variant="contained">{submitButtonTextMapper[type]}</Button>
      </div>
    </div>
  );
}
