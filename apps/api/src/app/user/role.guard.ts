import { UserData } from '@backend-template/types';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { CompanyRole, User } from '../../utils/types';
import { CompanyService } from '../company/company.service';
import { UserService } from './user.service';
import { Selectable } from 'kysely';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles =
      this.reflector.get<CompanyRole[]>('roles', context.getClass()) ?? [];

    if (!request.userData || !request.body.companyId) return false;
    try {
      const user = request.userData as Selectable<User>;

      const companyMember = await this.companyService.findCompanyMemberByUserIdAndCompanyId(
            user.id,
          request.body.companyId
        );
        if(!companyMember?.memberRole) return false

        if (!roles?.length) return true;

      return roles.includes(companyMember.memberRole)
    } catch (e) {
      /* empty */
      return false;
    }
  }
}
