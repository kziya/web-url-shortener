import { FullShortUrl, ShortUrlStatus } from '@web-url-shortener/domain';
import React, { useState } from 'react';
import { ShortUrlContext } from './ShortUrlContext';
import ShortUrlService from './services/ShortUrlService';
import { toast } from 'react-toastify';
import { useAuth } from '../auth/AuthContext';

export const ShortUrlProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { authData } = useAuth();

  const [urlsList, setUrlsList] = useState<FullShortUrl[]>(
    authData?.user ? [] : mockUrls
  );
  const [urlListLoading, setUrlListLoading] = useState<boolean>(false);
  const [newPrivateUrlLoading, setNewPrivateLinkLoading] = useState(false);
  const [hasMoreUrls, setHasMoreUrls] = useState<boolean>(true);
  const [newUrlsLoading, setNewUrlsLoading] = useState<boolean>(false);

  const getUrlsList = async (idLast: string, status?: ShortUrlStatus) => {
    try {
      if (urlsList.length) {
        setNewUrlsLoading(true);
      } else {
        setUrlListLoading(true);
      }
      const urlsListResponse = await ShortUrlService.getUrlsList(
        idLast,
        status
      );
      if (!urlsListResponse.length) {
        setHasMoreUrls(false);
      }
      setUrlListLoading(false);
      setNewUrlsLoading(false);
      const newList = urlsListResponse.map((item) => ({
        ...item,
        expiresAt: new Date(item.expiresAt),
      }));

      setUrlsList((list) => [...list, ...newList]);
    } catch (error) {
      toast.error(
        'Error occured while getting urls list. Try to reload the page!'
      );
      setUrlListLoading(false);
      setNewUrlsLoading(false);
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
      setNewPrivateLinkLoading(false);
    }
  };

  const createPublicUrl = async (url: string) => {
    try {
      setNewPrivateLinkLoading(true);
      const newUrl = await ShortUrlService.createPublicUrl(url);
      setUrlsList((list) => [
        { ...newUrl, expiresAt: new Date(newUrl.expiresAt) },
        ...list,
      ]);
      setNewPrivateLinkLoading(false);
    } catch (error) {
      toast.error('Error occured while creating url. Try again later!');
      setNewPrivateLinkLoading(false);
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
      toast.success('The url was successfully updated');
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
        createPublicUrl,
        hasMoreUrls,
        newUrlsLoading,
      }}
    >
      {children}
    </ShortUrlContext.Provider>
  );
};

const mockUrls: FullShortUrl[] = [
  {
    idUser: '233fjf' as any,
    uuid: 'wnhsvXan5uwsJwVSnFS4AA',
    url: 'https://test1',
    clickCount: 0,
    status: 'active' as any,
    expiresAt: new Date('2024-07-02T23:07:19.711Z'),
    _id: '665cfb27da91ea1b03d805fa',
    shortUrl: 'http://short1.com',
  },
  {
    idUser: '123abc' as any,
    uuid: 'xyz789',
    url: 'https://example.com',
    clickCount: 10,
    status: 'active' as any,
    expiresAt: new Date('2025-01-01T00:00:00.000Z'),
    _id: '987def',
    shortUrl: 'http://short2.com',
  },
  {
    idUser: 'user456' as any,
    uuid: 'def123',
    url: 'https://anotherexample.com',
    clickCount: 5,
    status: 'active' as any,
    expiresAt: new Date('2024-12-31T23:59:59.999Z'),
    _id: '456ghi',
    shortUrl: 'http://short3.com',
  },
  {
    idUser: '789xyz' as any,
    uuid: 'ghi456',
    url: 'https://yetanotherexample.com',
    clickCount: 20,
    status: 'active' as any,
    expiresAt: new Date('2025-06-30T23:59:59.999Z'),
    _id: '',
    shortUrl: 'http://short4.com',
  },
];
