import { UserQueueGuardStatus } from '@queuefree/shared';

export const QUEUE_GUARD_PERSISTENCE_PORT = Symbol(
  'QUEUE_GUARD_PERSISTENCE_PORT'
);

export interface QueueGuardRecord {
  userId: string;
  status: UserQueueGuardStatus;
  lastCheckinAt: Date | null;
  validUntil: Date;
  graceUntil: Date | null;
  updatedAt: Date;
}

export interface UpsertQueueGuardCheckInInput {
  userId: string;
  status: UserQueueGuardStatus;
  lastCheckinAt: Date;
  validUntil: Date;
  graceUntil: Date | null;
}

export interface QueueGuardPersistencePort {
  findByUserId(userId: string): Promise<QueueGuardRecord | null>;
  upsertCheckIn(input: UpsertQueueGuardCheckInInput): Promise<QueueGuardRecord>;
}
