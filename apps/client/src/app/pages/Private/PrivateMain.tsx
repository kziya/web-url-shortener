import { styled } from '@mui/material';
import MainLayout from './MainLayout';
// import MainTabs from './components/MainTabs';
import Search from './components/Search';
import HistoryTable from './components/HistoryTable';
import { useShortUrl } from '../../short-url/ShortUrlContext';
import { useEffect } from 'react';
import { ShortUrlStatus } from '@web-url-shortener/domain';
import { useAuth } from '../../auth/AuthContext';

export function PrivateMain() {
  const { getUrlsList } = useShortUrl();
  const { authData } = useAuth();

  useEffect(() => {
    if (!authData?.user) return;
    getUrlsList(1, 'active' as ShortUrlStatus);
  }, []);

  return (
    <MainLayout>
      <Content>
        <Search />
        {/* <MainTabs /> */}
        <HistoryTable />
      </Content>
    </MainLayout>
  );
}

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '60px',
});
