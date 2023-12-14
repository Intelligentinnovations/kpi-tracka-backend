import { Module } from '@nestjs/common';

// import { TeamController } from './company.controller';
import { TeamRepo } from '../repo/team.repo';
import { TeamService } from './team.service';

@Module({
  // imports: [],
  // controllers: [TeamController],
  providers: [TeamService ,TeamRepo],
  exports: [TeamService ,TeamRepo],
})
export class TeamModule {}
