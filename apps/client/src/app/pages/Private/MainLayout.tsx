import { styled } from '@mui/material';
import React from 'react';
import MainNavigation from './components/MainNavigation';

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <OuterWrapper>
      <InnerWrapper>
        <MainNavigation />
        {children}
      </InnerWrapper>
    </OuterWrapper>
  );
};

const OuterWrapper = styled('main')({
  minHeight: '100%',
  backgroundImage: "url('assets/main-background.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  overflow: 'hidden',
});

const InnerWrapper = styled('div')(({ theme }) => ({
  padding: '36px 31px 45px',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '92px',

  [theme.breakpoints.down('sm')]: {
    rowGap: '60px',
    padding: '36px 10px',
  },
}));

export default MainLayout;
