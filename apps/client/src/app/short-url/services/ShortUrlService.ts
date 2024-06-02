import { FullShortUrl, ShortUrlStatus } from '@web-url-shortener/domain';
import ShortUrlHttpService from './ShortUrlHttpService';

class ShortUrlService {
  async getUrlsList(
    page: number,
    status?: ShortUrlStatus
  ): Promise<FullShortUrl[]> {
    const authData = await ShortUrlHttpService.getUrlsList(page, status);

    return authData.reverse();
  }

  async createPrivateUrl(url: string): Promise<FullShortUrl> {
    const newUrl = await ShortUrlHttpService.createPrivateUrl(url);

    return newUrl;
  }

  async deleteUrl(id: string): Promise<void> {
    await ShortUrlHttpService.deleteUrl(id);
  }
}

export default new ShortUrlService();
