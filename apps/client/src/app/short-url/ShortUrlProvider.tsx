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
      setUrlsList(
        urlsList.map((item) => ({
          ...item,
          expiresAt: new Date(item.expiresAt),
        }))
      );
    } catch (error) {
      toast.error(
        'Error occured while getting urls list. Try to reload the page!'
      );
      setUrlListLoading(false);
    }
  };

  const createPrivateUrl = async (url: string) => {
    try {
      setNewPrivateLinkLoading(true);
      const newUrl = await ShortUrlService.createPrivateUrl(url);
      setUrlsList((list) => [
        { ...newUrl, expiresAt: new Date(newUrl.expiresAt) },
        ...list,
      ]);
      setNewPrivateLinkLoading(false);
    } catch (error) {
      toast.error('Error occured while creating url. Try again later!');
      setUrlListLoading(false);
    }
  };

  const deleteUrl = async (id: string) => {
    try {
      setUrlListLoading(true);
      await ShortUrlService.deletePrivateUrl(id);
      setUrlsList((list) => list.filter((item) => item._id !== id));
      setUrlListLoading(false);
    } catch (error) {
      toast.error('Error occured while deleting url. Try again later!');
      setUrlListLoading(false);
    }
  };

  const renewPrivateUrl = async (id: string) => {
    try {
      setUrlListLoading(true);
      const newUrl = await ShortUrlService.renewPrivateUrl(id);
      setUrlsList((list) =>
        list.map((item) =>
          item._id === id
            ? { ...newUrl, expiresAt: new Date(newUrl.expiresAt) }
            : item
        )
      );
      setUrlListLoading(false);
    } catch (error) {
      toast.error('Error occured while renewing url. Try again later!');
      setUrlListLoading(false);
    }
  };

  return (
    <ShortUrlContext.Provider
      value={{
        urlsList,
        getUrlsList,
        createPrivateUrl,
        urlListLoading,
        newPrivateUrlLoading,
        deleteUrl,
        renewPrivateUrl,
      }}
    >
      {children}
    </ShortUrlContext.Provider>
  );
};
