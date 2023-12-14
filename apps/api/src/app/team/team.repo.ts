import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';
import { Insertable, Selectable } from 'kysely';

import { Company,CompanyMember,DB, Team } from '../../utils/types';

@Injectable()
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

  delete(id: string) {
    return Optional.of( this.client
      .deleteFrom(['teams'])
      .where('id', '=', id)
      .execute()
  )
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
