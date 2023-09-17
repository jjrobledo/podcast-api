import { Injectable } from '@nestjs/common';
import { CreatePodcastDto, EditPodcastDto } from './dto';

@Injectable()
export class PodcastService {
  createPodcast(userId: number, dto: CreatePodcastDto) {}

  getPodcast(userId: number) {}

  getPodcastById(userId: number, podcastId: number) {}

  editPodcastById(userId: number, dto: EditPodcastDto) {}

  deletePodcastById(userId: number, podcastId: number) {}
}
g;
