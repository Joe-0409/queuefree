import { Module } from '@nestjs/common';
import { SourcesModule } from '../common/sources/sources.module';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
 imports: [SourcesModule],
 controllers: [PaymentsController],
 providers: [PaymentsService]
})
export class PaymentsModule {}