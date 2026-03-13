import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminDashboardSummaryResponseDto } from './dto/admin-dashboard-summary-response.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  @Get('dashboard/summary')
  @ApiOperation({ summary: 'Admin Dashboard Summary' })
  @ApiOkResponse({ type: AdminDashboardSummaryResponseDto })
  async getDashboardSummary(): Promise<AdminDashboardSummaryResponseDto> {
    return {} as any;
  }
}
