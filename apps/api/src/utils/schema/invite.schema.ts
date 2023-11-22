import { z } from 'zod';

import { CompanyRole } from '../types';

export const InviteSchema = z.object({
  userEmail: z.string().email(),
  companyId: z.number(),
  userRole: z.nativeEnum(CompanyRole).default(CompanyRole.TEAM_MEMBER),
});

export type InviteData = z.infer<typeof InviteSchema>;
