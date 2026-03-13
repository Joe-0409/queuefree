import {
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger';
import { ApiCommonErrorResponses } from '../common/swagger/api-common-error-responses.decorator';
import { ApiIdempotencyKeyHeader } from '../common/swagger/api-idempotency-key-header.decorator';
import { CreatePaymentIntentResponseDto } from './dto/create-payment-intent-response.dto';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@Controller('orders/:orderId/payment-intents')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a payment intent for an existing order'
  })
  @ApiIdempotencyKeyHeader()
  @ApiParam({
    name: 'orderId',
    example: 'order_demo_01'
  })
  @ApiCreatedResponse({
    type: CreatePaymentIntentResponseDto
  })
  @ApiCommonErrorResponses({
    badRequestDescription: 'Missing or invalid Idempotency-Key header.',
    notFoundDescription: 'Order not found.',
    conflictDescription:
      'Order cannot create a payment intent in its current status.'
  })
  async createPaymentIntent(
    @Param('orderId') orderId: string,
    @Headers('idempotency-key') idempotencyKey?: string
  ): Promise<CreatePaymentIntentResponseDto> {
    return this.paymentsService.createPaymentIntent(orderId, idempotencyKey);
  }
}
