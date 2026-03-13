import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListProductsQueryDto {
 @ApiPropertyOptional({
 description: 'Cursor for pagination',
 example: 'prod_demo_02'
 })
 cursor?: string;
}