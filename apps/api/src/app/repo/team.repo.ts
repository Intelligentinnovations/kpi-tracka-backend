import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';
import { Insertable, Selectable } from 'kysely';

import {DB, Team } from '../../utils/types';

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
    return Optional.of(this.client
      .updateTable('teams')
      .set(data)
      .where('id', '=', data.id)
      .execute()
    )
  }

}
