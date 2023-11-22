import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const CompanyType = {
  INDIVIDUAL: 'INDIVIDUAL',
  TEAM: 'TEAM',
} as const;
export type CompanyType = typeof CompanyType[keyof typeof CompanyType];
export const CompanyRole = {
  INDIVIDUAL: 'INDIVIDUAL',
  TEAM_MEMBER: 'TEAM_MEMBER',
  TEAM_LEADER: 'TEAM_LEADER',
  ADMIN: 'ADMIN',
} as const;
export type CompanyRole = typeof CompanyRole[keyof typeof CompanyRole];
export const NotificationType = {
  PUSH: 'PUSH',
  EMAIL: 'EMAIL',
  IN_APP: 'IN_APP',
} as const;
export type NotificationType =
  typeof NotificationType[keyof typeof NotificationType];
export const ProjectStatus = {
  TODO: 'TODO',
  ONGOING: 'ONGOING',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  OVERDUE: 'OVERDUE',
  CANCELLED: 'CANCELLED',
} as const;
export type ProjectStatus = typeof ProjectStatus[keyof typeof ProjectStatus];
export const TaskStatus = {
  TODO: 'TODO',
  PROGRESS: 'PROGRESS',
  COMPLETED: 'COMPLETED',
  OVERDUE: 'OVERDUE',
  CANCELLED: 'CANCELLED',
} as const;
export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];
export type Company = {
  id: Generated<number>;
  name: string;
  email: string;
  phone: string;
  companySize: number;
  logo: string | null;
  country: string;
  bio: string | null;
  companyType: Generated<CompanyType>;
};
export type CompanyMember = {
  id: Generated<number>;
  userId: number;
  companyId: number;
  memberRole: Generated<CompanyRole>;
};
export type CompanyMemberTask = {
  memberId: number;
  taskId: number;
};
export type Project = {
  id: Generated<number>;
  title: string;
  description: string;
  startDate: Timestamp;
  endDate: Timestamp;
  teamId: number;
  status: Generated<ProjectStatus>;
};
export type Task = {
  id: Generated<number>;
  projectId: number;
  status: Generated<TaskStatus>;
};
export type Team = {
  id: Generated<number>;
  name: string;
  companyId: number;
};
export type TeamLeadInvite = {
  id: Generated<number>;
  teamAdminId: number;
  inviteEmail: string;
  inviteRole: Generated<CompanyRole>;
};
export type TeamMember = {
  teamId: number;
  companyMemberId: number;
};
export type User = {
  id: Generated<number>;
  email: string;
  firstName: string;
  lastName: string;
  settingMentionInMessage: Generated<NotificationType[]>;
  settingReplyInMessage: Generated<NotificationType[]>;
  settingTaskUpdated: Generated<NotificationType[]>;
  settingReminder: Generated<NotificationType[]>;
  createdAt: Generated<Timestamp>;
  updatedAt: Generated<Timestamp>;
};
export type DB = {
  companies: Company;
  company_member_tasks: CompanyMemberTask;
  company_members: CompanyMember;
  projects: Project;
  tasks: Task;
  team_lead_invites: TeamLeadInvite;
  team_members: TeamMember;
  teams: Team;
  users: User;
};
