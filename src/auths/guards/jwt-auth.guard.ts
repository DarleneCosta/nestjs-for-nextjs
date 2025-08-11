import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (info instanceof TokenExpiredError || !user) {
      throw new UnauthorizedException('Você precisa fazer login.');
    }
    return super.handleRequest(err, user, info, context, status);
  }
}
