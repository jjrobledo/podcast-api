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

@UseGuards(JwtGuard)
@Controller('podcasts')
export class BookmarkController {
  constructor(private podcastService: PodcastService) {}
  @Post()
  createPodcast(@GetUser() userId: number, @Body() dto: CreatePodcastDto) {}

  @Get()
  getPodcast(@GetUser() userId: number) {}

  @Get(':id')
  getPodcastById(
    @GetUser() userId: number,
    @Param('id', ParseIntPipe) podcastId: number,
  ) {}

  @Patch()
  editPodcastById(@GetUser() userId: number) {}

  @Delete()
  deletePodcastById(@GetUser() userId: number) {}
}
