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
  background:
    'linear-gradient(270deg, rgba(102,0,0,1) 0%, rgba(1,8,124,1) 80%, rgba(0,7,131,1) 100%)',
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
