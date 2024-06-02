import { Route, Routes } from 'react-router-dom';
import { NotAuthGuard } from './auth/guards/NotAuthGuard';
import { AuthGuard } from './auth/guards/AuthGuard';
import { Login } from './pages/Auth/Login';
import { SignUp } from './pages/Auth/SignUp';
import { ForgetPassword } from './pages/Auth/ForgetPassword';
import { NotFound } from './pages/NotFound/NotFound';
import { PrivateMain } from './pages/Private/PrivateMain';
import { Verify } from './pages/Auth/Verify';
import { VerifyByUid } from './pages/Auth/VerifyByUid';
import { ResetPasswordByUid } from './pages/Auth/ResetPasswordByUid';
import ConfigureAccount from './pages/Setting/App';

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
        path="/auth/reset-password/:uid"
        element={<ResetPasswordByUid />}
      />

      <Route path="/" element={<PrivateMain />} />

      <Route
        path="/settings"
        element={
          <AuthGuard>
            <ConfigureAccount />
          </AuthGuard>
        }
      />

      <Route path="/auth/verify/:uid" element={<VerifyByUid />} />

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
