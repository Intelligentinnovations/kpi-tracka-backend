/*
  Warnings:

  - Added the required column `companyId` to the `team_lead_invites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "team_lead_invites" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "team_lead_invites" ADD CONSTRAINT "team_lead_invites_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
