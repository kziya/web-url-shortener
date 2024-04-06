// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { AuthProvider } from './auth/AuthProvider';
import { AppRoutes } from './AppRoutes';

export function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
