import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortenedUrlEntity } from '../entities/shortenedUrl.entity';
import { UserEntity } from '../entities/user.entity';
import { ShortenedUrlRepositoryInterface } from '../../domain/repositories/shortenedUrl.repository.interface';
import { ShortenedUrl } from '../../domain/model/shortenedUrl';

@Injectable()
export class ShortenedUrlRepository implements ShortenedUrlRepositoryInterface {
  constructor(
    @InjectRepository(ShortenedUrlEntity)
    private readonly shortenedUrlEntityRepository: Repository<ShortenedUrlEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async findByUserId(userId: number): Promise<ShortenedUrl[]> {
    const stats: ShortenedUrlEntity[] =
      await this.shortenedUrlEntityRepository.find({
        where: { user: { id: userId } },
      });

    return stats.map((st) => this.toShortenedUrl(st));
  }

  async findExisted(
    userId: number,
    originalUrl: string,
  ): Promise<ShortenedUrl> {
    const shortUrlEntity = await this.shortenedUrlEntityRepository.findOneBy({
      user: { id: userId },
      originalUrl,
    });

    return shortUrlEntity ? this.toShortenedUrl(shortUrlEntity) : null;
  }

  async update(shortUrl: ShortenedUrl): Promise<void> {
    await this.shortenedUrlEntityRepository.update(
      {
        id: shortUrl.id,
      },
      {
        prefix: shortUrl.prefix,
        accessCounter: shortUrl.accessCounter,
        shortenedCounter: shortUrl.shortenedCounter,
      },
    );
  }

  async create(userId: number, originalUrl: string): Promise<ShortenedUrl> {
    const user = await this.userEntityRepository.findOneBy({ id: userId });
    const shortUrlEntity = new ShortenedUrlEntity();
    shortUrlEntity.accessCounter = 0;
    shortUrlEntity.shortenedCounter = 1;
    shortUrlEntity.originalUrl = originalUrl;
    shortUrlEntity.user = user;
    shortUrlEntity.prefix = ShortenedUrl.generatePrefix();
    await this.shortenedUrlEntityRepository.insert(shortUrlEntity);
    return await this.findByPrefix(shortUrlEntity.prefix);
  }

  async findByPrefix(prefix: string): Promise<ShortenedUrl> {
    const shortUrlEntity = await this.shortenedUrlEntityRepository.findOneBy({
      prefix,
    });

    return this.toShortenedUrl(shortUrlEntity);
  }

  private toShortenedUrl(shortUrlEntity: ShortenedUrlEntity): ShortenedUrl {
    const shortenedUrl: ShortenedUrl = new ShortenedUrl();
    shortenedUrl.shortenedCounter = shortUrlEntity.shortenedCounter;
    shortenedUrl.accessCounter = shortUrlEntity.accessCounter;
    shortenedUrl.id = shortUrlEntity.id;
    shortenedUrl.prefix = shortUrlEntity.prefix;
    shortenedUrl.originalURL = shortUrlEntity.originalUrl;
    return shortenedUrl;
  }
}
