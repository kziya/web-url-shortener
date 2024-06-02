import { FullShortUrl, ShortUrlStatus } from '@web-url-shortener/domain';
import { axiosInstance } from '../../config/AxiosConfiguration';
import { AxiosResponse } from 'axios';

class ShortUrlHttpService {
  async getUrlsList(
    page: number,
    status?: ShortUrlStatus
  ): Promise<FullShortUrl[]> {
    const response = await axiosInstance.get<FullShortUrl[]>(
      '/short-url/private/list',
      {
        params: {
          status,
          page,
        },
      }
    );

    return response.data;
  }

  async createPrivateUrl(url: string): Promise<FullShortUrl> {
    const response = await axiosInstance.post<FullShortUrl>(
      '/short-url/private',
      {
        url,
      }
    );

    return response.data;
  }

  async deletePrivateUrl(id: string): Promise<void> {
    await axiosInstance.delete(`/short-url/private/${id}`);
  }

  async renewPrivateUrl(id: string): Promise<FullShortUrl> {
    const response = await axiosInstance.patch<FullShortUrl>(
      `/short-url/private/renew/${id}`
    );

    return response.data;
  }
}

export default new ShortUrlHttpService();
