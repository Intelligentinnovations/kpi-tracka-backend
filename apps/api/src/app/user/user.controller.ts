import { CustomRes, ZodValidationPipe } from '@backend-template/http';
import {
  Authenticated,
  AuthenticatedGuard,
} from '@backend-template/rest-server';
import { UserData } from '@backend-template/types';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { UseRole } from '../../libraries/authorized-user.decorator';
import { UserDataParam } from '../../tools/user-data.decorator';
import { AcceptInviteData, AcceptInviteSchema, InviteData, InviteSchema } from '../../utils/schema';
import {
  AdminData,
  AdminSchema,
  IndividualData,
  IndividualSchema,
} from '../../utils/schema';
import { CompanyRole, DBUserAndCompanyData, DBUserData } from '../../utils/types';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-admin')
  @UseGuards(AuthenticatedGuard)
  async createAdmin(
    @Authenticated() user: UserData,
    @Body(new ZodValidationPipe(AdminSchema)) dto: AdminData
  ) {
    return CustomRes.success(await this.userService.createAdmin(user,dto));
  }

  @Post('create-admin')
  @UseGuards(AuthenticatedGuard)
  async getUserData(
    @Authenticated() user: UserData,
    @Body(new ZodValidationPipe(AdminSchema)) dto: AdminData
  ) {
    return CustomRes.success(await this.userService.createAdmin(user,dto));
  }

  @Post('create-individual')
  @UseGuards(AuthenticatedGuard)
  async createIndividual(
    @Authenticated() user: UserData,
    @Body(new ZodValidationPipe(IndividualSchema)) dto: IndividualData
  ) {
    return CustomRes.success(await this.userService.createIndividual(user,dto));
  }
  @Post('create-team-leader')
  async createTeamLeader(
    @Authenticated() user: UserData,
    @Body() createUserDto: { userType: string }
  ) {
    //create the user
    //create the company
    // and the user and company to companyMember table
    console.log('user, ', user);
    console.log('createUserDto, ', createUserDto);
    return CustomRes.success(user);
  }

  @Post('send-invite')
  @UseRole(CompanyRole.ADMIN)
  async sendTeamMemberInvite(
    @UserDataParam() userData: DBUserAndCompanyData,
    @Body(new ZodValidationPipe(InviteSchema)) inviteDto: InviteData
  ) {
    return CustomRes.success(await this.userService.sendInvite(userData.user, inviteDto));
  }
  @Post('accept-invite/:id')
  async acceptTeamMemberInvite(
    @Param('id', new ZodValidationPipe(AcceptInviteSchema)) id: AcceptInviteData
  ) {
    return CustomRes.success(await this.userService.acceptInvite(id));
  }

}
