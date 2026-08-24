import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CustomersModule } from './modules/customers/customers.module';
import { WarehousesModule } from './modules/warehouses/warehouses.module';
import { CarriersModule } from './modules/carriers/carriers.module';
import { ShipmentsModule } from './modules/shipments/shipments.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { BillingModule } from './modules/billing/billing.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    PrismaModule,
    AuthModule,
    UsersModule,
    CustomersModule,
    WarehousesModule,
    CarriersModule,
    ShipmentsModule,
    TrackingModule,
    BillingModule,
    DocumentsModule,
    ReportsModule,
  ],
})
export class AppModule {}
