import { randomUUID } from 'node:crypto';
import type { OrderStatus } from '@queuefree/shared';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PersistentIdempotencyService } from '../common/idempotency/persistent-idempotency.service';
import {
  buildDemoCheckoutUrl,
  DEMO_PAYMENT_PROVIDER
} from '../common/demo/demo-fixtures';
import {
  CURRENT_USER_SOURCE_PORT,
  CurrentUserSourcePort
} from '../common/sources/current-user-source.port';
import { requireIdempotencyKey } from '../common/validation/request-validation.util';
import {
  ORDERS_PERSISTENCE_PORT,
  OrdersPersistencePort
} from '../orders/orders.persistence.port';
import {
  PAYMENTS_PERSISTENCE_PORT,
  PaymentsPersistencePort
} from './payments.persistence.port';
import { CreatePaymentIntentResponseDto } from './dto/create-payment-intent-response.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(ORDERS_PERSISTENCE_PORT)
    private readonly ordersPersistence: OrdersPersistencePort,
    @Inject(PAYMENTS_PERSISTENCE_PORT)
    private readonly paymentsPersistence: PaymentsPersistencePort,
    @Inject(CURRENT_USER_SOURCE_PORT)
    private readonly currentUserSource: CurrentUserSourcePort,
    private readonly idempotencyService: PersistentIdempotencyService
  ) {}

  async createPaymentIntent(
    orderId: string,
    idempotencyKey?: string
  ): Promise<CreatePaymentIntentResponseDto> {
    const normalizedOrderId = typeof orderId === 'string' ? orderId.trim() : '';
    if (!normalizedOrderId) {
      throw new NotFoundException({
        message: 'Order not found.'
      });
    }

    const normalizedIdempotencyKey = this.normalizeRequiredIdempotencyKey(
      idempotencyKey
    );
    const currentUserId = await this.currentUserSource.getCurrentUserId();
    const requestSignature = JSON.stringify({
      orderId: normalizedOrderId
    });

    return this.idempotencyService.getOrCreate<CreatePaymentIntentResponseDto>({
      scope: 'payments.create',
      userId: currentUserId,
      idempotencyKey: normalizedIdempotencyKey,
      requestSignature,
      mismatchMode: 'conflict',
      successStatus: 201,
      factory: async () => {
        const order = await this.ordersPersistence.findByOrderId(
          normalizedOrderId
        );

        if (!order || order.userId !== currentUserId) {
          throw new NotFoundException({
            message: 'Order not found.'
          });
        }

        if (order.status !== ('WAIT_PAY' as OrderStatus)) {
          throw new ConflictException({
            message:
              'Order cannot create a payment intent in its current status.',
            details: {
              currentStatus: order.status
            }
          });
        }

        const paymentIntentId = this.buildPaymentIntentId();
        const payment = await this.paymentsPersistence.create({
          paymentIntentId,
          orderId: order.orderId,
          provider: DEMO_PAYMENT_PROVIDER,
          amountMinor: order.amountMinor,
          currencyCode: order.currencyCode,
          checkoutUrl: buildDemoCheckoutUrl(paymentIntentId),
          idempotencyKey: normalizedIdempotencyKey
        });

        return {
          paymentIntentId: payment.paymentIntentId,
          orderId: payment.orderId,
          provider: payment.provider,
          amountMinor: payment.amountMinor,
          currencyCode: payment.currencyCode,
          checkoutUrl: payment.checkoutUrl
        };
      }
    });
  }

  private normalizeRequiredIdempotencyKey(idempotencyKey?: string): string {
    try {
      return requireIdempotencyKey(idempotencyKey);
    } catch {
      throw new BadRequestException({
        message: 'Missing or invalid Idempotency-Key header.'
      });
    }
  }

  private buildPaymentIntentId(): string {
    return `pi_${randomUUID().replace(/-/g, '').slice(0, 12)}`;
  }
}
