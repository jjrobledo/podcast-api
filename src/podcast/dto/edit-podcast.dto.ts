import { IsOptional, IsUrl } from 'class-validator';

export class EditPodcastDto {
  @IsUrl()
  @IsOptional()
  rssFeedUrl?: string;
}
