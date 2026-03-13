import { PrismaClient } from '@prisma/client';
import {
  buildDemoQueueGuardWindow,
  DEMO_ACCOUNT_DELETE_STATUS,
  DEMO_ADDRESS_ID,
  DEMO_CURRENCY_CODE,
  DEMO_IS_QUEUE_ELIGIBLE,
  DEMO_MAX_QTY,
  DEMO_ORDER_PAID_ID,
  DEMO_ORDER_WAIT_PAY_ID,
  DEMO_PAYMENT_PROVIDER,
  DEMO_PHONE_MASKED,
  DEMO_PRICE_MINOR,
  DEMO_PRODUCT_COVER_IMAGE_URL,
  DEMO_PRODUCT_DESCRIPTION,
  DEMO_PRODUCT_ID,
  DEMO_PRODUCT_IMAGE_URLS,
  DEMO_PRODUCT_TITLE,
  DEMO_SECOND_IS_QUEUE_ELIGIBLE,
  DEMO_SECOND_MAX_QTY,
  DEMO_SECOND_PRICE_MINOR,
  DEMO_SECOND_PRODUCT_COVER_IMAGE_URL,
  DEMO_SECOND_PRODUCT_DESCRIPTION,
  DEMO_SECOND_PRODUCT_ID,
  DEMO_SECOND_PRODUCT_IMAGE_URLS,
  DEMO_SECOND_PRODUCT_TITLE,
  DEMO_SECOND_SKU_ID,
  DEMO_SKU_ID,
  DEMO_USER_ID,
  DEMO_WALLET_ACTIVATION_METHOD
} from '../src/common/demo/demo-fixtures';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const queueGuardWindow = buildDemoQueueGuardWindow();

  await prisma.user.upsert({
    where: {
      userId: DEMO_USER_ID
    },
    update: {
      phoneMasked: DEMO_PHONE_MASKED,
      accountDeleteStatus: DEMO_ACCOUNT_DELETE_STATUS,
      walletActivationMethod: DEMO_WALLET_ACTIVATION_METHOD
    },
    create: {
      userId: DEMO_USER_ID,
      phoneMasked: DEMO_PHONE_MASKED,
      accountDeleteStatus: DEMO_ACCOUNT_DELETE_STATUS,
      walletActivationMethod: DEMO_WALLET_ACTIVATION_METHOD
    }
  });

  await prisma.userAddress.upsert({
    where: {
      addressId: DEMO_ADDRESS_ID
    },
    update: {
      userId: DEMO_USER_ID
    },
    create: {
      addressId: DEMO_ADDRESS_ID,
      userId: DEMO_USER_ID
    }
  });

  await prisma.product.upsert({
    where: {
      productId: DEMO_PRODUCT_ID
    },
    update: {
      title: DEMO_PRODUCT_TITLE,
      description: DEMO_PRODUCT_DESCRIPTION,
      coverImageUrl: DEMO_PRODUCT_COVER_IMAGE_URL,
      imageUrls: JSON.stringify([...DEMO_PRODUCT_IMAGE_URLS]),
      isQueueEligible: DEMO_IS_QUEUE_ELIGIBLE
    },
    create: {
      productId: DEMO_PRODUCT_ID,
      title: DEMO_PRODUCT_TITLE,
      description: DEMO_PRODUCT_DESCRIPTION,
      coverImageUrl: DEMO_PRODUCT_COVER_IMAGE_URL,
      imageUrls: JSON.stringify([...DEMO_PRODUCT_IMAGE_URLS]),
      isQueueEligible: DEMO_IS_QUEUE_ELIGIBLE
    }
  });

  await prisma.product.upsert({
    where: {
      productId: DEMO_SECOND_PRODUCT_ID
    },
    update: {
      title: DEMO_SECOND_PRODUCT_TITLE,
      description: DEMO_SECOND_PRODUCT_DESCRIPTION,
      coverImageUrl: DEMO_SECOND_PRODUCT_COVER_IMAGE_URL,
      imageUrls: JSON.stringify([...DEMO_SECOND_PRODUCT_IMAGE_URLS]),
      isQueueEligible: DEMO_SECOND_IS_QUEUE_ELIGIBLE
    },
    create: {
      productId: DEMO_SECOND_PRODUCT_ID,
      title: DEMO_SECOND_PRODUCT_TITLE,
      description: DEMO_SECOND_PRODUCT_DESCRIPTION,
      coverImageUrl: DEMO_SECOND_PRODUCT_COVER_IMAGE_URL,
      imageUrls: JSON.stringify([...DEMO_SECOND_PRODUCT_IMAGE_URLS]),
      isQueueEligible: DEMO_SECOND_IS_QUEUE_ELIGIBLE
    }
  });

  await prisma.productSku.upsert({
    where: {
      skuId: DEMO_SKU_ID
    },
    update: {
      productId: DEMO_PRODUCT_ID,
      priceMinor: DEMO_PRICE_MINOR,
      currencyCode: DEMO_CURRENCY_CODE,
      maxQty: DEMO_MAX_QTY
    },
    create: {
      skuId: DEMO_SKU_ID,
      productId: DEMO_PRODUCT_ID,
      priceMinor: DEMO_PRICE_MINOR,
      currencyCode: DEMO_CURRENCY_CODE,
      maxQty: DEMO_MAX_QTY
    }
  });

  await prisma.productSku.upsert({
    where: {
      skuId: DEMO_SECOND_SKU_ID
    },
    update: {
      productId: DEMO_SECOND_PRODUCT_ID,
      priceMinor: DEMO_SECOND_PRICE_MINOR,
      currencyCode: DEMO_CURRENCY_CODE,
      maxQty: DEMO_SECOND_MAX_QTY
    },
    create: {
      skuId: DEMO_SECOND_SKU_ID,
      productId: DEMO_SECOND_PRODUCT_ID,
      priceMinor: DEMO_SECOND_PRICE_MINOR,
      currencyCode: DEMO_CURRENCY_CODE,
      maxQty: DEMO_SECOND_MAX_QTY
    }
  });

  await prisma.idempotencyKey.deleteMany({
    where: {
      userId: DEMO_USER_ID,
      idempotencyKey: {
        startsWith: 'smoke_'
      }
    }
  });

  await prisma.payment.deleteMany({
    where: {
      orderId: {
        in: [DEMO_ORDER_WAIT_PAY_ID, DEMO_ORDER_PAID_ID]
      }
    }
  });

  await prisma.order.upsert({
    where: {
      orderId: DEMO_ORDER_WAIT_PAY_ID
    },
    update: {
      userId: DEMO_USER_ID,
      productId: DEMO_PRODUCT_ID,
      skuId: DEMO_SKU_ID,
      quantity: 1,
      addressId: DEMO_ADDRESS_ID,
      status: 'WAIT_PAY',
      amountMinor: DEMO_PRICE_MINOR,
      currencyCode: DEMO_CURRENCY_CODE
    },
    create: {
      orderId: DEMO_ORDER_WAIT_PAY_ID,
      userId: DEMO_USER_ID,
      productId: DEMO_PRODUCT_ID,
      skuId: DEMO_SKU_ID,
      quantity: 1,
      addressId: DEMO_ADDRESS_ID,
      status: 'WAIT_PAY',
      amountMinor: DEMO_PRICE_MINOR,
      currencyCode: DEMO_CURRENCY_CODE
    }
  });

  await prisma.order.upsert({
    where: {
      orderId: DEMO_ORDER_PAID_ID
    },
    update: {
      userId: DEMO_USER_ID,
      productId: DEMO_PRODUCT_ID,
      skuId: DEMO_SKU_ID,
      quantity: 1,
      addressId: DEMO_ADDRESS_ID,
      status: 'PAID',
      amountMinor: DEMO_PRICE_MINOR,
      currencyCode: DEMO_CURRENCY_CODE
    },
    create: {
      orderId: DEMO_ORDER_PAID_ID,
      userId: DEMO_USER_ID,
      productId: DEMO_PRODUCT_ID,
      skuId: DEMO_SKU_ID,
      quantity: 1,
      addressId: DEMO_ADDRESS_ID,
      status: 'PAID',
      amountMinor: DEMO_PRICE_MINOR,
      currencyCode: DEMO_CURRENCY_CODE
    }
  });

  await prisma.userQueueGuard.upsert({
    where: {
      userId: DEMO_USER_ID
    },
    update: {
      status: 'VALID',
      lastCheckinAt: null,
      validUntil: queueGuardWindow.validUntil,
      graceUntil: queueGuardWindow.graceUntil
    },
    create: {
      userId: DEMO_USER_ID,
      status: 'VALID',
      lastCheckinAt: null,
      validUntil: queueGuardWindow.validUntil,
      graceUntil: queueGuardWindow.graceUntil
    }
  });

  console.log('QueueFree Batch 16D seed completed.');
  console.log(`- seeded user: ${DEMO_USER_ID}`);
  console.log(`- seeded address: ${DEMO_ADDRESS_ID}`);
  console.log(`- seeded product: ${DEMO_PRODUCT_ID}`);
  console.log(`- seeded product: ${DEMO_SECOND_PRODUCT_ID}`);
  console.log(`- seeded WAIT_PAY order: ${DEMO_ORDER_WAIT_PAY_ID}`);
  console.log(`- seeded PAID order: ${DEMO_ORDER_PAID_ID}`);
  console.log(`- payment provider fixture: ${DEMO_PAYMENT_PROVIDER}`);
}

main()
  .catch((error) => {
    console.error('QueueFree Batch 16D seed failed.');
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });