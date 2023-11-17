import { KyselyService } from '@backend-template/database';
import { CognitoService } from '@backend-template/http';
import { Global, Module } from '@nestjs/common';

import { SecretsModule } from '../secrets/secrets.module';
import { SecretsService } from '../secrets/secrets.service';

@Global()
@Module({
  providers: [
  {
    provide: CognitoService,
    useFactory() {
      return new CognitoService();
    },
  },{
    provide: KyselyService,
    useFactory(secrets: SecretsService) {
      return new KyselyService(secrets.get('DATABASE_URL'));
    },
    inject: [SecretsService],
  },
],
  imports: [SecretsModule],
  exports: [CognitoService, KyselyService],
})
export class LibrariesModule {}
