import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import {
  CreatePaymentRecordInput,
  PaymentRecord,
  PaymentsPersistencePort
} from './payments.persistence.port';

@Injectable()
export class PrismaPaymentsPersistenceAdapter implements PaymentsPersistencePort {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreatePaymentRecordInput): Promise<PaymentRecord> {
    const record = await this.prisma.payment.create({
      data: {
        paymentIntentId: input.paymentIntentId,
        orderId: input.orderId,
        provider: input.provider,
        amountMinor: input.amountMinor,
        currencyCode: input.currencyCode,
        checkoutUrl: input.checkoutUrl,
        idempotencyKey: input.idempotencyKey
      }
    });

    return this.toPaymentRecord(record);
  }

  async findLatestByOrderId(orderId: string): Promise<PaymentRecord | null> {
    const record = await this.prisma.payment.findFirst({
      where: {
        orderId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return record ? this.toPaymentRecord(record) : null;
  }

  private toPaymentRecord(record: {
    paymentIntentId: string;
    orderId: string;
    provider: string;
    amountMinor: number;
    currencyCode: string;
    checkoutUrl: string;
    idempotencyKey: string;
    createdAt: Date;
  }): PaymentRecord {
    return {
      paymentIntentId: record.paymentIntentId,
      orderId: record.orderId,
      provider: record.provider,
      amountMinor: record.amountMinor,
      currencyCode: record.currencyCode,
      checkoutUrl: record.checkoutUrl,
      idempotencyKey: record.idempotencyKey,
      createdAt: record.createdAt
    };
  }
}
