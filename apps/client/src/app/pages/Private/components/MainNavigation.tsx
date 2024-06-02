import { Button, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import NavbarUserMenu from './NavbarUserMenu';
import NavbarNotificationsMenu from './NavbarNotificationsMenu';
import { useAuth } from '../../../auth/AuthContext';

const MainNavigation = () => {
  const { authData } = useAuth();

  return (
    <Wrapper>
      <Link to={'/'}>
        <Logo>QuickLink</Logo>
      </Link>
      <Actions>
        {authData.user ? (
          <>
            <NavbarNotificationsMenu notificationsAmount={2} />
            <NavbarUserMenu />
          </>
        ) : (
          <Link to={'/auth/login'}>
            <LoginButton>Log in</LoginButton>
          </Link>
        )}
      </Actions>
    </Wrapper>
  );
};

const Wrapper = styled('nav')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '& a': {
    textDecoration: 'none',
  },
});

const Logo = styled('div')({
  fontSize: '40px',
  fontWeight: '800',
  background: '-webkit-linear-gradient(left, #eb568e, #144ee3)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

const Actions = styled('div')({
  display: 'flex',
  alignItems: 'center',
  columnGap: '20px',
});

const LoginButton = styled(Button)({
  minWidth: '180px',
  borderRadius: '48px',
  fontWeight: 600,
  fontSize: '16px',
  zIndex: 1,
  height: '100%',
  textTransform: 'none',
  background: '#1976d2',
  color: '#fff',
  border: '4px solid #353C4A',
  boxShadow: ' 0px 4px 10px 0px #0000001A',

  '&:hover': {
    background: '#1976d2',
  },
});

export default MainNavigation;
