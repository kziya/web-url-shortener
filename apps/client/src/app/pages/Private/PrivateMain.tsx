import { styled } from '@mui/material';
import MainLayout from './MainLayout';
// import MainTabs from './components/MainTabs';
import Search from './components/Search';
import HistoryTable from './components/HistoryTable';

export function PrivateMain() {
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

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '60px',

  [theme.breakpoints.down('sm')]: {
    rowGap: '40px',
  },
}));
