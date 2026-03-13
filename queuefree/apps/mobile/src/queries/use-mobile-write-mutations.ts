import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  checkInQueueGuard,
  createCheckoutSession
} from '../lib/mobile-write-repository';
import type { CreateCheckoutSessionInput } from '../adapters/mobile-write-adapter';

export function useCreateCheckoutSessionMutation() {
  return useMutation({
    mutationKey: ['mobile', 'create-checkout-session'],
    mutationFn: (input: CreateCheckoutSessionInput) => createCheckoutSession(input)
  });
}

export function useQueueGuardCheckInMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['mobile', 'queue-guard-check-in'],
    mutationFn: () => checkInQueueGuard(),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['mobile', 'queue-screen'] }),
        queryClient.invalidateQueries({ queryKey: ['mobile', 'queue-entry-detail'] }),
        queryClient.invalidateQueries({ queryKey: ['mobile', 'order-success'] })
      ]);
    }
  });
}
