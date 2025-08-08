import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUserById(id: number) {
    return 'User ' + id;
  }
}
