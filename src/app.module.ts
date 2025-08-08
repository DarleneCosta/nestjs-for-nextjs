import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthsModule } from './auths/auths.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [AuthsModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
