import { CustomRes, ZodValidationPipe } from '@backend-template/http';
import {
  Authenticated,
  AuthenticatedGuard,
} from '@backend-template/rest-server';
import { UserData } from '@backend-template/types';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { UseRole } from '../../libraries/authorized-user.decorator';
import {
  AdminData,
  AdminSchema,
} from '../../utils/schema/user.schema';
import { CompanyRole } from '../../utils/types';
import { TeamService } from './team.service';

@Controller('teams')
@UseRole(CompanyRole.ADMIN, CompanyRole.TEAM_LEADER)
export class CompanyController {
  constructor(private readonly teamService: TeamService) {}
  @Get()
  getAll(){
    return CustomRes.success(this.teamService.getAll())
  }

  getOne(){}
  createOne(){}
  updateOne(){}
  deleteOne(){}
  addTeamMember(){}
  removeTeamMember(){}
  // @Post('create-admin')
  // async createAdmin(
  //   @Authenticated() user: UserData,
  //   @Body(new ZodValidationPipe(AdminSchema)) adminDto: AdminData
  // ) {
  //   return CustomRes.success(this.userService.createAdmin(user,adminDto));
  // }
  // @Post('create-team-leader')
  // async createTeamLeader(
  //   @Authenticated() user: UserData,
  //   @Body() createUserDto: { userType: string }
  // ) {
  //   //create the user
  //   //create the company
  //   // and the user and company to companyMember table
  //   console.log('user, ', user);
  //   console.log('createUserDto, ', createUserDto);
  //   return CustomRes.success(user);
  // }
  // @Post('create-team-member')
  // async createTeamMember(
  //   @Authenticated() user: UserData,
  //   @Body() createUserDto: { userType: string }
  // ) {
  //   console.log('user, ', user);
  //   console.log('createUserDto, ', createUserDto);
  //   return CustomRes.success(user);
  // }
}
