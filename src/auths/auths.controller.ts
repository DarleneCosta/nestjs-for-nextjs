import { Controller, Post, Body } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { LoginDto } from './dto/login.dto';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authsService.login(loginDto);
  }
}
