/*
  Warnings:

  - You are about to drop the `company-member-tasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company-members` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `team-members` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "company-member-tasks" DROP CONSTRAINT "company-member-tasks_memberId_fkey";

-- DropForeignKey
ALTER TABLE "company-member-tasks" DROP CONSTRAINT "company-member-tasks_taskId_fkey";

-- DropForeignKey
ALTER TABLE "company-members" DROP CONSTRAINT "company-members_companyId_fkey";

-- DropForeignKey
ALTER TABLE "company-members" DROP CONSTRAINT "company-members_userId_fkey";

-- DropForeignKey
ALTER TABLE "team-members" DROP CONSTRAINT "team-members_companyMemberId_fkey";

-- DropForeignKey
ALTER TABLE "team-members" DROP CONSTRAINT "team-members_teamId_fkey";

-- DropTable
DROP TABLE "company-member-tasks";

-- DropTable
DROP TABLE "company-members";

-- DropTable
DROP TABLE "team-members";

-- CreateTable
CREATE TABLE "company_members" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "memberRole" "CompanyRole" NOT NULL DEFAULT 'INDIVIDUAL',

    CONSTRAINT "company_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_members" (
    "teamId" INTEGER NOT NULL,
    "companyMemberId" INTEGER NOT NULL,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("teamId","companyMemberId")
);

-- CreateTable
CREATE TABLE "company_member_tasks" (
    "memberId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "company_member_tasks_pkey" PRIMARY KEY ("taskId","memberId")
);

-- CreateTable
CREATE TABLE "team_lead_invites" (
    "id" SERIAL NOT NULL,
    "teamAdminId" INTEGER NOT NULL,
    "inviteeEmail" TEXT NOT NULL,

    CONSTRAINT "team_lead_invites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_members_userId_companyId_key" ON "company_members"("userId", "companyId");

-- AddForeignKey
ALTER TABLE "company_members" ADD CONSTRAINT "company_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_members" ADD CONSTRAINT "company_members_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_companyMemberId_fkey" FOREIGN KEY ("companyMemberId") REFERENCES "company_members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_member_tasks" ADD CONSTRAINT "company_member_tasks_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "company_members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_member_tasks" ADD CONSTRAINT "company_member_tasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_lead_invites" ADD CONSTRAINT "team_lead_invites_teamAdminId_fkey" FOREIGN KEY ("teamAdminId") REFERENCES "company_members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
