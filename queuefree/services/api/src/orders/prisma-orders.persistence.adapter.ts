import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@queuefree/shared';
import { PrismaService } from '../common/prisma/prisma.service';
import {
  CreateOrderRecordInput,
  OrderRecord,
  OrdersPersistencePort
} from './orders.persistence.port';

@Injectable()
export class PrismaOrdersPersistenceAdapter implements OrdersPersistencePort {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateOrderRecordInput): Promise<OrderRecord> {
    const record = await this.prisma.order.create({
      data: {
        orderId: input.orderId,
        userId: input.userId,
        productId: input.productId,
        skuId: input.skuId,
        quantity: input.quantity,
        addressId: input.addressId,
        status: input.status,
        amountMinor: input.amountMinor,
        currencyCode: input.currencyCode
      }
    });

    return this.toOrderRecord(record);
  }

  async findByOrderId(orderId: string): Promise<OrderRecord | null> {
    const record = await this.prisma.order.findUnique({
      where: {
        orderId
      }
    });

    return record ? this.toOrderRecord(record) : null;
  }

  private toOrderRecord(record: {
    orderId: string;
    userId: string;
    productId: string;
    skuId: string;
    quantity: number;
    addressId: string;
    status: string;
    amountMinor: number;
    currencyCode: string;
    createdAt: Date;
  }): OrderRecord {
    return {
      orderId: record.orderId,
      userId: record.userId,
      productId: record.productId,
      skuId: record.skuId,
      quantity: record.quantity,
      addressId: record.addressId,
      status: record.status as OrderStatus,
      amountMinor: record.amountMinor,
      currencyCode: record.currencyCode,
      createdAt: record.createdAt
    };
  }
}
