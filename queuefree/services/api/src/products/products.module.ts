import { Module } from '@nestjs/common';
import { SourcesModule } from '../common/sources/sources.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
 imports: [SourcesModule],
 controllers: [ProductsController],
 providers: [ProductsService],
 exports: [ProductsService]
})
export class ProductsModule {}