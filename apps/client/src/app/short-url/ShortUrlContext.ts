import { FullShortUrl, ShortUrlStatus } from '@web-url-shortener/domain';
import { createContext, useContext } from 'react';

export interface IShortUrlContext {
  urlsList: FullShortUrl[];
  getUrlsList: (page: number, status?: ShortUrlStatus) => Promise<void>;
  createPrivateUrl: (url: string) => Promise<void>;
}

export const ShortUrlContext = createContext<IShortUrlContext>({
  urlsList: null,
  getUrlsList: () => null,
  createPrivateUrl: () => null,
});

export const useShortUrl = () => {
  return useContext(ShortUrlContext);
};
