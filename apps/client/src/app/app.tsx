// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { AuthProvider } from './auth/AuthProvider';
import { Route, Routes } from 'react-router-dom';
import { AuthGuard } from './auth/AuthGuard';
import { NotAuthGuard } from './auth/NotAuthGuard';

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AuthGuard>Hello</AuthGuard>} />
        <Route
          path="/login"
          element={
            <NotAuthGuard>
              <h1>Login</h1>
            </NotAuthGuard>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
