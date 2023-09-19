import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PodcastController } from './podcast.controller';
import { PodcastService } from './podcast.service';
import { PodcastIndexService } from './podcast-index.service';

@Module({
  imports: [HttpModule],
  controllers: [PodcastController],
  providers: [PodcastService, PodcastIndexService],
})
export class PodcastModule {}
