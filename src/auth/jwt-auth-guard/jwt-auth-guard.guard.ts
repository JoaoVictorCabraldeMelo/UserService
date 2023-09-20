import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/users/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  
  constructor(private readonly userService: UserService) {
    super();
  }

  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException('User not found');
    }
    const email = user.email;
    const existingUser = this.userService.findByEmail(email);
    if (!existingUser) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
