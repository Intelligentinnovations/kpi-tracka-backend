import { CustomRes } from '@backend-template/http';
import { Injectable } from '@nestjs/common';

import { AdminData, CompanyMemberData, IndividualData } from '../../utils/schema/user.schema';
import { CompanyType } from '../../utils/types';
import { CompanyRepo } from './company.repo';

@Injectable()
export class CompanyService {
  constructor(private repo: CompanyRepo) {}

  findAll(){
    return this.repo.findAllCompanies()
  }
  // createCompany(){
  //   this.repo.findAllUsers()
  // }
  async createIndividualCompany(adminData:IndividualData, email: string){
    const newCompany = await this.repo.createCompany({
      name: `${CompanyType.INDIVIDUAL}|${email}`,
      email,
      phone: adminData.companyPhone,
      companySize: adminData.companySize,
      logo: adminData.companyLogo,
      country: adminData.companyCountry,
      bio: adminData.companyBio,
      companyType: adminData.companyType,
    }).elseThrow(CustomRes.serverError('failed to create company'))

    return newCompany
  }
  async createTeamCompany(adminData:AdminData){
    const newCompany = await this.repo.createCompany({
      name: adminData.companyName,
      email: adminData.companyEmail,
      phone: adminData.companyPhone,
      companySize: adminData.companySize,
      logo: adminData.companyLogo,
      country: adminData.companyCountry,
      bio: adminData.companyBio,
      companyType: adminData.companyType,
    }).elseThrow(CustomRes.serverError('failed to create company'))

    return newCompany
  }
  
  async createCompanyMember(memberData:CompanyMemberData){
    const newCompanyMember = await this.repo.createCompanyMember({
      userId: memberData.userId,
      companyId: memberData.companyId,
      memberRole: memberData.memberRole
    }).elseThrow(CustomRes.serverError('failed to create company member'))

    return newCompanyMember
  }
  async findCompanyMemberByUserIdAndCompanyId(userId:number, companyId: number){
    return await this.repo.findCompanyMemberByUserIdAndCompanyId(userId,companyId).elseNull()
  }
}
