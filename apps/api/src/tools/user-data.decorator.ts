import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { DBUserAndCompanyData } from '../utils/types';

export const UserDataParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext):DBUserAndCompanyData => {
    const request = ctx.switchToHttp().getRequest();
    return request.userData;
  }
);
