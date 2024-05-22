import { styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import NavbarUserMenu from './NavbarUserMenu';
import NavbarNotificationsMenu from './NavbarNotificationsMenu';

const MainNavigation = () => {
  return (
    <Wrapper>
      <Link to={'/'}>
        <Logo>QuickLink</Logo>
      </Link>
      <Actions>
        <NavbarUserMenu />
        <NavbarNotificationsMenu notificationsAmount={2} />
      </Actions>
    </Wrapper>
  );
};

const Wrapper = styled('nav')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',


  '& a': {
    textDecoration: 'none',
    marginRight: '250px',
    marginTop: '20px',
  },
});

const Logo = styled('div')({
  fontSize: '40px',
  fontWeight: '800',
  background: '-webkit-linear-gradient(left, #eb568e, #144ee3)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  flexShrink: 0,
  marginLeft: '70px'
});

const Actions = styled('div')({
  display: 'flex',
  alignItems: 'center',

  marginLeft: '400px',
});

export default MainNavigation;
