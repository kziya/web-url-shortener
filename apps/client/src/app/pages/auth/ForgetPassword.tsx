import './auth.scss';
import { AuthNavbar } from './components/AuthNavbar';
import {
  AuthFormInputs,
  AuthFormInputsType,
} from './components/AuthFormInputs';

export function ForgetPassword() {
  return (
    <>
      <AuthNavbar />
      <main>
        <div className="form">
          <div className="form-title">
            <h1>Reset your password</h1>
            <h4>Enter your email to request a password reset link</h4>
          </div>
          <AuthFormInputs type={AuthFormInputsType.ForgetPassword} />
        </div>
      </main>
    </>
  );
}
