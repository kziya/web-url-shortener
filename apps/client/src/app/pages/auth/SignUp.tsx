import './auth.scss';
import { Link } from '@mui/joy';
import { AuthNavbar } from './components/AuthNavbar';
import { AuthFormInputs } from './components/AuthFormInputs';

export function SignUp() {
  return (
    <>
      <AuthNavbar />
      <main>
        <div className="form">
          <div className="form-title">
            <h1>Create your account</h1>
            <h4>
              Already have an account ? <Link href="/auth/login">Login</Link>
            </h4>
          </div>
          <AuthFormInputs type="sign-up" />
        </div>
      </main>
    </>
  );
}
