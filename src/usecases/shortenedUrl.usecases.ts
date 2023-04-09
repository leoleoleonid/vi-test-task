import { ILogger, ILOGGER_TOCKEN } from '../domain/logger/logger.interface';
import { Inject, Injectable } from '@nestjs/common';
import {
  SHORTENED_URL_REPOSITORY_TOKEN,
  ShortenedUrlRepositoryInterface,
} from '../domain/repositories/shortenedUrl.repository.interface';
import {
  I_EXCEPTION_TOKEN,
  IException,
} from '../domain/exceptions/exceptions.interface';
import { ShortenedUrl } from '../domain/model/shortenedUrl';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ShortenedUrlUsecases {
  constructor(
    @Inject(ILOGGER_TOCKEN)
    private readonly logger: ILogger,
    @Inject(I_EXCEPTION_TOKEN)
    private readonly exception: IException,
    @Inject(SHORTENED_URL_REPOSITORY_TOKEN)
    private readonly shortenedUrlRepository: ShortenedUrlRepositoryInterface,
    private configService: ConfigService,
  ) {}

  async getStats(userId: number): Promise<ShortenedUrl[]> {
    return await this.shortenedUrlRepository.findByUserId(userId);
  }

  async create(userId: number, originalUrl: string): Promise<string> {
    const existedShortUrl: ShortenedUrl =
      await this.shortenedUrlRepository.findExisted(userId, originalUrl);
    if (existedShortUrl) {
      existedShortUrl.increaseShortenedCounter();
      existedShortUrl.prefix = ShortenedUrl.generatePrefix();
      await this.shortenedUrlRepository.update(existedShortUrl);
      return this.createShortUrl(existedShortUrl.prefix);
    } else {
      const shortUrl = await this.shortenedUrlRepository.create(
        userId,
        originalUrl,
      );
      return this.createShortUrl(shortUrl.prefix);
    }
  }

  async getOriginalUrl(prefix: string): Promise<string> {
    const shortUrl: ShortenedUrl =
      await this.shortenedUrlRepository.findByPrefix(prefix);
    shortUrl.increaseAccessCounter();
    await this.shortenedUrlRepository.update(shortUrl);
    return shortUrl.originalURL;
  }

  private createShortUrl(prefix: string): string {
    return `http://${
      this.configService.get('HOST') || 'localhost:3000'
    }/redirect/${prefix}`;
  }
}
