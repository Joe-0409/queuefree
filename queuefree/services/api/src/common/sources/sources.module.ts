import { Module } from '@nestjs/common';
import { CURRENT_USER_SOURCE_PORT } from './current-user-source.port';
import { CATALOG_READ_SOURCE_PORT } from './catalog-read-source.port';
import { ADDRESS_BOOK_SOURCE_PORT } from './address-book-source.port';
import { DemoCurrentUserSourceAdapter } from './demo-current-user-source.adapter';
import { DemoCatalogReadSourceAdapter } from './demo-catalog-read-source.adapter';
import { DemoAddressBookSourceAdapter } from './demo-address-book-source.adapter';

@Module({
 providers: [
 {
 provide: CURRENT_USER_SOURCE_PORT,
 useClass: DemoCurrentUserSourceAdapter
 },
 {
 provide: CATALOG_READ_SOURCE_PORT,
 useClass: DemoCatalogReadSourceAdapter
 },
 {
 provide: ADDRESS_BOOK_SOURCE_PORT,
 useClass: DemoAddressBookSourceAdapter
 }
 ],
 exports: [CURRENT_USER_SOURCE_PORT, CATALOG_READ_SOURCE_PORT, ADDRESS_BOOK_SOURCE_PORT]
})
export class SourcesModule {}