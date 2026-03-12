import { z } from 'zod';

export const AdminDashboardSummarySchema = z.object({
  paidOrderCountToday: z.number().int().nonnegative(),
  activeQueueEntryCount: z.number().int().nonnegative(),
  pendingWithdrawalCount: z.number().int().nonnegative(),
});

export type AdminDashboardSummaryModel = z.infer<typeof AdminDashboardSummarySchema>;
