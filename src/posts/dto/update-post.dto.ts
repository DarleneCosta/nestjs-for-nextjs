import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(
  PickType(CreatePostDto, ['title', 'excerpt', 'content', 'coverImageUrl']), //deixa todos os campos opcionais
) {
  @IsOptional()
  @IsBoolean({ message: 'Campo publicado deve ser um booleano' })
  published?: boolean;
}
