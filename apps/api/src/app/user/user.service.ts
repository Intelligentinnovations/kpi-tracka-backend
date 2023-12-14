import { CustomRes } from '@backend-template/http';
import { UserData } from '@backend-template/types';
import { Injectable } from '@nestjs/common';

import { InviteData } from '../../utils/schema';
import { AdminData, IndividualData } from '../../utils/schema/user.schema';
import { CompanyRole, DBUserData } from '../../utils/types';
import { CompanyService } from '../company/company.service';
import { decryptString, encryptString } from './../../tools/encrpt-text';
import { UserRepo } from '../repo/user.repo';

@Injectable()
export class UserService {
  constructor(private repo: UserRepo, private companyService: CompanyService) {}

  findAll() {
    return this.repo.findAllUsers();
  }
  findUserById(id: number) {
    return this.repo.findUserById(id);
  }
  findUserByEmail(email: string) {
    return this.repo.findUserByEmail(email);
  }
  async sendInvite(user: DBUserData, dto: InviteData) {
    console.log('user, ', user);
    console.log('inviteData, ', dto);
    //check if already a team member
    // add invite to invite table
    const iv = await this.repo
      .sendInvite({
        teamAdminId: user.id,
        companyId: dto.companyId,
        inviteEmail: dto.userEmail,
        inviteRole: dto.userRole,
      })
      .elseThrow(CustomRes.serverError('Invite creation Failed'));

    //encrypt invite data
    const invite = await encryptString(
      `${iv.id}|${iv.inviteEmail}|${iv.inviteEmail}|${iv.inviteRole}|${iv.teamAdminId}|${iv.companyId}`
    );
    // send invite email
    // TODO EMAIL SERVICE
    console.log({ iv }, { invite });
    return { invite };
  }
  async acceptInvite(inviteCode: string) {
    const decryptedStr = await decryptString(inviteCode);
    const [id, inviteEmail, inviteRole, teamAdminId, companyId] =
      decryptedStr.split('|');
    if (
      !id ||
      !parseInt(id ?? '') ||
      !inviteEmail ||
      !inviteRole ||
      !teamAdminId ||
      !companyId
    )
      throw CustomRes.badRequest('invalid invite token');

    const inviteData = await this.repo.checkInvite({
      id: parseInt(id),
    }).elseThrow(CustomRes.badRequest('invalid invite token'));
    if(
      inviteEmail !== inviteData.inviteEmail ||
      inviteRole !== inviteData.inviteRole ||
      parseInt(teamAdminId) !== inviteData.teamAdminId ||
      parseInt(companyId) !== inviteData.companyId
    ) throw CustomRes.badRequest('invalid invite token')
    //decrypt the string
    // find the value in the DB
    // if exist create user, AND ADD TO COMPANY
    //create the user
    const newUser = await this.repo
    .createUser({
      email: inviteData.inviteEmail
    })
    .elseThrow(CustomRes.serverError('failed to create user'));
  console.log({ newUser });

    // and the user and company to companyMember table
    const newCompanyMember = await this.companyService.createCompanyMember({
      userId: newUser.id,
      companyId: inviteData.companyId,
      memberRole: inviteData.inviteRole,
    });
    console.log({ newCompanyMember });
    return {
      user: { ...newUser, role: newCompanyMember.memberRole },
    };
    // sennd baCK USER
  }
  async createIndividual(user: UserData, dto: IndividualData) {
    console.log('user, ', user);
    console.log('IndividualData, ', dto);
    if (user.email !== dto.email)
      throw CustomRes.unauthorized('Email failed validation');
    //create the user
    const newUser = await this.repo
      .createUser({
        email: user.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
      })
      .elseThrow(CustomRes.serverError('failed to create user'));
    console.log({ newUser });
    //create the company
    const newCompany = await this.companyService.createIndividualCompany(
      dto,
      user.email
    );
    console.log({ newCompany });

    // and the user and company to companyMember table
    const newCompanyMember = await this.companyService.createCompanyMember({
      userId: newUser.id,
      companyId: newCompany.id,
      memberRole: CompanyRole.INDIVIDUAL,
    });
    console.log({ newCompanyMember });
    return {
      user: { ...newUser, role: newCompanyMember.memberRole },
      company: newCompany,
    };
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
    const newCompany = await this.companyService.createTeamCompany(adminData);
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
