import { Module } from '@nestjs/common';
import { SourcesModule } from '../common/sources/sources.module';
import { MeController } from './me.controller';
import { MeService } from './me.service';

@Module({
 imports: [SourcesModule],
 controllers: [MeController],
 providers: [MeService],
 exports: [MeService]
})
export class MeModule {}