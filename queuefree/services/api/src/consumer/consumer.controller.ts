import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConsumerMeOverviewResponseDto } from './dto/me-overview-response.dto';
import { ConsumerProductListResponseDto } from './dto/product-list-response.dto';
import { ConsumerProductDetailResponseDto } from './dto/product-detail-response.dto';
import { QueueEntryListResponseDto } from './dto/queue-entry-list-response.dto';
import { QueueEntryDetailResponseDto } from './dto/queue-entry-detail-response.dto';
import { ConsumerUserQueueGuardResponseDto as UserQueueGuardResponseDto } from './dto/user-queue-guard-response.dto';
import { TaskListResponseDto } from './dto/task-list-response.dto';
import { UserInviteOverviewResponseDto } from './dto/user-invite-overview-response.dto';
import { InviteRecordListResponseDto } from './dto/invite-record-list-response.dto';
import { WalletOverviewResponseDto } from './dto/wallet-overview-response.dto';
import { WalletLedgerListResponseDto } from './dto/wallet-ledger-list-response.dto';
import { WithdrawalListResponseDto } from './dto/withdrawal-list-response.dto';

@ApiTags('Consumer')
@Controller()
export class ConsumerController {
  @Get('me')
  @ApiOperation({ summary: 'Get User Overview' })
  @ApiOkResponse({ type: ConsumerMeOverviewResponseDto })
  async getMe(): Promise<ConsumerMeOverviewResponseDto> {
    return {} as any;
  }

  @Get('products')
  @ApiOperation({ summary: 'List Products' })
  @ApiOkResponse({ type: ConsumerProductListResponseDto })
  async listProducts(): Promise<ConsumerProductListResponseDto> {
    return {} as any;
  }

  @Get('products/:productId')
  @ApiOperation({ summary: 'Get Product Detail' })
  @ApiOkResponse({ type: ConsumerProductDetailResponseDto })
  async getProductDetail(): Promise<ConsumerProductDetailResponseDto> {
    return {} as any;
  }

  @Get('queue-guard')
  @ApiOperation({ summary: 'Get Queue Guard Status' })
  @ApiOkResponse({ type: UserQueueGuardResponseDto })
  async getQueueGuard(): Promise<UserQueueGuardResponseDto> {
    return {} as any;
  }

  @Get('queue-entries')
  @ApiOperation({ summary: 'List My Queue Entries' })
  @ApiOkResponse({ type: QueueEntryListResponseDto })
  async listQueueEntries(
    @Query('cursor') cursor?: string,
    @Query('limit') limit: number = 20,
  ): Promise<QueueEntryListResponseDto> {
    return {} as any;
  }

  @Get('queue-entries/:queueEntryId')
  @ApiOperation({ summary: 'Get Queue Entry Detail' })
  @ApiOkResponse({ type: QueueEntryDetailResponseDto })
  async getQueueEntryDetail(): Promise<QueueEntryDetailResponseDto> {
    return {} as any;
  }

  @Get('tasks')
  @ApiOperation({ summary: 'List Available Tasks' })
  @ApiOkResponse({ type: TaskListResponseDto })
  async listTasks(): Promise<TaskListResponseDto> {
    return {} as any;
  }

  @Get('invites/me')
  @ApiOperation({ summary: 'Get My Invite Overview' })
  @ApiOkResponse({ type: UserInviteOverviewResponseDto })
  async getInviteOverview(): Promise<UserInviteOverviewResponseDto> {
    return {} as any;
  }

  @Get('invites/records')
  @ApiOperation({ summary: 'List My Invite Records' })
  @ApiOkResponse({ type: InviteRecordListResponseDto })
  async listInviteRecords(
    @Query('cursor') cursor?: string,
    @Query('limit') limit: number = 20,
  ): Promise<InviteRecordListResponseDto> {
    return {} as any;
  }

  @Get('wallet')
  @ApiOperation({ summary: 'Get Wallet Overview' })
  @ApiOkResponse({ type: WalletOverviewResponseDto })
  async getWalletOverview(): Promise<WalletOverviewResponseDto> {
    return {} as any;
  }

  @Get('wallet/ledgers')
  @ApiOperation({ summary: 'List Wallet Ledgers' })
  @ApiOkResponse({ type: WalletLedgerListResponseDto })
  async listWalletLedgers(
    @Query('cursor') cursor?: string,
    @Query('limit') limit: number = 20,
  ): Promise<WalletLedgerListResponseDto> {
    return {} as any;
  }

  @Get('withdrawals')
  @ApiOperation({ summary: 'List Withdrawals' })
  @ApiOkResponse({ type: WithdrawalListResponseDto })
  async listWithdrawals(
    @Query('cursor') cursor?: string,
    @Query('limit') limit: number = 20,
  ): Promise<WithdrawalListResponseDto> {
    return {} as any;
  }
}
