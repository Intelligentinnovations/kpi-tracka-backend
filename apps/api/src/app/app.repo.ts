import { KyselyService } from '@backend-template/database';
import { Injectable } from '@nestjs/common';

import { SecretsService } from '../secrets/secrets.service';
import { DB } from '../utils/types';

@Injectable()
export class AppRepo {
  constructor(private dbClient: KyselyService<DB>) {}

  findAll(){
    console.log(this.dbClient.selectFrom('User').compile())
  }
}
