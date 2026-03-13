import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { ApiCommonErrorResponses } from '../common/swagger/api-common-error-responses.decorator';
import { ApiIdempotencyKeyHeader } from '../common/swagger/api-idempotency-key-header.decorator';
import { CreateOrderRequestDto } from './dto/create-order-request.dto';
import { CreateOrderResponseDto } from './dto/create-order-response.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a single-item order for the current C-end user'
  })
  @ApiIdempotencyKeyHeader()
  @ApiBody({
    type: CreateOrderRequestDto
  })
  @ApiCreatedResponse({
    type: CreateOrderResponseDto
  })
  @ApiCommonErrorResponses({
    badRequestDescription: 'Invalid order creation request.',
    notFoundDescription: 'Product, SKU, or address not found.'
  })
  async createOrder(
    @Body() body: CreateOrderRequestDto,
    @Headers('idempotency-key') idempotencyKey?: string
  ): Promise<CreateOrderResponseDto> {
    return this.ordersService.createOrder(body, idempotencyKey);
  }
}
