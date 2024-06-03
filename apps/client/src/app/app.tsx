import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './auth/AuthProvider';
import { AppRoutes } from './AppRoutes';
import { ShortUrlProvider } from './short-url/ShortUrlProvider';

import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <>
      <AuthProvider>
        <ShortUrlProvider>
          <AppRoutes />
        </ShortUrlProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
