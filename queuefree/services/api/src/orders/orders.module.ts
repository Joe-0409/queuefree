import { Module } from '@nestjs/common';
import { SourcesModule } from '../common/sources/sources.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
 imports: [SourcesModule],
 controllers: [OrdersController],
 providers: [OrdersService]
})
export class OrdersModule {}