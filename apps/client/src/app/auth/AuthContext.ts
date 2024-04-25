import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { IAuthData } from './AuthDataInterface';

export interface IAuthContext {
  authData: IAuthData | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setAuthData: Dispatch<SetStateAction<IAuthData>>;
}

export const AuthContext = createContext<IAuthContext>({
  authData: null,
  login: () => null,
  signUp: () => null,
  logout: () => null,
  setAuthData: () => null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};
