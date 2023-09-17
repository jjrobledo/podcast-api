import { Injectable } from '@nestjs/common';
import { CreatePodcastDto, EditPodcastDto } from './dto';

@Injectable()
export class PodcastService {
  createPodcast(userId: number, dto: CreatePodcastDto) {}

  getPodcasts(userId: number) {}

  getPodcastById(userId: number, podcastId: number) {}

  editPodcastById(userId: number, podcastId: number, dto: EditPodcastDto) {}

  deletePodcastById(userId: number, podcastId: number) {}
}
g;
