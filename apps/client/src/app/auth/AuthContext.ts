import { createContext, useContext } from 'react';
import { IAuthData } from './AuthDataInterface';

export interface IAuthContext {
  authData: IAuthData | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  authData: null,
  login: () => null,
  logout: () => null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};
