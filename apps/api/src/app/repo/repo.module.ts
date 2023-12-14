import { Global, Module } from '@nestjs/common';

import { UserRepo } from './user.repo';
import {CompanyRepo} from "./company.repo";
import {TeamRepo} from "./team.repo";

@Global()
@Module({
  providers: [
    UserRepo,
    TeamRepo,
    CompanyRepo
  ],
  exports: [
    UserRepo,
    TeamRepo,
    CompanyRepo
  ],
})
export class RepoModule {}
