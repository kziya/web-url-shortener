import React, { ReactNode } from 'react';
import { styled } from '@mui/material';

interface MainLayoutProps {
  children: ReactNode;
}

const LayoutContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: '#CDB0B0',
});

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

export default MainLayout;
