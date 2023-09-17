import { Module } from '@nestjs/common';
import { PodcastService } from './podcast.service';

@Module({
  providers: [PodcastService],
})
export class PodcastModule {}
