import { KyselyService } from '@backend-template/database';
import { CustomRes } from '@backend-template/http';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { DB, DBUserAndCompanyData } from '../utils/types';

@Injectable()
export class AuthorizedUserGuard implements CanActivate {
  constructor(
    private dbClient: KyselyService<DB>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) return false;
    try {
      const user= await this.dbClient
        .selectFrom('users')
        .where('email', '=', request.user.email)
        .selectAll()
        .executeTakeFirstOrThrow(() => CustomRes.unauthorized());

      
      request.userData={
        user,
        company: undefined
      } as  DBUserAndCompanyData

      return true;
    } catch (e) {
      /* empty */
      return false;
    }
  }
}
