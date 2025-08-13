import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Título deve ser uma string' })
  @IsNotEmpty({ message: 'Título é obrigatório' })
  @Length(10, 150, { message: 'Título deve ter entre 10 e 150 caracteres' })
  title: string;

  @IsString({ message: 'Resumo deve ser uma string' })
  @Length(10, 200, { message: 'Resumo deve ter entre 10 e 200 caracteres' })
  excerpt: string;

  @IsString({ message: 'Conteúdo deve ser uma string' })
  @IsNotEmpty({ message: 'Conteúdo é obrigatório' })
  content: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  coverImageUrl: string;
}
