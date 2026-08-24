export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: Address;
  taxId?: string;
  creditLimit?: number;
  isActive: boolean;
  createdAt: string;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  address: Address;
  latitude?: number;
  longitude?: number;
  capacity?: number;
  isActive: boolean;
}

export interface Carrier {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
}

export interface ShipmentItem {
  id?: string;
  description: string;
  quantity: number;
  unitValue?: number;
  hsCode?: string;
  weight?: number;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  status: string;
  type: string;
  customerId: string;
  customer?: Customer;
  carrierId?: string;
  carrier?: Carrier;
  originAddress: Address;
  destAddress: Address;
  estimatedDelivery?: string;
  actualDelivery?: string;
  weight?: number;
  specialInstructions?: string;
  items?: ShipmentItem[];
  events?: ShipmentEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface ShipmentEvent {
  id: string;
  eventType: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  notes?: string;
  recordedAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customer?: Customer;
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  dueDate: string;
  paidAt?: string;
  lines?: InvoiceLine[];
  createdAt: string;
}

export interface InvoiceLine {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  shipmentId?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
