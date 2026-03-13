import { Injectable } from '@nestjs/common';
import { UserQueueGuardStatus } from '@queuefree/shared';
import { PrismaService } from '../common/prisma/prisma.service';
import {
  QueueGuardPersistencePort,
  QueueGuardRecord,
  UpsertQueueGuardCheckInInput
} from './queue-guard.persistence.port';

@Injectable()
export class PrismaQueueGuardPersistenceAdapter
  implements QueueGuardPersistencePort
{
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<QueueGuardRecord | null> {
    const record = await this.prisma.userQueueGuard.findUnique({
      where: {
        userId
      }
    });

    return record ? this.toQueueGuardRecord(record) : null;
  }

  async upsertCheckIn(
    input: UpsertQueueGuardCheckInInput
  ): Promise<QueueGuardRecord> {
    const record = await this.prisma.userQueueGuard.upsert({
      where: {
        userId: input.userId
      },
      update: {
        status: input.status,
        lastCheckinAt: input.lastCheckinAt,
        validUntil: input.validUntil,
        graceUntil: input.graceUntil
      },
      create: {
        userId: input.userId,
        status: input.status,
        lastCheckinAt: input.lastCheckinAt,
        validUntil: input.validUntil,
        graceUntil: input.graceUntil
      }
    });

    return this.toQueueGuardRecord(record);
  }

  private toQueueGuardRecord(record: {
    userId: string;
    status: string;
    lastCheckinAt: Date | null;
    validUntil: Date;
    graceUntil: Date | null;
    updatedAt: Date;
  }): QueueGuardRecord {
    return {
      userId: record.userId,
      status: record.status as UserQueueGuardStatus,
      lastCheckinAt: record.lastCheckinAt,
      validUntil: record.validUntil,
      graceUntil: record.graceUntil,
      updatedAt: record.updatedAt
    };
  }
}
