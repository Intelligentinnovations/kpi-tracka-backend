import { CustomRes, ZodValidationPipe } from '@backend-template/http';
import {
  Authenticated,
  AuthenticatedGuard,
} from '@backend-template/rest-server';
import { UserData } from '@backend-template/types';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { InviteData, InviteSchema } from '../../utils/schema';
import {
  AdminData,
  AdminSchema,
} from '../../utils/schema/user.schema';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthenticatedGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-admin')
  async createAdmin(
    @Authenticated() user: UserData,
    @Body(new ZodValidationPipe(AdminSchema)) adminDto: AdminData
  ) {
    return CustomRes.success(await this.userService.createAdmin(user,adminDto));
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
  async sendTeamMemberInvite(
    @Authenticated() user: UserData,
    @Body(new ZodValidationPipe(InviteSchema)) inviteDto: InviteData
  ) {
    console.log('createUserDto, ', inviteDto);
    return CustomRes.success(inviteDto);
  }
  
  @Get('accept-invite')
  async acceptTeamMemberInvite(
    @Authenticated() user: UserData,
    @Body() createUserDto: { userType: string }
  ) {
    return CustomRes.success(user);
  }
  @Post('create-team-member')
  async createTeamMember(
    @Authenticated() user: UserData,
    @Body() createUserDto: { userType: string }
  ) {
    console.log('user, ', user);
    console.log('createUserDto, ', createUserDto);
    return CustomRes.success(user);
  }
}
