"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventSchema = exports.updateShipmentStatusSchema = exports.createShipmentSchema = exports.shipmentItemSchema = exports.warehouseSchema = exports.customerSchema = exports.loginSchema = exports.registerSchema = exports.paginationSchema = exports.addressSchema = void 0;
const zod_1 = require("zod");
exports.addressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1).max(500),
    city: zod_1.z.string().min(1).max(200),
    state: zod_1.z.string().min(1).max(200),
    zip: zod_1.z.string().min(1).max(20),
    country: zod_1.z.string().min(2).max(3).describe('ISO 3166-1 alpha-3'),
});
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    search: zod_1.z.string().optional(),
    sortBy: zod_1.z.string().optional(),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
});
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(128),
    firstName: zod_1.z.string().min(1).max(100),
    lastName: zod_1.z.string().min(1).max(100),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1),
});
exports.customerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255),
    company: zod_1.z.string().max(255).optional(),
    email: zod_1.z.string().email().optional().or(zod_1.z.literal('')),
    phone: zod_1.z.string().max(50).optional(),
    address: exports.addressSchema.optional(),
    taxId: zod_1.z.string().max(100).optional(),
    creditLimit: zod_1.z.number().min(0).optional(),
});
exports.warehouseSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(255),
    code: zod_1.z.string().min(1).max(20),
    address: exports.addressSchema,
    latitude: zod_1.z.number().min(-90).max(90).optional(),
    longitude: zod_1.z.number().min(-180).max(180).optional(),
    capacity: zod_1.z.number().int().min(0).optional(),
});
exports.shipmentItemSchema = zod_1.z.object({
    description: zod_1.z.string().min(1).max(500),
    quantity: zod_1.z.number().int().min(1),
    unitValue: zod_1.z.number().min(0).optional(),
    hsCode: zod_1.z.string().max(20).optional(),
    weight: zod_1.z.number().min(0).optional(),
});
exports.createShipmentSchema = zod_1.z.object({
    type: zod_1.z.enum(['EXPRESS', 'STANDARD', 'ECONOMY', 'FREIGHT']),
    customerId: zod_1.z.string().uuid(),
    carrierId: zod_1.z.string().uuid().optional(),
    originWarehouseId: zod_1.z.string().uuid().optional(),
    destWarehouseId: zod_1.z.string().uuid().optional(),
    originAddress: exports.addressSchema,
    destAddress: exports.addressSchema,
    estimatedDelivery: zod_1.z.string().datetime().optional(),
    weight: zod_1.z.number().min(0).optional(),
    dimensions: zod_1.z
        .object({
        length: zod_1.z.number().min(0),
        width: zod_1.z.number().min(0),
        height: zod_1.z.number().min(0),
        unit: zod_1.z.enum(['cm', 'in']),
    })
        .optional(),
    specialInstructions: zod_1.z.string().max(2000).optional(),
    items: zod_1.z.array(exports.shipmentItemSchema).min(1),
});
exports.updateShipmentStatusSchema = zod_1.z.object({
    status: zod_1.z.enum([
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
exports.createEventSchema = zod_1.z.object({
    eventType: zod_1.z.enum([
        'PICKED_UP',
        'DEPARTED',
        'ARRIVED',
        'CUSTOMS_HOLD',
        'OUT_FOR_DELIVERY',
        'DELIVERED',
        'EXCEPTION',
    ]),
    location: zod_1.z.string().max(255).optional(),
    latitude: zod_1.z.number().min(-90).max(90).optional(),
    longitude: zod_1.z.number().min(-180).max(180).optional(),
    notes: zod_1.z.string().max(2000).optional(),
});
//# sourceMappingURL=index.js.map