import { FullShortUrl, ShortUrlStatus } from '@web-url-shortener/domain';
import React, { useState } from 'react';
import { ShortUrlContext } from './ShortUrlContext';
import ShortUrlService from './services/ShortUrlService';
import { toast } from 'react-toastify';

export const ShortUrlProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [urlsList, setUrlsList] = useState<FullShortUrl[]>([]);
  const [urlListLoading, setUrlListLoading] = useState<boolean>(false);
  const [newPrivateUrlLoading, setNewPrivateLinkLoading] = useState(false);

  const getUrlsList = async (page: number, status?: ShortUrlStatus) => {
    try {
      setUrlListLoading(true);
      const urlsList = await ShortUrlService.getUrlsList(page, status);
      setUrlListLoading(false);
      setUrlsList(urlsList);
    } catch (error) {
      toast.error(
        'Error occured while getting urls list. Try to reload the page!'
      );
    }
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
      value={{ urlsList, getUrlsList, createPrivateUrl, urlListLoading }}
    >
      {children}
    </ShortUrlContext.Provider>
  );
};
