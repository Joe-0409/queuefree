import { Inject, Injectable } from '@nestjs/common';
import {
  CURRENT_USER_SOURCE_PORT,
  CurrentUserSourcePort
} from '../common/sources/current-user-source.port';
import { MeOverviewResponseDto } from './dto/me-overview-response.dto';

@Injectable()
export class MeService {
  constructor(
    @Inject(CURRENT_USER_SOURCE_PORT)
    private readonly currentUserSource: CurrentUserSourcePort
  ) {}

  async getMeOverview(): Promise<MeOverviewResponseDto> {
    const currentUser = await this.currentUserSource.getCurrentUserOverview();

    return {
      userId: currentUser.userId,
      phoneMasked: currentUser.phoneMasked,
      accountDeleteStatus: currentUser.accountDeleteStatus,
      walletActivationMethod: currentUser.walletActivationMethod
    };
  }
}
