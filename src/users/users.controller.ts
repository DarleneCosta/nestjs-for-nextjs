import { Controller, Get, Param } from '@nestjs/common';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe';

@Controller('users')
export class UsersController {
  @Get(':id')
  getUserById(@Param('id', CustomParseIntPipe) id: number) {
    return `teste ${typeof id} ${id}`;
  }
}
