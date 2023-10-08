import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/users/user.service';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const dbUser = await this.userService.findByEmail(user.email);

    if (dbUser && dbUser.isAdmin) {
      return true;
    } else {
      throw new ForbiddenException('User is not admin');
    }
  }
}
