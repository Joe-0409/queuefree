import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentIntentResponseDto {
  @ApiProperty({
    example: 'pi_demo_01'
  })
  paymentIntentId!: string;

  @ApiProperty({
    example: 'order_demo_01'
  })
  orderId!: string;

  @ApiProperty({
    example: 'mockpay'
  })
  provider!: string;

  @ApiProperty({
    example: 129900,
    description: 'Minor unit amount that should be paid for the order.'
  })
  amountMinor!: number;

  @ApiProperty({
    example: 'PHP'
  })
  currencyCode!: string;

  @ApiProperty({
    example: 'https://checkout.queuefree.com/payment-intents/pi_demo_01'
  })
  checkoutUrl!: string;
}
