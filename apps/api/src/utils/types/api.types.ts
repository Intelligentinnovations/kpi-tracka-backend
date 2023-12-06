import { Selectable } from "kysely";

import { CompanyMember, User } from "./database";

export type DBUserData = Selectable<User>

export interface DBUserAndCompanyData {
 user: Selectable<User>
 company?: Selectable<CompanyMember>

}