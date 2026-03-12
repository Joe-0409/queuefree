import { useQuery } from '@tanstack/react-query';
import {
  fetchDeleteAccountPreview,
  fetchHomeScreenData,
  fetchInvitesScreenData,
  fetchOrderSuccessData,
  fetchProductDetail,
  fetchProfileScreenData,
  fetchQueueEntryDetail,
  fetchQueueScreenData,
  fetchRulesCenterData,
  fetchTasksScreenData,
  fetchWalletScreenData
} from '../lib/mobile-repository';

const oneMinute = 60_000;

export function useHomeScreenQuery() {
  return useQuery({
    queryKey: ['mobile', 'home-screen'],
    queryFn: fetchHomeScreenData,
    staleTime: oneMinute
  });
}

export function useQueueScreenQuery() {
  return useQuery({
    queryKey: ['mobile', 'queue-screen'],
    queryFn: fetchQueueScreenData,
    staleTime: oneMinute
  });
}

export function useTasksScreenQuery() {
  return useQuery({
    queryKey: ['mobile', 'tasks-screen'],
    queryFn: fetchTasksScreenData,
    staleTime: oneMinute
  });
}

export function useInvitesScreenQuery() {
  return useQuery({
    queryKey: ['mobile', 'invites-screen'],
    queryFn: fetchInvitesScreenData,
    staleTime: oneMinute
  });
}

export function useWalletScreenQuery() {
  return useQuery({
    queryKey: ['mobile', 'wallet-screen'],
    queryFn: fetchWalletScreenData,
    staleTime: oneMinute
  });
}

export function useProfileScreenQuery() {
  return useQuery({
    queryKey: ['mobile', 'profile-screen'],
    queryFn: fetchProfileScreenData,
    staleTime: oneMinute
  });
}

export function useProductDetailQuery(productId: string) {
  return useQuery({
    queryKey: ['mobile', 'product-detail', productId],
    queryFn: () => fetchProductDetail(productId),
    staleTime: oneMinute,
    enabled: Boolean(productId)
  });
}

export function useQueueEntryDetailQuery(entryId: string) {
  return useQuery({
    queryKey: ['mobile', 'queue-entry-detail', entryId],
    queryFn: () => fetchQueueEntryDetail(entryId),
    staleTime: oneMinute,
    enabled: Boolean(entryId)
  });
}

export function useRulesCenterQuery() {
  return useQuery({
    queryKey: ['mobile', 'rules-center'],
    queryFn: fetchRulesCenterData,
    staleTime: oneMinute
  });
}

export function useOrderSuccessQuery(orderId: string) {
  return useQuery({
    queryKey: ['mobile', 'order-success', orderId],
    queryFn: () => fetchOrderSuccessData(orderId),
    staleTime: oneMinute,
    enabled: Boolean(orderId)
  });
}

export function useDeleteAccountPreviewQuery() {
  return useQuery({
    queryKey: ['mobile', 'delete-account-preview'],
    queryFn: fetchDeleteAccountPreview,
    staleTime: oneMinute
  });
}
