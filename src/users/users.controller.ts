import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUserById(@Param('id', CustomParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }
}
