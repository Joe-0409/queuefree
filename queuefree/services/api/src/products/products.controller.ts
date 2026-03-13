import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger';
import { ApiErrorResponseDto } from '../common/dto/api-error-response.dto';
import { ListProductsQueryDto } from './dto/list-products-query.dto';
import { ProductDetailResponseDto } from './dto/product-detail-response.dto';
import { ProductListResponseDto } from './dto/product-list-response.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List queue-eligible products for the C-end home and product browsing flows'
  })
  @ApiOkResponse({
    type: ProductListResponseDto
  })
  @ApiInternalServerErrorResponse({
    type: ApiErrorResponseDto
  })
  async listProducts(
    @Query() query: ListProductsQueryDto
  ): Promise<ProductListResponseDto> {
    return this.productsService.listProducts(query);
  }

  @Get(':productId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get a product detail by productId for the C-end product page'
  })
  @ApiParam({
    name: 'productId',
    example: 'prod_demo_01'
  })
  @ApiOkResponse({
    type: ProductDetailResponseDto
  })
  @ApiNotFoundResponse({
    type: ApiErrorResponseDto
  })
  @ApiInternalServerErrorResponse({
    type: ApiErrorResponseDto
  })
  async getProductById(
    @Param('productId') productId: string
  ): Promise<ProductDetailResponseDto> {
    return this.productsService.getProductById(productId);
  }
}
