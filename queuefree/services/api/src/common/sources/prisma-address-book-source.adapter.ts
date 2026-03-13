import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddressBookSourcePort } from './address-book-source.port';

@Injectable()
export class PrismaAddressBookSourceAdapter implements AddressBookSourcePort {
  constructor(private readonly prisma: PrismaService) {}

  async hasAddress(userId: string, addressId: string): Promise<boolean> {
    const record = await this.prisma.userAddress.findFirst({
      where: {
        addressId,
        userId
      },
      select: {
        addressId: true
      }
    });

    return Boolean(record);
  }
}
