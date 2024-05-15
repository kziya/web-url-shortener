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

export default MainNavigation;
