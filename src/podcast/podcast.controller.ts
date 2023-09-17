import {
  Controller,
  Post,
  Patch,
  Delete,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { PodcastService } from './podcast.service';
import { GetUser } from '../auth/decorator';
import { CreatePodcastDto } from '../user/dto/dto';
import { EditPodcastDto } from './dto';

@UseGuards(JwtGuard)
@Controller('podcasts')
export class BookmarkController {
  constructor(private podcastService: PodcastService) {}
  @Post()
  createPodcast(@GetUser() userId: number, @Body() dto: CreatePodcastDto) {
    return this.podcastService.createPodcast(userId, dto);
  }

  @Get()
  getPodcasts(@GetUser() userId: number) {
    return this.podcastService.getPodcasts(userId);
  }

  @Get(':id')
  getPodcastById(
    @GetUser() userId: number,
    @Param('id', ParseIntPipe) podcastId: number,
  ) {
    return this.podcastService.getPodcastById(userId, podcastId);
  }

  @Patch(':id')
  editPodcastById(
    @GetUser() userId: number,
    @Param('id', ParseIntPipe) podcastId: number,
    @Body() dto: EditPodcastDto,
  ) {
    return this.podcastService.editPodcastById(userId, podcastId, dto);
  }

  @Delete(':id')
  deletePodcastById(
    @GetUser() userId: number,
    @Param('id', ParseIntPipe) podcastId: number,
  ) {
    return this.podcastService.deletePodcastById(userId, podcastId);
  }
}
