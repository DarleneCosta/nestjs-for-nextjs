import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthsService {
  login(loginDto: LoginDto): any {
    return loginDto;
  }
}
