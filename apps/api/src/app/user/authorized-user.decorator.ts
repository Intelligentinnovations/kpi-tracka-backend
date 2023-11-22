import { AuthenticatedGuard } from '@backend-template/rest-server';
import {
  applyDecorators,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';

import { CompanyRole } from '../../utils/types';
import { AuthorizedUserGuard } from './authorized-user.guard';
import { RoleGuard } from './role.guard';

export function UseRole(...roles: CompanyRole[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthenticatedGuard, AuthorizedUserGuard, RoleGuard)
  );
}