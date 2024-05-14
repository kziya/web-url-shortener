import { Button, Alert, TextField, styled, InputLabel } from '@mui/material';
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
      <div>
        <Alert severity="success">{successMessage}</Alert>
      </div>
    );
  }

  return (
    <Wrapper>
      {errorMessage && (
        <>
          <Alert severity="error">{errorMessage}</Alert>
          <br />{' '}
        </>
      )}
      <Fields>
        <TextFieldWrapper>
          <StyledLabel>Email</StyledLabel>
          <AuthTextField
            id="email-input"
            variant="outlined"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </TextFieldWrapper>
        {type !== AuthFormInputsType.ForgetPassword && (
          <TextFieldWrapper>
            <StyledLabel>Password</StyledLabel>
            <AuthTextField
              id="password-input"
              variant="outlined"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </TextFieldWrapper>
        )}
      </Fields>
      {type === AuthFormInputsType.Login && (
        <BottomLinksWrapper>
          <Link to="/auth/forget-password" component={ReactRouterLink}>
            Forgot your password ?
          </Link>
          <Link to="/auth/sign-up" component={ReactRouterLink}>
            Don’t have an account ? Sign up
          </Link>
        </BottomLinksWrapper>
      )}
      {type === AuthFormInputsType.SignUp && (
        <BottomLinksWrapper>
          <Link to="/auth/login" component={ReactRouterLink}>
            Already have an account ? Login
          </Link>
        </BottomLinksWrapper>
      )}
      <div>
        <SubmitButton
          variant="contained"
          onClick={() => {
            onFormSubmit(email, password);
          }}
        >
          {submitButtonTextMapper[type]}
        </SubmitButton>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const Fields = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '20px',
});

const StyledLabel = styled(InputLabel)({
  color: '#fff',
});

const TextFieldWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '4px',
});

const AuthTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    height: '42px',
  },

  '& input': {
    zIndex: 1,
  },

  '& fieldset': {
    background: '#eee',
    borderRadius: '5px',
  },
});

const BottomLinksWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '5px',
  padding: '15px 0 0',

  '& a': {
    color: '#fff',
  },
});

const SubmitButton = styled(Button)({
  width: '100%',
  marginTop: '15px',
  background: '#2B5BD7',
  boxShadow: 'none',
});
