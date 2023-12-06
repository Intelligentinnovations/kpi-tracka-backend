import { z } from 'zod';

import { CompanyRole, CompanyType } from '../types';

export const AdminSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  //company info
  companyEmail: z.string().email(),
  companyName: z.string().min(3).max(30),
  companyPhone: z.string().min(11).max(13),
  companySize: z.number(),
  companyLogo: z.string().optional(),
  companyCountry: z.string(),
  companyBio: z.string().optional(),
  companyType: z.nativeEnum(CompanyType).default(CompanyType.TEAM),
});
export const CompanyMemberSchema = z.object({
  userId: z.number(),
  companyId: z.number(),
  memberRole: z.nativeEnum(CompanyRole).default(CompanyRole.TEAM_MEMBER),
});

export const IndividualSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  //company info
  companyEmail: z.string().email().optional(),
  companyPhone: z.string().min(11).max(13),
  companyLogo: z.string().optional(),
  companyCountry: z.string(),
  companyBio: z.string().optional(),
  companySize: z.number().default(1),
  companyName: z.string().min(3).max(30).default(CompanyType.INDIVIDUAL),
  companyType: z.nativeEnum(CompanyType).default(CompanyType.INDIVIDUAL),
});
export type AdminData = z.infer<typeof AdminSchema>;
export type IndividualData = z.infer<typeof IndividualSchema>;
export type CompanyMemberData = z.infer<typeof CompanyMemberSchema>;
