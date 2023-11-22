/*
  Warnings:

  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompanyMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompanyMemberTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompanyMember" DROP CONSTRAINT "CompanyMember_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyMember" DROP CONSTRAINT "CompanyMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyMemberTask" DROP CONSTRAINT "CompanyMemberTask_memberId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyMemberTask" DROP CONSTRAINT "CompanyMemberTask_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_companyId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_companyMemberId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_teamId_fkey";

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "CompanyMember";

-- DropTable
DROP TABLE "CompanyMemberTask";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "TeamMember";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "settingMentionInMessage" "NotificationType"[] DEFAULT ARRAY['PUSH', 'IN_APP']::"NotificationType"[],
    "settingReplyInMessage" "NotificationType"[] DEFAULT ARRAY['PUSH', 'IN_APP']::"NotificationType"[],
    "settingTaskUpdated" "NotificationType"[] DEFAULT ARRAY['PUSH', 'IN_APP']::"NotificationType"[],
    "settingReminder" "NotificationType"[] DEFAULT ARRAY[]::"NotificationType"[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "companySize" INTEGER NOT NULL,
    "logo" TEXT,
    "country" TEXT NOT NULL,
    "bio" TEXT,
    "companyType" "CompanyType" NOT NULL DEFAULT 'INDIVIDUAL',

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company-members" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "memberRole" "CompanyRole" NOT NULL DEFAULT 'INDIVIDUAL',

    CONSTRAINT "company-members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team-members" (
    "teamId" INTEGER NOT NULL,
    "companyMemberId" INTEGER NOT NULL,

    CONSTRAINT "team-members_pkey" PRIMARY KEY ("teamId","companyMemberId")
);

-- CreateTable
CREATE TABLE "company-member-tasks" (
    "memberId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "company-member-tasks_pkey" PRIMARY KEY ("taskId","memberId")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'TODO',

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "teamId" INTEGER NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'TODO',

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "company-members_userId_companyId_key" ON "company-members"("userId", "companyId");

-- AddForeignKey
ALTER TABLE "company-members" ADD CONSTRAINT "company-members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company-members" ADD CONSTRAINT "company-members_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team-members" ADD CONSTRAINT "team-members_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team-members" ADD CONSTRAINT "team-members_companyMemberId_fkey" FOREIGN KEY ("companyMemberId") REFERENCES "company-members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company-member-tasks" ADD CONSTRAINT "company-member-tasks_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "company-members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company-member-tasks" ADD CONSTRAINT "company-member-tasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
