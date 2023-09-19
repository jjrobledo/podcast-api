import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { generatePodcastIndexAuthHeaders } from '../utils/podcastIndexAuth';

@Injectable()
export class PodcastIndexService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  fetchPodcastByFeedUrl(feedUrl: string): Observable<any> {
    const apiKey = this.configService.get<string>('PODCAST_INDEX_API_KEY');
    const apiSecret = this.configService.get<string>(
      'PODCAST_INDEX_API_SECRET',
    );
    const headers = generatePodcastIndexAuthHeaders(apiKey, apiSecret);

    return this.httpService
      .get(
        `https://api.podcastindex.org/api/1.0/podcasts/byfeedurl?url=${feedUrl}`,
        { headers },
      )
      .pipe(map((response: AxiosResponse) => response.data));
  }
}
