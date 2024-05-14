import { styled } from '@mui/material';
import React from 'react';
import MainNavigation from './components/MainNavigation';

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <OuterWrapper>
      <MainNavigation />
      {children}
    </OuterWrapper>
  );
};

const OuterWrapper = styled('main')({
  padding: '36px 31px 45px',
  minHeight: '100%',
  backgroundImage: "url('assets/main-background.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '92px',
});

export default MainLayout;
