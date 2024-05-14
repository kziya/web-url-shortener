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
    </OuterWrapper>
  );
};

const OuterWrapper = styled('main')({
  padding: '36px 31px 45px',
  height: '100%',
  backgroundImage: "url('assets/main-background.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

export default MainLayout;
