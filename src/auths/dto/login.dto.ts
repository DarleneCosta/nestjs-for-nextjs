import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString({ message: 'Senha inválida' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password: string;
}
