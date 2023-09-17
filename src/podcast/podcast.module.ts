import { Module } from '@nestjs/common';
import { ControllerService } from './controller/controller.service';
import { PodcastService } from './podcast.service';

@Module({
  providers: [ControllerService, PodcastService]
})
export class PodcastModule {}
