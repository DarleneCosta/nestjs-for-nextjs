import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString({ message: 'Senha atual deve ser uma string' })
  @IsNotEmpty({ message: 'Senha atual é obrigatória' })
  readonly currentPassword: string;

  @IsString({ message: 'Nova senha deve ser uma string' })
  @IsNotEmpty({ message: 'Nova senha é obrigatória' })
  @MinLength(6, { message: 'Nova senha deve ter pelo menos 6 caracteres' })
  readonly newPassword: string;
}
