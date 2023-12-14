import { Module } from '@nestjs/common';

// import { UserController } from './company.controller';
import { CompanyRepo } from '../repo/company.repo';
import { CompanyService } from './company.service';

@Module({
  // imports: [],
  // controllers: [UserController],
  providers: [CompanyService ,CompanyRepo],
  exports: [CompanyService ,CompanyRepo],
})
export class CompanyModule {}
