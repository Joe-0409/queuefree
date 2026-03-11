export var OrderStatus;
(function (OrderStatus) {
    OrderStatus["CREATED"] = "CREATED";
    OrderStatus["WAIT_PAY"] = "WAIT_PAY";
    OrderStatus["PAID"] = "PAID";
    OrderStatus["FULFILLING"] = "FULFILLING";
    OrderStatus["SHIPPED"] = "SHIPPED";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["COMPLETED"] = "COMPLETED";
    OrderStatus["CANCELED"] = "CANCELED";
    OrderStatus["AFTERSALE_OPEN"] = "AFTERSALE_OPEN";
    OrderStatus["PARTIAL_REFUNDED"] = "PARTIAL_REFUNDED";
    OrderStatus["FULL_REFUNDED"] = "FULL_REFUNDED";
})(OrderStatus || (OrderStatus = {}));
//# sourceMappingURL=order-status.js.map