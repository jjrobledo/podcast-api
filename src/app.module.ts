import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PodcastModule } from './podcast/podcast.module';

@Module({
  imports: [AuthModule, UserModule, PodcastModule],
})
export class AppModule {}
