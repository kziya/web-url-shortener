import { Route, Routes } from 'react-router-dom';
import { NotAuthGuard } from './auth/guards/NotAuthGuard';
import { AuthGuard } from './auth/guards/AuthGuard';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <NotAuthGuard>
            <h1>Login</h1>
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
