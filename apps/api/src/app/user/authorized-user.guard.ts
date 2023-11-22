import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { UserService } from './user.service';

@Injectable()
export class AuthorizedUserGuard implements CanActivate {
  constructor(
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) return false;
    try {
      request.userData = await this.userService
        .findUserByEmail(request.user.email)
        .elseThrow();
        return true
    } catch (e) {
      /* empty */
      return false;
    }
  }
}
