export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  OPERATOR = 'OPERATOR',
  VIEWER = 'VIEWER',
}

export enum ShipmentStatus {
  DRAFT = 'DRAFT',
  CONFIRMED = 'CONFIRMED',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  ARRIVED = 'ARRIVED',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  EXCEPTION = 'EXCEPTION',
  CANCELLED = 'CANCELLED',
}

export enum ShipmentType {
  EXPRESS = 'EXPRESS',
  STANDARD = 'STANDARD',
  ECONOMY = 'ECONOMY',
  FREIGHT = 'FREIGHT',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  REFUNDED = 'REFUNDED',
}

export enum EventType {
  PICKED_UP = 'PICKED_UP',
  DEPARTED = 'DEPARTED',
  ARRIVED = 'ARRIVED',
  CUSTOMS_HOLD = 'CUSTOMS_HOLD',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  EXCEPTION = 'EXCEPTION',
}

export enum DocumentType {
  POD = 'POD',
  CUSTOMS = 'CUSTOMS',
  INVOICE = 'INVOICE',
  MANIFEST = 'MANIFEST',
  OTHER = 'OTHER',
}

// Valid status transitions
export const STATUS_TRANSITIONS: Record<ShipmentStatus, ShipmentStatus[]> = {
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
