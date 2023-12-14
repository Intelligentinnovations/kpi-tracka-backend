import {Injectable} from "@nestjs/common";
import {KyselyService} from "@backend-template/database";
import {DB} from "../../utils/types";

@Injectable()
export class CompanyMemberRepo {
  constructor(private client: KyselyService<DB>) {
  }
}
