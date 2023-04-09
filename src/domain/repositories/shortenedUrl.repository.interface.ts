import { ShortenedUrl } from '../model/shortenedUrl';

export const SHORTENED_URL_REPOSITORY_TOKEN = 'SHORTENED_URL_REPOSITORY_TOKEN';

export interface ShortenedUrlRepositoryInterface {
  findByUserId(userId: number): Promise<ShortenedUrl[]>;
  findExisted(userId: number, originalUrl: string): Promise<ShortenedUrl>;
  update(shortUrl: ShortenedUrl): Promise<void>;
  create(userId: number, originalUrl: string): Promise<ShortenedUrl>;
  findByPrefix(prefix: string): Promise<ShortenedUrl>;
}
