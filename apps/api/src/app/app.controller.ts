import { CustomRes } from '@backend-template/http';
import { Authenticated, AuthenticatedGuard } from '@backend-template/rest-server';
import { UserData } from '@backend-template/types';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
// @UseGuards(AuthenticatedGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  async getData(@Authenticated() user: UserData) {
    console.log('user, ', user)
    return CustomRes.success(user);
  }

  @Get('test')
  async findAll() {
    this.appService.findAll()
    return CustomRes.success();
  }

  @Post('/create-user')
  async createUser(@Authenticated() user: UserData, @Body() createUserDto: {userType: string}) {
    console.log('user, ', user)
    console.log('createUserDto, ', createUserDto)
    return CustomRes.success(user);
  }
}
