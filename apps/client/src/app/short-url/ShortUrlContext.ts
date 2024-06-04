import { FullShortUrl, ShortUrlStatus } from '@web-url-shortener/domain';
import { createContext, useContext } from 'react';

export interface IShortUrlContext {
  urlsList: FullShortUrl[];
  urlListLoading: boolean;
  getUrlsList: (idLast: string, status?: ShortUrlStatus) => Promise<void>;
  createPrivateUrl: (url: string) => Promise<void>;
  createPublicUrl: (url: string) => Promise<void>;
  newPrivateUrlLoading: boolean;
  deleteUrl: (id: string) => Promise<void>;
  renewPrivateUrl: (id: string) => Promise<void>;
  hasMoreUrls: boolean;
}

export const ShortUrlContext = createContext<IShortUrlContext>({
  urlsList: null,
  urlListLoading: false,
  getUrlsList: () => null,
  createPrivateUrl: () => null,
  createPublicUrl: () => null,
  newPrivateUrlLoading: false,
  deleteUrl: () => null,
  renewPrivateUrl: () => null,
  hasMoreUrls: true,
});

export const useShortUrl = () => {
  return useContext(ShortUrlContext);
};
