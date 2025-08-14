import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Get('me/:id')
  async findOneOwned(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const posts = await this.postsService.findOneOrFailOwned({ id }, req.user);
    return new PostResponseDto(posts);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findAllOwned(@Req() req: AuthenticatedRequest) {
    const posts = await this.postsService.findAllOwned(req.user);
    return posts.map(post => new PostResponseDto(post));
  }
}
