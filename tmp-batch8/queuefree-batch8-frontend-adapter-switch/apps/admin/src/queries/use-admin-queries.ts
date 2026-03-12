'use client';

import { useQuery } from '@tanstack/react-query';
import {
  fetchAdminDashboardData,
  fetchAdminDetailPageConfig,
  fetchAdminListPageConfig,
  type AdminDetailPageKind,
  type AdminListPageKind
} from '@/lib/admin-repository';

export function useAdminDashboardQuery() {
  return useQuery({
    queryKey: ['admin', 'dashboard-summary'],
    queryFn: fetchAdminDashboardData
  });
}

export function useAdminListPageQuery(kind: AdminListPageKind) {
  return useQuery({
    queryKey: ['admin', 'list-page', kind],
    queryFn: () => fetchAdminListPageConfig(kind)
  });
}

export function useAdminDetailPageQuery(kind: AdminDetailPageKind, id: string) {
  return useQuery({
    queryKey: ['admin', 'detail-page', kind, id],
    queryFn: () => fetchAdminDetailPageConfig(kind, id),
    enabled: Boolean(id)
  });
}
