import { z } from 'zod';

export const addressSchema = z.object({
  street: z.string().min(1).max(500),
  city: z.string().min(1).max(200),
  state: z.string().min(1).max(200),
  zip: z.string().min(1).max(20),
  country: z.string().min(2).max(3).describe('ISO 3166-1 alpha-3'),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const customerSchema = z.object({
  name: z.string().min(1).max(255),
  company: z.string().max(255).optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().max(50).optional(),
  address: addressSchema.optional(),
  taxId: z.string().max(100).optional(),
  creditLimit: z.number().min(0).optional(),
});

export const warehouseSchema = z.object({
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(20),
  address: addressSchema,
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  capacity: z.number().int().min(0).optional(),
});

export const shipmentItemSchema = z.object({
  description: z.string().min(1).max(500),
  quantity: z.number().int().min(1),
  unitValue: z.number().min(0).optional(),
  hsCode: z.string().max(20).optional(),
  weight: z.number().min(0).optional(),
});

export const createShipmentSchema = z.object({
  type: z.enum(['EXPRESS', 'STANDARD', 'ECONOMY', 'FREIGHT']),
  customerId: z.string().uuid(),
  carrierId: z.string().uuid().optional(),
  originWarehouseId: z.string().uuid().optional(),
  destWarehouseId: z.string().uuid().optional(),
  originAddress: addressSchema,
  destAddress: addressSchema,
  estimatedDelivery: z.string().datetime().optional(),
  weight: z.number().min(0).optional(),
  dimensions: z
    .object({
      length: z.number().min(0),
      width: z.number().min(0),
      height: z.number().min(0),
      unit: z.enum(['cm', 'in']),
    })
    .optional(),
  specialInstructions: z.string().max(2000).optional(),
  items: z.array(shipmentItemSchema).min(1),
});

export const updateShipmentStatusSchema = z.object({
  status: z.enum([
    'CONFIRMED',
    'PICKED_UP',
    'IN_TRANSIT',
    'ARRIVED',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'EXCEPTION',
    'CANCELLED',
  ]),
});

export const createEventSchema = z.object({
  eventType: z.enum([
    'PICKED_UP',
    'DEPARTED',
    'ARRIVED',
    'CUSTOMS_HOLD',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'EXCEPTION',
  ]),
  location: z.string().max(255).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  notes: z.string().max(2000).optional(),
});
