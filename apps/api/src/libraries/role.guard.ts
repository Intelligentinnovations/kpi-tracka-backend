import { KyselyService } from '@backend-template/database';
import { CustomRes } from '@backend-template/http';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CompanyRole, DB, DBUserAndCompanyData } from '../utils/types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private dbClient: KyselyService<DB>,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles =
      this.reflector.get<CompanyRole[]>('roles', context.getClass()) ?? [];

      const userData = request.userData as DBUserAndCompanyData;

    if (!userData.user || !request.body.companyId) return false;
    try {

      const companyMember = await this.dbClient
      .selectFrom('company_members')
      // .leftJoin('companies as c','c.id','cm.companyId')
      // .leftJoin('users as u','u.id','cm.userId')
      .where('userId', '=', userData.user.id)
      .where('companyId', '=', request.body.companyId)
      // .select(['cm.id','cm.userId','cm.companyId','c.name','cm.memberRole'])
      .selectAll()
      .executeTakeFirstOrThrow(() => CustomRes.unauthorized())

      request.userData.company = companyMember

        if(!companyMember?.memberRole) return false

        if (!roles?.length) return true;

      return roles.includes(companyMember.memberRole)
    } catch (e) {
      /* empty */
      return false;
    }
  }
}
