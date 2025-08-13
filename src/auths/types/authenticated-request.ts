import { Request } from 'express';
import { Users } from 'src/users/entities/user.entity';

export interface AuthenticatedRequest extends Request {
  user: Users;
}
