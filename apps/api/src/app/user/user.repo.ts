import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';
import { Insertable, Selectable } from 'kysely';

import { DB, DBUserData, Invite, User } from '../../utils/types';

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
  sendInvite(invite: Insertable<Invite>) {
    return Optional.of(
      this.dbClient
        .insertInto('team_invites')
        .values(invite)
        .returningAll()
        .executeTakeFirst()
    );
  }
  checkInvite(invite: Selectable<Pick<Invite, 'id'>>) {
    return Optional.of(
      this.dbClient
        .selectFrom('team_invites')
        .where('id','=', invite.id)
        .selectAll()
        .executeTakeFirst()
    );
  }
  updateUserById(user: Omit<DBUserData,'createdAt'|'updatedAt' >) {
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
