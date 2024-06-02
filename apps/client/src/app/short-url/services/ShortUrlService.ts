import { FullShortUrl, ShortUrlStatus } from '@web-url-shortener/domain';
import ShortUrlHttpService from './ShortUrlHttpService';

class ShortUrlService {
  async getUrlsList(
    page: number,
    status?: ShortUrlStatus
  ): Promise<FullShortUrl[]> {
    const authData = await ShortUrlHttpService.getUrlsList(page, status);

    return authData;
  }

  async createPrivateUrl(url: string): Promise<FullShortUrl> {
    const newUrl = await ShortUrlHttpService.createPrivateUrl(url);

    return newUrl;
  }
}

export default new ShortUrlService();
