import { Module } from '@nestjs/common';
import { SourcesModule } from '../common/sources/sources.module';
import { QueueGuardController } from './queue-guard.controller';
import { QueueGuardWriteController } from './queue-guard-write.controller';
import { QueueGuardService } from './queue-guard.service';

@Module({
 imports: [SourcesModule],
 controllers: [QueueGuardController, QueueGuardWriteController],
 providers: [QueueGuardService]
})
export class QueueGuardModule {}