import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auths/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/auths/types/authenticated-request';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id', CustomParseIntPipe) id: string,
  ) {
    console.log(req.user);
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return new ResponseUserDto(user);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return new ResponseUserDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateUser(
    @Req() req: AuthenticatedRequest,
    @Body() body: UpdateUserDto,
  ) {
    const user = await this.usersService.update(req.user.id, body);
    return new ResponseUserDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/password')
  async updatePassword(
    @Req() req: AuthenticatedRequest,
    @Body() body: UpdatePasswordDto,
  ) {
    await this.usersService.updatePassword(req.user.id, body);
    return { message: 'Senha atualizada com sucesso' };
  }
}
