import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Posts } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
  ) {}

  async create(dto: CreatePostDto, author: Users): Promise<Posts> {
    const post = this.postRepository.save({
      title: dto.title,
      excerpt: dto.excerpt,
      content: dto.content,
      published: false,
      author: author,
      slug: dto.title.toLowerCase().replace(/ /g, '-'),
    });
    return post;
  }
}
