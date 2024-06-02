import { Typography, styled } from '@mui/material';
import React from 'react';
import { NotificationIcon } from '../../../icons';

interface Props {
  notificationsAmount: number;
}

const NavbarNotificationsMenu = ({ notificationsAmount }: Props) => {
  return (
    <Wrapper>
      <NotificationIcon />
      <NotificationsAmount>{notificationsAmount}</NotificationsAmount>
    </Wrapper>
  );
};

const Wrapper = styled('div')({
  borderRadius: '50%',
  width: '58px',
  height: '58px',
  background: '#144EE3',
  border: '1px solid #144EE3',
  boxShadow: '10px 9px 22px 0px #144EE361',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  position: 'relative',
  marginLeft: '20px',
  marginTop: '20px',
});

const NotificationsAmount = styled(Typography)({
  fontSize: '10px',
  fontWeight: 900,
  color: '#fff',
  position: 'absolute',
  top: '12px',
  right: '13px',
});

export default NavbarNotificationsMenu;
