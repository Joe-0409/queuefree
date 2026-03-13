import {
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { ApiCommonErrorResponses } from '../common/swagger/api-common-error-responses.decorator';
import { ApiIdempotencyKeyHeader } from '../common/swagger/api-idempotency-key-header.decorator';
import { UserQueueGuardResponseDto } from './dto/user-queue-guard-response.dto';
import { QueueGuardService } from './queue-guard.service';

@ApiTags('QueueGuard')
@Controller('queue-guard')
export class QueueGuardWriteController {
  constructor(private readonly queueGuardService: QueueGuardService) {}

  @Post('check-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Check in and refresh the current user queue guard validity'
  })
  @ApiIdempotencyKeyHeader()
  @ApiOkResponse({
    type: UserQueueGuardResponseDto
  })
  @ApiCommonErrorResponses({
    badRequestDescription: 'Missing or invalid Idempotency-Key header.'
  })
  async checkInQueueGuard(
    @Headers('idempotency-key') idempotencyKey?: string
  ): Promise<UserQueueGuardResponseDto> {
    return this.queueGuardService.checkInQueueGuard(idempotencyKey);
  }
}
