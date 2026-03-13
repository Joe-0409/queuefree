import { ApiProperty } from '@nestjs/swagger';

export class ProductDetailResponseDto {
 @ApiProperty({
 example: 'prod_demo_01',
 description: 'Product unique identifier'
 })
 productId: string;

 @ApiProperty({
 example: 'Wireless Earbuds',
 description: 'Product title'
 })
 title: string;

 @ApiProperty({
 example: 'Compact wireless earbuds with charging case and queue-eligible cashback participation.',
 description: 'Product description'
 })
 description: string;

 @ApiProperty({
 type: [String],
 example: [
 'https://assets.queuefree.com/products/prod_demo_01/cover.jpg',
 'https://assets.queuefree.com/products/prod_demo_01/detail-1.jpg'
 ],
 description: 'List of product image URLs'
 })
 imageUrls: string[];

 @ApiProperty({
 example: 129900,
 description: 'Price in minor units (e.g., cents)'
 })
 priceMinor: number;

 @ApiProperty({
 example: 'PHP',
 description: 'Currency code'
 })
 currencyCode: string;

 @ApiProperty({
 example: 5,
 description: 'Maximum quantity per order'
 })
 maxQty: number;

 @ApiProperty({
 example: true,
 description: 'Whether the product is eligible for queue participation'
 })
 isQueueEligible: boolean;
}