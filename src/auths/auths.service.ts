import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { HashingService } from 'src/common/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const error = new UnauthorizedException('Credenciais inválidas');
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw error;
    }
    const isPasswordValid = await this.hashingService.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw error;
    }
    const payload: JwtPayload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    user.forceLogout = false;
    await this.usersService.save(user);

    return {
      accessToken,
    };
  }
}
