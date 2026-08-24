import { ShipmentStatus, ShipmentType, UserRole } from '../enums';
export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}
export interface Dimensions {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
}
export interface PaginationQuery {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
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
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    details?: unknown;
}
export interface JwtPayload {
    sub: string;
    email: string;
    role: UserRole;
}
export interface DashboardStats {
    totalShipments: number;
    activeShipments: number;
    deliveredShipments: number;
    totalCustomers: number;
    totalRevenue: number;
    pendingInvoices: number;
    shipmentsByStatus: Record<ShipmentStatus, number>;
    shipmentsByType: Record<ShipmentType, number>;
    recentShipments: any[];
    revenueByMonth: {
        month: string;
        revenue: number;
    }[];
}
//# sourceMappingURL=index.d.ts.map