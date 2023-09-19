import { Injectable } from '@nestjs/common';
import { CreatePodcastDto, EditPodcastDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PodcastService {
  constructor(private prisma: PrismaService) {}
  async createPodcast(userId: number, dto: CreatePodcastDto) {
    let podcast = await this.prisma.podcast.findUnique({
      where: { rssFeedUrl: dto.rssFeedUrl },
    });

    // If the podcast doesn't exist, create it
    if (!podcast) {
      podcast = await this.prisma.podcast.create({
        data: {
          rssFeedUrl: dto.rssFeedUrl,
        },
      });
    }
    // Create a subscription for the user to the podcast
    const subscription = await this.prisma.subscription.create({
      data: {
        userId: userId,
        podcastId: podcast.id,
      },
    });

    return { podcast, subscription };
  }

  async getPodcasts(userId: number) {
    const subscriptions = await this.prisma.subscription.findMany({
      where: {
        userId: userId,
      },
      include: {
        podcast: true,
      },
    });
    const podcasts = subscriptions.map((subscription) => subscription.podcast);
    return podcasts;
  }

  getPodcastById(userId: number, podcastId: number) {}

  editPodcastById(userId: number, podcastId: number, dto: EditPodcastDto) {}

  deletePodcastById(userId: number, podcastId: number) {}
}
