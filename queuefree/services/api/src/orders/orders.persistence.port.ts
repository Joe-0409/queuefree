import { OrderStatus } from '@queuefree/shared';

export const ORDERS_PERSISTENCE_PORT = Symbol('ORDERS_PERSISTENCE_PORT');

export interface OrderRecord {
  orderId: string;
  userId: string;
  productId: string;
  skuId: string;
  quantity: number;
  addressId: string;
  status: OrderStatus;
  amountMinor: number;
  currencyCode: string;
  createdAt: Date;
}

export interface CreateOrderRecordInput {
  orderId: string;
  userId: string;
  productId: string;
  skuId: string;
  quantity: number;
  addressId: string;
  status: OrderStatus;
  amountMinor: number;
  currencyCode: string;
}

export interface OrdersPersistencePort {
  create(input: CreateOrderRecordInput): Promise<OrderRecord>;
  findByOrderId(orderId: string): Promise<OrderRecord | null>;
}
