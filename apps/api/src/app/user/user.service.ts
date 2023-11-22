import { CustomRes } from '@backend-template/http';
import { UserData } from '@backend-template/types';
import { Injectable } from '@nestjs/common';

import { InviteData } from '../../utils/schema';
import { AdminData } from '../../utils/schema/user.schema';
import { CompanyRole } from '../../utils/types';
import { CompanyService } from '../company/company.service';
import { UserRepo } from './user.repo';

@Injectable()
export class UserService {
  constructor(private repo: UserRepo, private companyService: CompanyService) {}

  findAll() {
    return this.repo.findAllUsers();
  }
  findUserById(id:number) {
    return this.repo.findUserById(id);
  }
  findUserByEmail(email:string) {
    return this.repo.findUserByEmail(email);
  }
  createUser() {
    this.repo.findAllUsers();
  }
  async sendInvite(user: UserData, inviteData: InviteData) {
    console.log('user, ', user);
    console.log('inviteData, ', inviteData);
  }
  async createAdmin(user: UserData, adminData: AdminData) {
    console.log('user, ', user);
    console.log('adminDto, ', adminData);
    if (user.email !== adminData.email)
      throw CustomRes.unauthorized('Email failed validation');
    //create the user
    const newUser = await this.repo
      .createUser({
        email: user.email,
        firstName: adminData.firstName,
        lastName: adminData.lastName,
      })
      .elseThrow(CustomRes.serverError('failed to create user'));
    console.log({ newUser });
    //create the company
    const newCompany = await this.companyService.createCompany(adminData);
    console.log({ newCompany });

    // and the user and company to companyMember table
    const newCompanyMember = await this.companyService.createCompanyMember({
      userId: newUser.id,
      companyId: newCompany.id,
      memberRole: CompanyRole.ADMIN,
    });
    console.log({ newCompanyMember });
    return {
      user: { ...newUser, role: newCompanyMember.memberRole },
      company: newCompany,
    };
  }
}
