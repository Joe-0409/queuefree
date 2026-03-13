export const ADDRESS_BOOK_SOURCE_PORT = Symbol('ADDRESS_BOOK_SOURCE_PORT');

export interface AddressBookSourcePort {
  hasAddress(userId: string, addressId: string): Promise<boolean>;
}
