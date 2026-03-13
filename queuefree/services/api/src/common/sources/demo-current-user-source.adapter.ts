import {
  DEMO_ACCOUNT_DELETE_STATUS,
  DEMO_PHONE_MASKED,
  DEMO_USER_ID,
  DEMO_WALLET_ACTIVATION_METHOD
} from '../demo/demo-fixtures';
import { Injectable } from '@nestjs/common';
import {
  CurrentUserOverviewRecord,
  CurrentUserSourcePort
} from './current-user-source.port';

@Injectable()
export class DemoCurrentUserSourceAdapter implements CurrentUserSourcePort {
  async getCurrentUserId(): Promise<string> {
    return DEMO_USER_ID;
  }

  async getCurrentUserOverview(): Promise<CurrentUserOverviewRecord> {
    return {
      userId: DEMO_USER_ID,
      phoneMasked: DEMO_PHONE_MASKED,
      accountDeleteStatus: DEMO_ACCOUNT_DELETE_STATUS,
      walletActivationMethod: DEMO_WALLET_ACTIVATION_METHOD
    };
  }
}
