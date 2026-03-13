import { ApiProperty } from '@nestjs/swagger';

export const ORDER_STATUSES = [
  'CREATED',
  'WAIT_PAY',
  'PAID',
  'FULFILLING',
  'SHIPPED',
  'DELIVERED',
  'COMPLETED',
  'CANCELED',
  'AFTERSALE_OPEN',
  'PARTIAL_REFUNDED',
  'FULL_REFUNDED'
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export class CreateOrderResponseDto {
  @ApiProperty({
    example: 'order_demo_01'
  })
  orderId!: string;

  @ApiProperty({
    enum: ORDER_STATUSES,
    enumName: 'OrderStatus',
    example: 'WAIT_PAY'
  })
  status!: OrderStatus;

  @ApiProperty({
    example: 'prod_demo_01'
  })
  productId!: string;

  @ApiProperty({
    example: 'sku_demo_01'
  })
  skuId!: string;

  @ApiProperty({
    example: 1
  })
  quantity!: number;
}
