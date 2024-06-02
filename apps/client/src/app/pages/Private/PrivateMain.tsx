import { styled } from '@mui/material';
import MainLayout from './MainLayout';
// import MainTabs from './components/MainTabs';
import Search from './components/Search';
import HistoryTable from './components/HistoryTable';
import { useShortUrl } from '../../short-url/ShortUrlContext';
import { useEffect } from 'react';

export function PrivateMain() {
  const { getUrlsList, urlsList, urlListLoading } = useShortUrl();

  useEffect(() => {
    getUrlsList(1);
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
