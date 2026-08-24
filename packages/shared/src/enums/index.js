"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_TRANSITIONS = exports.DocumentType = exports.EventType = exports.PaymentStatus = exports.ShipmentType = exports.ShipmentStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["MANAGER"] = "MANAGER";
    UserRole["OPERATOR"] = "OPERATOR";
    UserRole["VIEWER"] = "VIEWER";
})(UserRole || (exports.UserRole = UserRole = {}));
var ShipmentStatus;
(function (ShipmentStatus) {
    ShipmentStatus["DRAFT"] = "DRAFT";
    ShipmentStatus["CONFIRMED"] = "CONFIRMED";
    ShipmentStatus["PICKED_UP"] = "PICKED_UP";
    ShipmentStatus["IN_TRANSIT"] = "IN_TRANSIT";
    ShipmentStatus["ARRIVED"] = "ARRIVED";
    ShipmentStatus["OUT_FOR_DELIVERY"] = "OUT_FOR_DELIVERY";
    ShipmentStatus["DELIVERED"] = "DELIVERED";
    ShipmentStatus["EXCEPTION"] = "EXCEPTION";
    ShipmentStatus["CANCELLED"] = "CANCELLED";
})(ShipmentStatus || (exports.ShipmentStatus = ShipmentStatus = {}));
var ShipmentType;
(function (ShipmentType) {
    ShipmentType["EXPRESS"] = "EXPRESS";
    ShipmentType["STANDARD"] = "STANDARD";
    ShipmentType["ECONOMY"] = "ECONOMY";
    ShipmentType["FREIGHT"] = "FREIGHT";
})(ShipmentType || (exports.ShipmentType = ShipmentType = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["PAID"] = "PAID";
    PaymentStatus["OVERDUE"] = "OVERDUE";
    PaymentStatus["REFUNDED"] = "REFUNDED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var EventType;
(function (EventType) {
    EventType["PICKED_UP"] = "PICKED_UP";
    EventType["DEPARTED"] = "DEPARTED";
    EventType["ARRIVED"] = "ARRIVED";
    EventType["CUSTOMS_HOLD"] = "CUSTOMS_HOLD";
    EventType["OUT_FOR_DELIVERY"] = "OUT_FOR_DELIVERY";
    EventType["DELIVERED"] = "DELIVERED";
    EventType["EXCEPTION"] = "EXCEPTION";
})(EventType || (exports.EventType = EventType = {}));
var DocumentType;
(function (DocumentType) {
    DocumentType["POD"] = "POD";
    DocumentType["CUSTOMS"] = "CUSTOMS";
    DocumentType["INVOICE"] = "INVOICE";
    DocumentType["MANIFEST"] = "MANIFEST";
    DocumentType["OTHER"] = "OTHER";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
// Valid status transitions
exports.STATUS_TRANSITIONS = {
    [ShipmentStatus.DRAFT]: [ShipmentStatus.CONFIRMED, ShipmentStatus.CANCELLED],
    [ShipmentStatus.CONFIRMED]: [ShipmentStatus.PICKED_UP, ShipmentStatus.CANCELLED],
    [ShipmentStatus.PICKED_UP]: [ShipmentStatus.IN_TRANSIT, ShipmentStatus.EXCEPTION],
    [ShipmentStatus.IN_TRANSIT]: [
        ShipmentStatus.ARRIVED,
        ShipmentStatus.OUT_FOR_DELIVERY,
        ShipmentStatus.EXCEPTION,
    ],
    [ShipmentStatus.ARRIVED]: [ShipmentStatus.OUT_FOR_DELIVERY, ShipmentStatus.EXCEPTION],
    [ShipmentStatus.OUT_FOR_DELIVERY]: [ShipmentStatus.DELIVERED, ShipmentStatus.EXCEPTION],
    [ShipmentStatus.DELIVERED]: [],
    [ShipmentStatus.EXCEPTION]: [
        ShipmentStatus.IN_TRANSIT,
        ShipmentStatus.OUT_FOR_DELIVERY,
        ShipmentStatus.CANCELLED,
    ],
    [ShipmentStatus.CANCELLED]: [],
};
//# sourceMappingURL=index.js.map