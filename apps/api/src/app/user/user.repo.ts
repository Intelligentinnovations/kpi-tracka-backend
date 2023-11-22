import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';
import { Insertable, Selectable } from 'kysely';

import { DB, User } from '../../utils/types';

@Injectable()
export class UserRepo {
  constructor(private dbClient: KyselyService<DB>) {}

  findAllUsers() {
    return Optional.of(
      this.dbClient.selectFrom('users').selectAll().execute()
    );
  }
  createUser(user: Insertable<User>) {
    return Optional.of(
      this.dbClient
        .insertInto('users')
        .values(user)
        .returningAll()
        .executeTakeFirst()
    );
  }
  updateUserById(user: Omit<Selectable<User>,'createdAt'|'updatedAt' >) {
    return Optional.of(
      this.dbClient
        .updateTable('users')
        .set({ ...user })
        .where('id', '=', user.id)
        .returningAll()
        .executeTakeFirst()
    );
  }
  findUserById(id: number) {
    return Optional.of(
      this.dbClient
        .selectFrom('users')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    );
  }
  findUserByEmail(email: string) {
    return Optional.of(
      this.dbClient
        .selectFrom('users')
        .where('email', '=', email)
        .selectAll()
        .executeTakeFirst()
    );
  }
}
