import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Posts } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Users } from 'src/users/entities/user.entity';
import { createSlugFromText } from 'src/common/utils/create-slug-from-text';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
  ) {}

  async findOneOrFail(postData: Partial<Posts>): Promise<Posts> {
    const post = await this.findOne(postData);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    return post;
  }

  async findOne(postData: Partial<Posts>): Promise<Posts | null> {
    const post = await this.postRepository.findOne({
      where: postData,
      relations: ['author'], //senao fazer isto nao traz o autor
    });

    return post;
  }

  async findOneOrFailOwned(
    postData: Partial<Posts>,
    author: Users,
  ): Promise<Posts> {
    const post = await this.findOneOwned(postData, author);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    return post;
  }

  async findOneOwned(
    postData: Partial<Posts>,
    author: Users,
  ): Promise<Posts | null> {
    const post = await this.postRepository.findOne({
      where: { ...postData, author: { id: author.id } },
      relations: ['author'],
    });

    return post;
  }

  async create(dto: CreatePostDto, author: Users): Promise<Posts> {
    const post = this.postRepository.create({
      title: dto.title,
      excerpt: dto.excerpt,
      content: dto.content,
      published: false,
      author: author,
      slug: createSlugFromText(dto.title),
    });

    const createdPost = await this.postRepository
      .save(post)
      .catch((err: unknown) => {
        if (err instanceof Error) {
          this.logger.error('Erro ao criar post', err.stack);
        }
        throw new BadRequestException('Erro ao criar post');
      });
    return createdPost;
  }

  async findAllOwned(author: Users): Promise<Posts[]> {
    const posts = await this.postRepository.find({
      where: { author: { id: author.id } },
      order: { createdAt: 'DESC' },
      relations: ['author'],
    });
    return posts;
  }
}
