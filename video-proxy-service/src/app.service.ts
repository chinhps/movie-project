import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { decrypt, encrypt } from './lib/crypto';

@Injectable()
export class AppService {
  private readonly KEY = process.env.KEY_CRYPTO;

  constructor(private readonly httpService: HttpService) {}

  async getVideo(code: string): Promise<string> {
    const data = decrypt(code, this.KEY);
    if (!data) {
      throw new Error('Data not found');
    }

    const response = await lastValueFrom(
      this.httpService.get(data, {
        headers: {
          Origin: 'https://vuighe3.com/',
          Referer: 'https://vuighe3.com/',
        },
      }),
    );

    return response.data;
  }

  async convertM3U8(m3u8Link: string, headers: any): Promise<string[]> {
    const m3u8Array = m3u8Link.split('/');
    m3u8Array.pop(); // remove "video.m3u8"

    const response = await lastValueFrom(
      this.httpService.get(m3u8Link, { headers }),
    );
    const lines = response.data.split('\n');
    const proxyLinks = lines.map((line) => {
      if (line.endsWith('.ts')) {
        const videoFile = line.trim();
        const code = encrypt(`${m3u8Array.join('/')}/${videoFile}`, this.KEY);
        return `http://localhost:8000/api/video-proxy/get?code=${code}`;
      }
      return line;
    });

    return proxyLinks;
  }
}
