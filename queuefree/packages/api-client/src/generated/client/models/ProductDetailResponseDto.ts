/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductDetailSkuDto } from './ProductDetailSkuDto';
export type ProductDetailResponseDto = {
    productId: string;
    title: string;
    descriptionText: string;
    coverImageUrl: string;
    galleryImageUrls: Array<string>;
    priceMinor: number;
    currency: string;
    defaultCashbackCapMinor: number;
    queueEnabled: boolean;
    soldOut: boolean;
    maxOrderQty: number;
    skus: Array<ProductDetailSkuDto>;
};

