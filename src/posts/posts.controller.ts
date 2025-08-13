import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostResponseDto } from './dto/response-post.dto';
import { JwtAuthGuard } from 'src/auths/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import type { AuthenticatedRequest } from 'src/auths/types/authenticated-request';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const post = await this.postsService.create(createPostDto, req.user);
    return new PostResponseDto(post);
  }
}
