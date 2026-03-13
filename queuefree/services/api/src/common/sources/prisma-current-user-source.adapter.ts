import {
  AccountDeleteStatus,
  WalletActivationMethod
} from '@queuefree/shared';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DEMO_USER_ID } from '../demo/demo-fixtures';
import {
  CurrentUserOverviewRecord,
  CurrentUserSourcePort
} from './current-user-source.port';

@Injectable()
export class PrismaCurrentUserSourceAdapter implements CurrentUserSourcePort {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrentUserId(): Promise<string> {
    const user = await this.findCurrentUserOverview();
    return user.userId;
  }

  async getCurrentUserOverview(): Promise<CurrentUserOverviewRecord> {
    return this.findCurrentUserOverview();
  }

  private async findCurrentUserOverview(): Promise<CurrentUserOverviewRecord> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: DEMO_USER_ID
      },
      select: {
        userId: true,
        phoneMasked: true,
        accountDeleteStatus: true,
        walletActivationMethod: true
      }
    });

    if (!user) {
      throw new InternalServerErrorException({
        message: 'Current user source is not seeded.'
      });
    }

    return {
      userId: user.userId,
      phoneMasked: user.phoneMasked,
      accountDeleteStatus: user.accountDeleteStatus as AccountDeleteStatus,
      walletActivationMethod: user.walletActivationMethod
        ? (user.walletActivationMethod as WalletActivationMethod)
        : null
    };
  }
}
