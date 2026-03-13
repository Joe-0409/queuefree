import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderRequestDto {
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

  @ApiProperty({
    example: 'addr_demo_01'
  })
  addressId!: string;
}
