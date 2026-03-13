export const PAYMENTS_PERSISTENCE_PORT = Symbol('PAYMENTS_PERSISTENCE_PORT');

export interface PaymentRecord {
  paymentIntentId: string;
  orderId: string;
  provider: string;
  amountMinor: number;
  currencyCode: string;
  checkoutUrl: string;
  idempotencyKey: string;
  createdAt: Date;
}

export interface CreatePaymentRecordInput {
  paymentIntentId: string;
  orderId: string;
  provider: string;
  amountMinor: number;
  currencyCode: string;
  checkoutUrl: string;
  idempotencyKey: string;
}

export interface PaymentsPersistencePort {
  create(input: CreatePaymentRecordInput): Promise<PaymentRecord>;
  findLatestByOrderId(orderId: string): Promise<PaymentRecord | null>;
}
