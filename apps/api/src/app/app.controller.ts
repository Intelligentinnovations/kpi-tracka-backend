import { CustomRes } from '@backend-template/http';
import { Authenticated, AuthenticatedGuard } from '@backend-template/rest-server';
import { UserData } from '@backend-template/types';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
@UseGuards(AuthenticatedGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  async getData(@Authenticated() user: UserData) {
    console.log('user, ', user)
    return CustomRes.success(user);
  }
}
