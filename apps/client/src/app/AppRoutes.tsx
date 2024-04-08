import { Route, Routes } from 'react-router-dom';
import { NotAuthGuard } from './auth/guards/NotAuthGuard';
import { AuthGuard } from './auth/guards/AuthGuard';
import { Login } from './pages/auth/Login';
import { SignUp } from './pages/auth/SignUp';
import { ForgetPassword } from './pages/auth/ForgetPassword';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/auth/login"
        element={
          <NotAuthGuard>
            <Login />
          </NotAuthGuard>
        }
      />

      <Route
        path="/auth/sign-up"
        element={
          <NotAuthGuard>
            <SignUp />
          </NotAuthGuard>
        }
      />

      <Route
        path="/auth/forget-password"
        element={
          <NotAuthGuard>
            <ForgetPassword />
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
