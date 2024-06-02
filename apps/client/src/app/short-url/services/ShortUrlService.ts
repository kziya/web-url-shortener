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

  async createPublicUrl(url: string): Promise<FullShortUrl> {
    const newUrl = await ShortUrlHttpService.createPublicUrl(url);

    return newUrl;
  }

  async deletePrivateUrl(id: string): Promise<void> {
    await ShortUrlHttpService.deletePrivateUrl(id);
  }

  async renewPrivateUrl(id: string): Promise<FullShortUrl> {
    const newUrl = await ShortUrlHttpService.renewPrivateUrl(id);

    return newUrl;
  }
}

export default new ShortUrlService();
