import { useAuth } from '../../auth/AuthContext';

export function PrivateMain() {
  const { logout } = useAuth();

  return (
    <>
      <h1>Main</h1>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
}
