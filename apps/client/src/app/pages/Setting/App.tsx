import { styled } from '@mui/material';
import MainLayout from './MainLayout';
import ProfileSection from './components/ProfileSection';
import AccountSettings from './components/AccountSettings';
import Language from './components/Language';
import MainNavigation from './components/MainNavigation';
import React from "react";
import Country from "./components/Country";
import Date from "./components/Date";
import Buttons from "./components/Buttons";

export function ConfigureAccount() {
  return (
    <MainLayout>
      <Background>
        <MainContainer>
          <Sidebar>
            <MainNavigation />
            <ProfileSection />
            <SidebarLinks>
              <SidebarLink>Profile</SidebarLink>
              <SidebarLink>Password</SidebarLink>
              <SidebarLink>Other settings</SidebarLink>
            </SidebarLinks>
          </Sidebar>
          <MainContent>
            <AccountSettings />
            <Language />
            <Date />
            <Country />
            <Buttons />
          </MainContent>
        </MainContainer>
      </Background>
    </MainLayout>
  );
}

const Background = styled('div')({
  position: 'relative',
  minHeight: '100vh',
  width: '100%',
  backgroundColor: '#CDB0B0',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundImage: "url('assets/main-background.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

  },
});

const MainContainer = styled('div')({
  position: 'absolute',
  width: '1310px',
  height: '651px',
  left: '78px',
  top: '45px',
  background: '#D9D9D9',
  borderRadius: '50px',
  display: 'flex',
  flexDirection: 'row'
});

const Sidebar = styled('div')({
  width: '331px',
  height: '651px',
  background: '#4799EB',
  borderRadius: '50px 0 0 50px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

});

const SidebarLinks = styled('div')({
  marginTop: '50px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  position: 'fixed',
  top: '400px',
});

const SidebarLink = styled('div')({
  fontFamily: 'Adamina',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '20px',
  display: 'flex',
  alignItems: 'center',
  color: '#FFFFFF',
  cursor: 'pointer',
});

const MainContent = styled('div')({
  flex: 1,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export default ConfigureAccount;
