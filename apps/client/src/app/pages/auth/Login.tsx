import './auth.scss';
import { Link } from '@mui/joy';
import { AuthNavbar } from './components/AuthNavbar';
import {
  AuthFormInputs,
  AuthFormInputsType,
} from './components/AuthFormInputs';

export function Login() {
  return (
    <>
      <AuthNavbar />
      <main>
        <div className="form">
          <div className="form-title">
            <h1>Login and start sharing</h1>
            <h4>
              Don't have an account ? <Link href="/auth/sign-up">Sign up</Link>
            </h4>
          </div>
          <AuthFormInputs type={AuthFormInputsType.Login} />
        </div>
      </main>
    </>
  );
}
