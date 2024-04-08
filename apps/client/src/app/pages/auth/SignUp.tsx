import './auth.scss';
import { Link } from '@mui/joy';
import { AuthNavbar } from './components/AuthNavbar';
import {
  AuthFormInputs,
  AuthFormInputsType,
} from './components/AuthFormInputs';

export function SignUp() {
  const onSignUpSubmit = (email: string, password: string) => {
    console.dir({ email, password });
  };
  console.log('test');

  return (
    <>
      <AuthNavbar />
      <main>
        <form className="form">
          <div className="form-title">
            <h1>Create your account</h1>
            <h4>
              Already have an account ? <Link href="/auth/login">Login</Link>
            </h4>
          </div>
          <AuthFormInputs
            type={AuthFormInputsType.SignUp}
            onFormSubmit={onSignUpSubmit}
          />
        </form>
      </main>
    </>
  );
}
