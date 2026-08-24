import { z } from 'zod';
export declare const addressSchema: z.ZodObject<{
    street: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    zip: z.ZodString;
    country: z.ZodString;
}, "strip", z.ZodTypeAny, {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}, {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}>;
export declare const paginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    search?: string | undefined;
    sortBy?: string | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}>;
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const customerSchema: z.ZodObject<{
    name: z.ZodString;
    company: z.ZodOptional<z.ZodString>;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    phone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        zip: z.ZodString;
        country: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    }, {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    }>>;
    taxId: z.ZodOptional<z.ZodString>;
    creditLimit: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email?: string | undefined;
    company?: string | undefined;
    phone?: string | undefined;
    address?: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    } | undefined;
    taxId?: string | undefined;
    creditLimit?: number | undefined;
}, {
    name: string;
    email?: string | undefined;
    company?: string | undefined;
    phone?: string | undefined;
    address?: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    } | undefined;
    taxId?: string | undefined;
    creditLimit?: number | undefined;
}>;
export declare const warehouseSchema: z.ZodObject<{
    name: z.ZodString;
    code: z.ZodString;
    address: z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        zip: z.ZodString;
        country: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    }, {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    }>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    capacity: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    code: string;
    name: string;
    address: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    latitude?: number | undefined;
    longitude?: number | undefined;
    capacity?: number | undefined;
}, {
    code: string;
    name: string;
    address: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    latitude?: number | undefined;
    longitude?: number | undefined;
    capacity?: number | undefined;
}>;
export declare const shipmentItemSchema: z.ZodObject<{
    description: z.ZodString;
    quantity: z.ZodNumber;
    unitValue: z.ZodOptional<z.ZodNumber>;
    hsCode: z.ZodOptional<z.ZodString>;
    weight: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    description: string;
    quantity: number;
    unitValue?: number | undefined;
    hsCode?: string | undefined;
    weight?: number | undefined;
}, {
    description: string;
    quantity: number;
    unitValue?: number | undefined;
    hsCode?: string | undefined;
    weight?: number | undefined;
}>;
export declare const createShipmentSchema: z.ZodObject<{
    type: z.ZodEnum<["EXPRESS", "STANDARD", "ECONOMY", "FREIGHT"]>;
    customerId: z.ZodString;
    carrierId: z.ZodOptional<z.ZodString>;
    originWarehouseId: z.ZodOptional<z.ZodString>;
    destWarehouseId: z.ZodOptional<z.ZodString>;
    originAddress: z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        zip: z.ZodString;
        country: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    }, {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    }>;
    destAddress: z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        zip: z.ZodString;
        country: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    }, {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    }>;
    estimatedDelivery: z.ZodOptional<z.ZodString>;
    weight: z.ZodOptional<z.ZodNumber>;
    dimensions: z.ZodOptional<z.ZodObject<{
        length: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
        unit: z.ZodEnum<["cm", "in"]>;
    }, "strip", z.ZodTypeAny, {
        length: number;
        width: number;
        height: number;
        unit: "cm" | "in";
    }, {
        length: number;
        width: number;
        height: number;
        unit: "cm" | "in";
    }>>;
    specialInstructions: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        description: z.ZodString;
        quantity: z.ZodNumber;
        unitValue: z.ZodOptional<z.ZodNumber>;
        hsCode: z.ZodOptional<z.ZodString>;
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        description: string;
        quantity: number;
        unitValue?: number | undefined;
        hsCode?: string | undefined;
        weight?: number | undefined;
    }, {
        description: string;
        quantity: number;
        unitValue?: number | undefined;
        hsCode?: string | undefined;
        weight?: number | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "EXPRESS" | "STANDARD" | "ECONOMY" | "FREIGHT";
    customerId: string;
    originAddress: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    destAddress: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    items: {
        description: string;
        quantity: number;
        unitValue?: number | undefined;
        hsCode?: string | undefined;
        weight?: number | undefined;
    }[];
    weight?: number | undefined;
    carrierId?: string | undefined;
    originWarehouseId?: string | undefined;
    destWarehouseId?: string | undefined;
    estimatedDelivery?: string | undefined;
    dimensions?: {
        length: number;
        width: number;
        height: number;
        unit: "cm" | "in";
    } | undefined;
    specialInstructions?: string | undefined;
}, {
    type: "EXPRESS" | "STANDARD" | "ECONOMY" | "FREIGHT";
    customerId: string;
    originAddress: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    destAddress: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    items: {
        description: string;
        quantity: number;
        unitValue?: number | undefined;
        hsCode?: string | undefined;
        weight?: number | undefined;
    }[];
    weight?: number | undefined;
    carrierId?: string | undefined;
    originWarehouseId?: string | undefined;
    destWarehouseId?: string | undefined;
    estimatedDelivery?: string | undefined;
    dimensions?: {
        length: number;
        width: number;
        height: number;
        unit: "cm" | "in";
    } | undefined;
    specialInstructions?: string | undefined;
}>;
export declare const updateShipmentStatusSchema: z.ZodObject<{
    status: z.ZodEnum<["CONFIRMED", "PICKED_UP", "IN_TRANSIT", "ARRIVED", "OUT_FOR_DELIVERY", "DELIVERED", "EXCEPTION", "CANCELLED"]>;
}, "strip", z.ZodTypeAny, {
    status: "CONFIRMED" | "PICKED_UP" | "IN_TRANSIT" | "ARRIVED" | "OUT_FOR_DELIVERY" | "DELIVERED" | "EXCEPTION" | "CANCELLED";
}, {
    status: "CONFIRMED" | "PICKED_UP" | "IN_TRANSIT" | "ARRIVED" | "OUT_FOR_DELIVERY" | "DELIVERED" | "EXCEPTION" | "CANCELLED";
}>;
export declare const createEventSchema: z.ZodObject<{
    eventType: z.ZodEnum<["PICKED_UP", "DEPARTED", "ARRIVED", "CUSTOMS_HOLD", "OUT_FOR_DELIVERY", "DELIVERED", "EXCEPTION"]>;
    location: z.ZodOptional<z.ZodString>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    eventType: "PICKED_UP" | "ARRIVED" | "OUT_FOR_DELIVERY" | "DELIVERED" | "EXCEPTION" | "DEPARTED" | "CUSTOMS_HOLD";
    latitude?: number | undefined;
    longitude?: number | undefined;
    location?: string | undefined;
    notes?: string | undefined;
}, {
    eventType: "PICKED_UP" | "ARRIVED" | "OUT_FOR_DELIVERY" | "DELIVERED" | "EXCEPTION" | "DEPARTED" | "CUSTOMS_HOLD";
    latitude?: number | undefined;
    longitude?: number | undefined;
    location?: string | undefined;
    notes?: string | undefined;
}>;
//# sourceMappingURL=index.d.ts.map