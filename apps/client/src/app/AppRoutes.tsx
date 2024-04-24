import { Route, Routes } from 'react-router-dom';
import { NotAuthGuard } from './auth/guards/NotAuthGuard';
import { AuthGuard } from './auth/guards/AuthGuard';
import { Login } from './pages/Auth/Login';
import { SignUp } from './pages/Auth/SignUp';
import { ForgetPassword } from './pages/Auth/ForgetPassword';
import { NotFound } from './pages/NotFound/NotFound';
import { PrivateMain } from './pages/Private/PrivateMain';
import { Verify } from './pages/Auth/Verify';

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
            <PrivateMain />
          </AuthGuard>
        }
      />

      <Route
        path="/auth/verify"
        element={
          <AuthGuard onlyNotVerified={true}>
            <Verify />
          </AuthGuard>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
