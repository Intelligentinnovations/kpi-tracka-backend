import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';
import { Insertable, Selectable } from 'kysely';

import { Company,CompanyMember,DB, Team } from '../../utils/types';

@Injectable()
export class TeamRepo3 {
  constructor(private dbClient: KyselyService<DB>) {}

  findAllCompanies() {
    return Optional.of(
      this.dbClient.selectFrom('companies').selectAll().execute()
    );
  }
  createCompany(company: Insertable<Company>) {
    return Optional.of(
      this.dbClient
        .insertInto('companies')
        .values(company)
        .returningAll()
        .executeTakeFirst()
    );
  }
  updateUserById(company: Omit<Selectable<Company>,'createdAt'|'updatedAt' >) {
    return Optional.of(
      this.dbClient
        .updateTable('companies')
        .set({ ...company })
        .where('id', '=', company.id)
        .returningAll()
        .executeTakeFirst()
    );
  }
  findUserById(id: number) {
    return Optional.of(
      this.dbClient
        .selectFrom('companies')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    );
  }
  findUserByEmail(email: string) {
    return Optional.of(
      this.dbClient
        .selectFrom('companies')
        .where('email', '=', email)
        .selectAll()
        .executeTakeFirst()
    );
  }

  
  findCompanyMemberByUserIdAndCompanyId(userId: number, companyId:number) {
    return Optional.of(
      this.dbClient
        .selectFrom('company_members as cm')
        // .leftJoin('companies as c','c.id','cm.companyId')
        // .leftJoin('users as u','u.id','cm.userId')
        .where('cm.userId', '=', userId)
        .where('cm.companyId', '=', companyId)
        // .select(['cm.id','cm.userId','cm.companyId','c.name','cm.memberRole'])
        .selectAll()
        .executeTakeFirst()
    );
  }

  createCompanyMember(companyMember: Insertable<CompanyMember>) {
    return Optional.of(
      this.dbClient
        .insertInto('company_members')
        .values(companyMember)
        .returningAll()
        .executeTakeFirst()
    );
  }
}

export class TeamRepo{
  constructor(private client: KyselyService<DB>) {}

  create(data: Insertable<Team>) {
    return Optional.of(
      this.client
        .insertInto('teams')
        .values(data)
        .returningAll()
        .execute()
    );
  }

  update(data: Selectable<Team>) {
    return this.client
      .updateTable('teams')
      .set(data)
      .where('id', '=', data.id)
      .execute();
  }

  // .deleteFrom(['person', 'pet'])
  // .using('person')
  // .innerJoin('pet', 'pet.owner_id', '=', 'person.id')
  delete(id: string) {
    return this.client
      .deleteFrom(['teams'])
      .where('id', '=', id)
      .execute();
  }

  findAllByTalent(talentId: string) {
    return Optional.of(
      this.client
        .selectFrom('TalentEducationBackground')
        .where('talentId', '=', talentId)
        .selectAll()
        .execute()
    );
  }

  findByIdAndTalent(id: string, talentId: string) {
    return Optional.of(
      this.client
        .selectFrom('TalentEducationBackground')
        .where('id', '=', id)
        .where('talentId', '=', talentId)
        .selectAll()
        .executeTakeFirst()
    );
  }
}