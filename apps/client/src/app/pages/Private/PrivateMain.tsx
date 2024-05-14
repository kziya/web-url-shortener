import { useAuth } from '../../auth/AuthContext';
import MainLayout from './MainLayout';
import MainTabs from './components/MainTabs';
import Search from './components/Search';

export function PrivateMain() {
  const { logout } = useAuth();

  return (
    <MainLayout>
      <Search />
      <MainTabs />
      {/* <h1>Main</h1>
      <button onClick={() => logout()}>Logout</button> */}
    </MainLayout>
  );
}
