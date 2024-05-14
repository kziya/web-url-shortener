import { styled } from '@mui/material';
import MainLayout from './MainLayout';
import MainTabs from './components/MainTabs';
import Search from './components/Search';

export function PrivateMain() {
  return (
    <MainLayout>
      <Content>
        <Search />
        <MainTabs />
      </Content>
    </MainLayout>
  );
}

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});
