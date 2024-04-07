import { Button, TextField } from '@mui/material';
import { Link } from '@mui/joy';

export function AuthFormInputs({ type }: { type: string }) {
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
        <TextField
          id="password-input"
          label="Password"
          variant="outlined"
          type="password"
        />
      </div>
      {type === 'login' && (
        <div className="forget-password">
          <Link href="/auth/forget-password">Forget your password ?</Link>
        </div>
      )}
      <div className="submit-button">
        <Button variant="contained">
          {type === 'login' ? 'Login' : 'Sign up'}
        </Button>
      </div>
    </div>
  );
}
