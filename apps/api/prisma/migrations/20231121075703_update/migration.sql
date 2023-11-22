/*
  Warnings:

  - You are about to drop the column `inviteeEmail` on the `team_lead_invites` table. All the data in the column will be lost.
  - Added the required column `inviteEmail` to the `team_lead_invites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "team_lead_invites" DROP COLUMN "inviteeEmail",
ADD COLUMN     "inviteEmail" TEXT NOT NULL,
ADD COLUMN     "inviteRole" "CompanyRole" NOT NULL DEFAULT 'TEAM_MEMBER';
