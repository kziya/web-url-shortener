import { styled } from '@mui/material';
import React from 'react';

interface Props {
  children: React.ReactNode;
  formTitle: string;
}

const AuthLayout = ({ children, formTitle }: Props) => {
  return (
    <OuterWrapper>
      <MailTitle>QuickLink</MailTitle>
      <FormWrapper>
        <FormTitle>{formTitle}</FormTitle>
        {children}
      </FormWrapper>
    </OuterWrapper>
  );
};

const OuterWrapper = styled('main')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  rowGap: '70px',
  backgroundImage: "url('assets/auth-background.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  overflow: 'hidden',
});

const MailTitle = styled('div')({
  fontSize: '52px',
  fontWeight: '800',
  background: '-webkit-linear-gradient(left, #eb568e, #144ee3)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

const FormWrapper = styled('div')(({ theme }) => ({
  padding: '30px 44px 40px',
  background: '#6562F5',
  borderRadius: '32px',
  width: '520px',
  maxWidth: '60%',

  [theme.breakpoints.down('sm')]: {
    maxWidth: '80%',
    padding: '30px 20px 70px',
  },
}));

const FormTitle = styled('h1')(({ theme }) => ({
  color: '#fff',
  fontWeight: 700,
  fontSize: '32px',
  textAlign: 'center',
  paddingBottom: '20px',

  [theme.breakpoints.down('sm')]: {
    fontSize: '28px',
  },
}));

export default AuthLayout;
