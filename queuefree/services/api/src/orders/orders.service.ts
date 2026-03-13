import { randomUUID } from 'node:crypto';
import type { OrderStatus } from '@queuefree/shared';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PersistentIdempotencyService } from '../common/idempotency/persistent-idempotency.service';
import {
  ADDRESS_BOOK_SOURCE_PORT,
  AddressBookSourcePort
} from '../common/sources/address-book-source.port';
import {
  CATALOG_READ_SOURCE_PORT,
  CatalogReadSourcePort
} from '../common/sources/catalog-read-source.port';
import {
  CURRENT_USER_SOURCE_PORT,
  CurrentUserSourcePort
} from '../common/sources/current-user-source.port';
import {
  requireNonEmptyString,
  requirePositiveInteger
} from '../common/validation/request-validation.util';
import {
  ORDERS_PERSISTENCE_PORT,
  OrdersPersistencePort
} from './orders.persistence.port';
import { CreateOrderRequestDto } from './dto/create-order-request.dto';
import { CreateOrderResponseDto } from './dto/create-order-response.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDERS_PERSISTENCE_PORT)
    private readonly ordersPersistence: OrdersPersistencePort,
    @Inject(CURRENT_USER_SOURCE_PORT)
    private readonly currentUserSource: CurrentUserSourcePort,
    @Inject(CATALOG_READ_SOURCE_PORT)
    private readonly catalogReadSource: CatalogReadSourcePort,
    @Inject(ADDRESS_BOOK_SOURCE_PORT)
    private readonly addressBookSource: AddressBookSourcePort,
    private readonly idempotencyService: PersistentIdempotencyService
  ) {}

  async createOrder(
    body: CreateOrderRequestDto,
    idempotencyKey?: string
  ): Promise<CreateOrderResponseDto> {
    const productId = requireNonEmptyString(body.productId, 'productId');
    const skuId = requireNonEmptyString(body.skuId, 'skuId');
    const addressId = requireNonEmptyString(body.addressId, 'addressId');
    const quantity = requirePositiveInteger(body.quantity, 'quantity');
    const currentUserId = await this.currentUserSource.getCurrentUserId();

    const sku = await this.catalogReadSource.findOrderableSku(productId, skuId);
    if (!sku) {
      throw new NotFoundException({
        message: 'Product or SKU not found.'
      });
    }

    if (quantity > sku.maxQty) {
      throw new BadRequestException({
        message: `quantity must be less than or equal to ${sku.maxQty}.`
      });
    }

    const addressExists = await this.addressBookSource.hasAddress(
      currentUserId,
      addressId
    );
    if (!addressExists) {
      throw new NotFoundException({
        message: 'Address not found.'
      });
    }

    const requestSignature = JSON.stringify({
      productId,
      skuId,
      quantity,
      addressId
    });

    return this.idempotencyService.getOrCreate<CreateOrderResponseDto>({
      scope: 'orders.create',
      userId: currentUserId,
      idempotencyKey,
      requestSignature,
      mismatchMode: 'bad_request',
      successStatus: 201,
      factory: async () => {
        const order = await this.ordersPersistence.create({
          orderId: this.buildOrderId(),
          userId: currentUserId,
          productId,
          skuId,
          quantity,
          addressId,
          status: 'WAIT_PAY' as OrderStatus,
          amountMinor: sku.priceMinor * quantity,
          currencyCode: sku.currencyCode
        });

        return {
          orderId: order.orderId,
          status: order.status,
          productId: order.productId,
          skuId: order.skuId,
          quantity: order.quantity
        };
      }
    });
  }

  private buildOrderId(): string {
    return `order_${randomUUID().replace(/-/g, '').slice(0, 12)}`;
  }
}
