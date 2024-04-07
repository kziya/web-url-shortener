import { Route, Routes } from 'react-router-dom';
import { NotAuthGuard } from './auth/guards/NotAuthGuard';
import { AuthGuard } from './auth/guards/AuthGuard';
import { Login } from './pages/auth/Login';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <NotAuthGuard>
            <Login />
          </NotAuthGuard>
        }
      />

      <Route
        path="/"
        element={
          <AuthGuard>
            <h1>Main</h1>
          </AuthGuard>
        }
      />
    </Routes>
  );
}
