import { Inject, Injectable } from '@nestjs/common';
import { PersistentIdempotencyService } from '../common/idempotency/persistent-idempotency.service';
import {
  buildDemoQueueGuardWindow
} from '../common/demo/demo-fixtures';
import {
  CURRENT_USER_SOURCE_PORT,
  CurrentUserSourcePort
} from '../common/sources/current-user-source.port';
import {
  QUEUE_GUARD_PERSISTENCE_PORT,
  QueueGuardPersistencePort,
  QueueGuardRecord
} from './queue-guard.persistence.port';
import { UserQueueGuardResponseDto } from './dto/user-queue-guard-response.dto';

@Injectable()
export class QueueGuardService {
  constructor(
    @Inject(QUEUE_GUARD_PERSISTENCE_PORT)
    private readonly queueGuardPersistence: QueueGuardPersistencePort,
    @Inject(CURRENT_USER_SOURCE_PORT)
    private readonly currentUserSource: CurrentUserSourcePort,
    private readonly idempotencyService: PersistentIdempotencyService
  ) {}

  async getQueueGuard(): Promise<UserQueueGuardResponseDto> {
    const currentUserId = await this.currentUserSource.getCurrentUserId();
    const existing = await this.queueGuardPersistence.findByUserId(
      currentUserId
    );

    if (existing) {
      return this.toResponse(existing);
    }

    const fallback = buildDemoQueueGuardWindow();
    return {
      status: fallback.status,
      lastCheckinAt: fallback.lastCheckinAt
        ? fallback.lastCheckinAt.toISOString()
        : null,
      validUntil: fallback.validUntil.toISOString(),
      graceUntil: fallback.graceUntil
        ? fallback.graceUntil.toISOString()
        : null
    };
  }

  async checkInQueueGuard(
    idempotencyKey?: string
  ): Promise<UserQueueGuardResponseDto> {
    const currentUserId = await this.currentUserSource.getCurrentUserId();

    return this.idempotencyService.getOrCreate<UserQueueGuardResponseDto>({
      scope: 'queue-guard.check-in',
      userId: currentUserId,
      idempotencyKey,
      requestSignature: JSON.stringify({ action: 'check-in' }),
      mismatchMode: 'bad_request',
      successStatus: 200,
      factory: async () => {
        const now = new Date();
        const window = buildDemoQueueGuardWindow(now);

        const record = await this.queueGuardPersistence.upsertCheckIn({
          userId: currentUserId,
          status: window.status,
          lastCheckinAt: now,
          validUntil: window.validUntil,
          graceUntil: window.graceUntil
        });

        return this.toResponse(record);
      }
    });
  }

  private toResponse(record: QueueGuardRecord): UserQueueGuardResponseDto {
    return {
      status: record.status,
      lastCheckinAt: record.lastCheckinAt
        ? record.lastCheckinAt.toISOString()
        : null,
      validUntil: record.validUntil.toISOString(),
      graceUntil: record.graceUntil ? record.graceUntil.toISOString() : null
    };
  }
}
