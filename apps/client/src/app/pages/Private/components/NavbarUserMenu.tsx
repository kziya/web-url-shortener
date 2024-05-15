import { Typography, styled } from '@mui/material';
import React from 'react';
import { MenuIcon } from '../../../icons';

const NavbarUserMenu = () => {
  return (
    <Wrapper>
      <Left>
        <WelcomeText>Welcome</WelcomeText>
        <UserName>Alex</UserName>
      </Left>
      <MenuIcon />
    </Wrapper>
  );
};

const Wrapper = styled('div')({
  boxShadow: '0px 4px 10px 0px #0000001A',
  borderRadius: '48px',
  background: '#181E29',
  border: '1px solid #353C4A',
  padding: '13px 59px',
  display: 'flex',
  alignItems: 'center',
  columnGap: '10px',
  cursor: 'pointer',
});

const Left = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const WelcomeText = styled(Typography)({
  fontWeight: 300,
  fontSize: '10px',
  color: '#fff',
});

const UserName = styled(Typography)({
  fontWeight: 600,
  fontSize: '16px',
  color: '#fff',
});

export default NavbarUserMenu;
