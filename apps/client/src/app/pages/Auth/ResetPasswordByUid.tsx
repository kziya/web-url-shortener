import { Alert, Button, InputLabel, TextField, styled } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loading } from '../Loading/Loading';
import AuthHttpService from '../../auth/services/AuthHttpService';
import { NotFound } from '../NotFound/NotFound';
import AuthLayout from './AuthLayout';

export function ResetPasswordByUid() {
  const { uid } = useParams();
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [uidError, setUidError] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPassword, setResetPassword] = useState(false);

  useEffect(() => {
    AuthHttpService.validateResetPasswordUid(uid)
      .then(() => setIsLoadingPage(false))
      .catch((e) => {
        setUidError(true);
      });
  }, [uid]);

  if (uidError) {
    return <NotFound />;
  }

  if (isLoadingPage) {
    return <Loading />;
  }

  return (
    <AuthLayout formTitle="Reset your password">
      <Wrapper>
        {resetPassword ? (
          <Alert severity="success">
            Successfully reset password, you will be redirected to the login
            page
          </Alert>
        ) : (
          <Wrapper>
            {error && (
              <>
                <Alert severity="error">{'Something went wrong'}</Alert>
                <br />
              </>
            )}
            <Fields>
              <TextFieldWrapper>
                <StyledLabel>Password</StyledLabel>
                <AuthTextField
                  id="password-input"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </TextFieldWrapper>
              <TextFieldWrapper>
                <StyledLabel>Confirm Password</StyledLabel>
                <AuthTextField
                  id="confirm-password-input"
                  variant="outlined"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </TextFieldWrapper>
            </Fields>

            <div>
              <SubmitButton
                variant="contained"
                onClick={() => {
                  AuthHttpService.resetPassword(uid, password, confirmPassword)
                    .then(() => {
                      setResetPassword(true);
                      setTimeout(() => {
                        window.location.href = '/auth/login';
                      }, 3000);
                    })
                    .catch(() => setError(true));
                }}
              >
                Reset password
              </SubmitButton>
            </div>
          </Wrapper>
        )}
      </Wrapper>
    </AuthLayout>
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

const SubmitButton = styled(Button)({
  width: '100%',
  marginTop: '15px',
  background: '#2B5BD7',
  boxShadow: 'none',
});
