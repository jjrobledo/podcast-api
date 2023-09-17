import {
  Controller,
  Post,
  Patch,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('podcasts')
export class BookmarkController {
  @Post()
  createPodcast() {}

  @Get()
  getPodcast() {}

  @Get()
  getPodcastById() {}

  @Patch()
  editPodcastById() {}

  @Delete()
  deletePodcastById() {}
}
