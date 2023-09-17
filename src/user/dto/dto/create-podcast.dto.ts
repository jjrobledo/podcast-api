import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreatePodcastDto {
  @IsUrl()
  @IsNotEmpty()
  rssFeedUrl: string;
}
