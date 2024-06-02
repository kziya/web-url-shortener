import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { IAuthData } from './AuthDataInterface';

export interface IAuthContext {
  authData: IAuthData | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setAuthData: Dispatch<SetStateAction<IAuthData>>;
  sendResetPasswordMail: (email: string) => Promise<void>;
  sendResetEmailLoading: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  authData: null,
  login: () => null,
  signUp: () => null,
  logout: () => null,
  setAuthData: () => null,
  sendResetPasswordMail: () => null,
  sendResetEmailLoading: false,
});

export const useAuth = () => {
  return useContext(AuthContext);
};
