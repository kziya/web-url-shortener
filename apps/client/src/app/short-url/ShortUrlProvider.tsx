import { FullShortUrl, ShortUrlStatus } from '@web-url-shortener/domain';
import React, { useState } from 'react';
import { ShortUrlContext } from './ShortUrlContext';
import ShortUrlService from './services/ShortUrlService';
import { toast } from 'react-toastify';

export const ShortUrlProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [urlsList, setUrlsList] = useState<FullShortUrl[]>([]);

  const getUrlsList = async (page: number, status?: ShortUrlStatus) => {
    const urlsList = await ShortUrlService.getUrlsList(page, status);
    setUrlsList(urlsList);
  };

  const createPrivateUrl = async (url: string) => {
    try {
      await ShortUrlService.createPrivateUrl(url);
    } catch (error) {
      toast.error('Error occured while creating url. Try again later!');
    }
  };

  return (
    <ShortUrlContext.Provider
      value={{ urlsList, getUrlsList, createPrivateUrl }}
    >
      {children}
    </ShortUrlContext.Provider>
  );
};
