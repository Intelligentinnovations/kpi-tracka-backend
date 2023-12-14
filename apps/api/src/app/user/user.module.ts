import { Module } from '@nestjs/common';

import { CompanyModule } from '../company/company.module';
import { UserController } from './user.controller';
import { UserRepo } from '../repo/user.repo';
import { UserService } from './user.service';

@Module({
  imports: [CompanyModule],
  controllers: [UserController],
  providers: [UserService,UserRepo],
})
export class UserModule {}
