import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller('video-proxy')
export class AppController {
  constructor(private readonly videoProxyService: AppService) {}

  @Get('get')
  async getVideo(@Query('code') code: string, @Res() res: Response) {
    try {
      const data = await this.videoProxyService.getVideo(code);
      res.set('Content-Type', 'video/mp2t');
      res.send(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      res.status(404).send('Not Found 123');
    }
  }

  @Post('convert')
  async convertM3U8(
    @Body('m3u8_link') m3u8Link: string,
    @Body('header_custom') headers: any,
  ) {
    const proxyLinks = await this.videoProxyService.convertM3U8(
      m3u8Link,
      headers,
    );
    return proxyLinks.join('\n');
  }
}
