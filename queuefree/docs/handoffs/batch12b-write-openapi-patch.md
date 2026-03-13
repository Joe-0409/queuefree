# Batch 12B — C 端写操作 OpenAPI 草案

This is a patch to merge into `services/api/openapi/queuefree.readonly.v1.yaml`.

## Where to insert

Place the following paths at the end of the `paths:` section (before `components:`).

```yaml
### C 端写操作路径（Batch 12B）

/v1/orders:
  post:
    tags: [Orders]
    summary: Create a new order
    operationId: createOrder
    parameters:
      - $ref: '#/components/parameters/IdempotencyKeyHeader'
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/CreateOrderRequest'
    responses:
      '201':
        description: Order created successfully.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateOrderResponse'
      '400':
        $ref: '#/components/responses/BadRequest'
      '409':
        $ref: '#/components/responses/Conflict'
      '500':
        $ref: '#/components/responses/InternalServerError'

/v1/orders/{orderId}/payment-intents:
  post:
    tags: [Payments]
    summary: Create a payment intent for an order
    operationId: createPaymentIntent
    parameters:
      - $ref: '#/components/parameters/IdempotencyKeyHeader'
      - $ref: '#/components/parameters/OrderIdPath'
    responses:
      '201':
        description: Payment intent created successfully.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreatePaymentIntentResponse'
      '400':
        $ref: '#/components/responses/BadRequest'
      '404':
        $ref: '#/components/responses/NotFound'
      '409':
        $ref: '#/components/responses/Conflict'
      '500':
        $ref: '#/components/responses/InternalServerError'

/v1/queue-guard/check-in:
  post:
    tags: [Queue Guard]
    summary: Check in to activate queue guard
    operationId: checkInQueueGuard
    parameters:
      - $ref: '#/components/parameters/IdempotencyKeyHeader'
    responses:
      '200':
        description: Check-in successful.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserQueueGuardResponse'
      '400':
        $ref: '#/components/responses/BadRequest'
      '409':
        $ref: '#/components/responses/Conflict'
      '500':
        $ref: '#/components/responses/InternalServerError'
```

## components/parameters to add

```yaml
  parameters:
    IdempotencyKeyHeader:
      name: Idempotency-Key
      in: header
      required: true
      description: Idempotency key for the request
      schema:
        type: string

    OrderIdPath:
      name: orderId
      in: path
      required: true
      description: Order ID
      schema:
        type: string
```

## components/schemas to add

```yaml
    OrderStatus:
      type: string
      enum:
        - CREATED
        - WAIT_PAY
        - PAID
        - FULFILLING
        - SHIPPED
        - DELIVERED
        - COMPLETED
        - CANCELED
        - AFTERSALE_OPEN
        - PARTIAL_REFUNDED
        - FULL_REFUNDED

    CreateOrderRequest:
      type: object
      required:
        - productId
        - skuId
        - quantity
        - addressId
      properties:
        productId:
          type: string
          example: prod_demo_01
        skuId:
          type: string
          example: sku_demo_01
        quantity:
          type: integer
          example: 1
          minimum: 1
        addressId:
          type: string
          example: addr_demo_01

    CreateOrderResponse:
      type: object
      required:
        - orderId
        - status
        - productId
        - skuId
        - quantity
      properties:
        orderId:
          type: string
          example: order_demo_01
        status:
          $ref: '#/components/schemas/OrderStatus'
        productId:
          type: string
          example: prod_demo_01
        skuId:
          type: string
          example: sku_demo_01
        quantity:
          type: integer
          example: 1

    CreatePaymentIntentResponse:
      type: object
      required:
        - paymentIntentId
        - orderId
        - provider
        - amountMinor
        - currencyCode
        - checkoutUrl
      properties:
        paymentIntentId:
          type: string
          example: pi_demo_01
        orderId:
          type: string
          example: order_demo_01
        provider:
          type: string
          example: stripe
        amountMinor:
          type: integer
          example: 129900
          description: Payment amount in minor units
        currencyCode:
          type: string
          example: PHP
        checkoutUrl:
          type: string
          format: uri
          example: https://checkout.queuefree.com/pay/pi_demo_01
```

## components/responses to add

```yaml
  responses:
    BadRequest:
      description: Bad request
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ApiErrorResponse'
    Conflict:
      description: Request conflict (idempotency violation)
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ApiErrorResponse'
    NotFound:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ApiErrorResponse'
```
