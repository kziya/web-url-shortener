import { useAuth } from '../../auth/AuthContext';
import MainLayout from './MainLayout';

export function PrivateMain() {
  const { logout } = useAuth();

  return (
    <MainLayout>
      <h1>Main</h1>
      <button onClick={() => logout()}>Logout</button>
    </MainLayout>
  );
}
