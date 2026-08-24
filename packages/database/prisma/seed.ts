import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPasswordHash = await bcrypt.hash('Admin123!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@bm-global.com' },
    update: {},
    create: {
      email: 'admin@bm-global.com',
      passwordHash: adminPasswordHash,
      firstName: 'System',
      lastName: 'Admin',
      role: UserRole.ADMIN,
    },
  });
  console.log(`Created admin user: ${admin.email}`);

  // Create manager user
  const managerPasswordHash = await bcrypt.hash('Manager123!', 12);
  const manager = await prisma.user.upsert({
    where: { email: 'manager@bm-global.com' },
    update: {},
    create: {
      email: 'manager@bm-global.com',
      passwordHash: managerPasswordHash,
      firstName: 'John',
      lastName: 'Manager',
      role: UserRole.MANAGER,
    },
  });
  console.log(`Created manager user: ${manager.email}`);

  // Create operator user
  const operatorPasswordHash = await bcrypt.hash('Operator123!', 12);
  await prisma.user.upsert({
    where: { email: 'operator@bm-global.com' },
    update: {},
    create: {
      email: 'operator@bm-global.com',
      passwordHash: operatorPasswordHash,
      firstName: 'Jane',
      lastName: 'Operator',
      role: UserRole.OPERATOR,
    },
  });

  // Create sample warehouses
  const warehouses = await Promise.all([
    prisma.warehouse.upsert({
      where: { code: 'NYC-01' },
      update: {},
      create: {
        name: 'New York Distribution Center',
        code: 'NYC-01',
        address: {
          street: '100 Industrial Ave',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          country: 'USA',
        },
        latitude: 40.7128,
        longitude: -74.006,
        capacity: 50000,
      },
    }),
    prisma.warehouse.upsert({
      where: { code: 'LAX-01' },
      update: {},
      create: {
        name: 'Los Angeles Distribution Center',
        code: 'LAX-01',
        address: {
          street: '200 Logistics Blvd',
          city: 'Los Angeles',
          state: 'CA',
          zip: '90001',
          country: 'USA',
        },
        latitude: 33.9425,
        longitude: -118.2551,
        capacity: 75000,
      },
    }),
    prisma.warehouse.upsert({
      where: { code: 'LHR-01' },
      update: {},
      create: {
        name: 'London Hub',
        code: 'LHR-01',
        address: {
          street: '50 Heathrow Way',
          city: 'London',
          state: 'Greater London',
          zip: 'TW6 2GA',
          country: 'GBR',
        },
        latitude: 51.47,
        longitude: -0.4543,
        capacity: 30000,
      },
    }),
  ]);
  console.log(`Created ${warehouses.length} warehouses`);

  // Create sample carriers
  const carriers = await Promise.all([
    prisma.carrier.upsert({
      where: { code: 'DHL' },
      update: {},
      create: { name: 'DHL Express', code: 'DHL' },
    }),
    prisma.carrier.upsert({
      where: { code: 'FEDEX' },
      update: {},
      create: { name: 'FedEx', code: 'FEDEX' },
    }),
    prisma.carrier.upsert({
      where: { code: 'UPS' },
      update: {},
      create: { name: 'UPS', code: 'UPS' },
    }),
    prisma.carrier.upsert({
      where: { code: 'MAERSK' },
      update: {},
      create: { name: 'Maersk Line', code: 'MAERSK' },
    }),
  ]);
  console.log(`Created ${carriers.length} carriers`);

  // Create sample customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: 'Acme Corporation',
        company: 'Acme Corp',
        email: 'orders@acme.com',
        phone: '+1-555-0100',
        address: {
          street: '123 Business Park',
          city: 'Chicago',
          state: 'IL',
          zip: '60601',
          country: 'USA',
        },
        taxId: 'US-123456789',
        creditLimit: 50000,
        createdBy: admin.id,
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Global Trading Ltd',
        company: 'Global Trading',
        email: 'logistics@globaltrading.co.uk',
        phone: '+44-20-7946-0958',
        address: {
          street: '45 Commerce Street',
          city: 'London',
          state: 'England',
          zip: 'EC2V 6AD',
          country: 'GBR',
        },
        taxId: 'GB-987654321',
        creditLimit: 75000,
        createdBy: admin.id,
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Pacific Rim Imports',
        company: 'PRI Inc',
        email: 'ship@pacificrim.com',
        phone: '+1-555-0200',
        address: {
          street: '789 Harbor Drive',
          city: 'San Francisco',
          state: 'CA',
          zip: '94105',
          country: 'USA',
        },
        taxId: 'US-456789123',
        creditLimit: 100000,
        createdBy: admin.id,
      },
    }),
  ]);
  console.log(`Created ${customers.length} customers`);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
