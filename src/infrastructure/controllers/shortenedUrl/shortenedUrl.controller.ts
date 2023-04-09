import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  UseGuards,
  Res,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOkResponse } from '@nestjs/swagger';
import { ShortenedUrlUsecases } from '../../../usecases/shortenedUrl.usecases';
import { AuthGuard } from '../../common/guards/AuthGuard';
import { ShortUrlPresenter } from './presenters/shortUrlPresenter';
import { createShortUrlDto } from './dtos/createShortUrl.dto';
import { ShortenedUrl } from '../../../domain/model/shortenedUrl';
import { UrlStatsPresenter } from './presenters/urlStats.presentor';

@Controller()
export class ShortenedUrlController {
  constructor(private readonly shortenedUrlUsecases: ShortenedUrlUsecases) {}

  @Get('/sh/stats')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: UrlStatsPresenter, isArray: true })
  async getStats(@Headers('user-id') userId: number): Promise<ShortenedUrl[]> {
    return this.shortenedUrlUsecases.getStats(userId);
  }

  @Post('/sh/create')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: ShortUrlPresenter, isArray: false })
  async create(
    @Headers('user-id') userId: number,
    @Body() body: createShortUrlDto,
  ): Promise<ShortUrlPresenter> {
    const shortUrl = await this.shortenedUrlUsecases.create(userId, body.url);
    return {
      shortUrl,
    };
  }

  @Get('/redirect/:prefix')
  async redirectToOriginalUrl(
    @Res() res: Response,
    @Param('prefix') prefix: string,
  ): Promise<void> {
    const originalUrl = await this.shortenedUrlUsecases.getOriginalUrl(prefix);
    res.redirect(originalUrl);
  }
}
