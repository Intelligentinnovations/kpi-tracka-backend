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
  companyType: z.nativeEnum(CompanyType).default(CompanyType.INDIVIDUAL),
});
export const CompanyMemberSchema = z.object({
  userId: z.number(),
  companyId: z.number(),
  memberRole: z.nativeEnum(CompanyRole).default(CompanyRole.INDIVIDUAL),
});

export type AdminData = z.infer<typeof AdminSchema>;
export type CompanyMemberData = z.infer<typeof CompanyMemberSchema>;
