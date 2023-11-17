import { CognitoService } from '@backend-template/http';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private cognitoService: CognitoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      console.log('request.headers.authorization.split(', request.headers.authorization.split(' '))
      request.token = request.headers.authorization.split(' ')[1];
    } catch (e) {
      /* empty */
    }

    try {
      if (request.token) {
        request.user = await this.cognitoService.getUser(request.token);
      console.log('request.user', request.user)
    }
    } catch (e) {
      console.log('request.user e', e)
      /* empty */
    }

    return !!request.user;
  }
}
