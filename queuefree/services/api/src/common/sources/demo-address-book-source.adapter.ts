import { Injectable } from '@nestjs/common';
import { DEMO_ADDRESS_ID, DEMO_USER_ID } from '../demo/demo-fixtures';
import { AddressBookSourcePort } from './address-book-source.port';

@Injectable()
export class DemoAddressBookSourceAdapter implements AddressBookSourcePort {
  async hasAddress(userId: string, addressId: string): Promise<boolean> {
    return userId === DEMO_USER_ID && addressId === DEMO_ADDRESS_ID;
  }
}
