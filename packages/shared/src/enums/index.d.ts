export declare enum UserRole {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    OPERATOR = "OPERATOR",
    VIEWER = "VIEWER"
}
export declare enum ShipmentStatus {
    DRAFT = "DRAFT",
    CONFIRMED = "CONFIRMED",
    PICKED_UP = "PICKED_UP",
    IN_TRANSIT = "IN_TRANSIT",
    ARRIVED = "ARRIVED",
    OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
    DELIVERED = "DELIVERED",
    EXCEPTION = "EXCEPTION",
    CANCELLED = "CANCELLED"
}
export declare enum ShipmentType {
    EXPRESS = "EXPRESS",
    STANDARD = "STANDARD",
    ECONOMY = "ECONOMY",
    FREIGHT = "FREIGHT"
}
export declare enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    OVERDUE = "OVERDUE",
    REFUNDED = "REFUNDED"
}
export declare enum EventType {
    PICKED_UP = "PICKED_UP",
    DEPARTED = "DEPARTED",
    ARRIVED = "ARRIVED",
    CUSTOMS_HOLD = "CUSTOMS_HOLD",
    OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
    DELIVERED = "DELIVERED",
    EXCEPTION = "EXCEPTION"
}
export declare enum DocumentType {
    POD = "POD",
    CUSTOMS = "CUSTOMS",
    INVOICE = "INVOICE",
    MANIFEST = "MANIFEST",
    OTHER = "OTHER"
}
export declare const STATUS_TRANSITIONS: Record<ShipmentStatus, ShipmentStatus[]>;
//# sourceMappingURL=index.d.ts.map