import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductListItemDto } from './product-list-item.dto';

export class ProductListResponseDto {
 @ApiProperty({
 type: [ProductListItemDto],
 description: 'List of queue-eligible products'
 })
 items: ProductListItemDto[];

 @ApiPropertyOptional({
 description: 'Cursor for the next page of results',
 example: 'prod_demo_02',
 nullable: true
 })
 cursor: string | null;
}