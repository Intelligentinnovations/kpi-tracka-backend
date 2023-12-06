/*
  Warnings:

  - You are about to drop the `team_lead_invites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "team_lead_invites" DROP CONSTRAINT "team_lead_invites_companyId_fkey";

-- DropForeignKey
ALTER TABLE "team_lead_invites" DROP CONSTRAINT "team_lead_invites_teamAdminId_fkey";

-- DropTable
DROP TABLE "team_lead_invites";

-- CreateTable
CREATE TABLE "team_invites" (
    "id" SERIAL NOT NULL,
    "teamAdminId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "inviteEmail" TEXT NOT NULL,
    "inviteRole" "CompanyRole" NOT NULL DEFAULT 'TEAM_MEMBER',

    CONSTRAINT "team_invites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "team_invites" ADD CONSTRAINT "team_invites_teamAdminId_fkey" FOREIGN KEY ("teamAdminId") REFERENCES "company_members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_invites" ADD CONSTRAINT "team_invites_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
