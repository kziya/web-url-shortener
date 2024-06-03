import {
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Typography,
  styled,
} from '@mui/material';
import React, { useState } from 'react';
import { MenuIcon } from '../../../icons';
import { useAuth } from '../../../auth/AuthContext';

const NavbarUserMenu = () => {
  const { logout, authData, sendResetPasswordMail, sendResetEmailLoading } =
    useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogut = () => {
    logout();
    handleClose();
  };

  const handleResetPassword = () => {
    const email = authData.user.email;
    sendResetPasswordMail(email);
  };

  return (
    <div>
      <Wrapper
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </Wrapper>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleResetPassword}>
          <div>Reset password</div>
          {sendResetEmailLoading && <Loader size={20} />}
        </MenuItem>
        <MenuItem onClick={handleLogut}>Log Out</MenuItem>
      </StyledMenu>
    </div>
  );
};

const Wrapper = styled(Button)({
  boxShadow: '0px 4px 10px 0px #0000001A',
  borderRadius: '50%',
  background: '#181E29',
  border: '1px solid #353C4A',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  columnGap: '10px',
  cursor: 'pointer',
  width: '60px',
  height: '60px',

  '&:hover': {
    background: '#181E29',
  },
});

const StyledMenu = styled(Menu)({
  '& .MuiPaper-root': {
    background: '#1976d2',
    color: '#ffffff',
  },

  '& .MuiButtonBase-root': {
    columnGap: '10px',
  },
});

const Loader = styled(CircularProgress)({
  color: '#fff',
});

export default NavbarUserMenu;
