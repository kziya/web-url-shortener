import { useAuth } from '../../auth/AuthContext';
import MainLayout from './MainLayout';
import Search from './components/Search';

export function PrivateMain() {
  const { logout } = useAuth();

  return (
    <MainLayout>
      <Search />
      {/* <h1>Main</h1>
      <button onClick={() => logout()}>Logout</button> */}
    </MainLayout>
  );
}
