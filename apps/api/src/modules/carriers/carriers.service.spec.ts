import { describe, expect, it, vi } from 'vitest';
import { CarriersService } from './carriers.service';

describe('CarriersService', () => {
  const service = new CarriersService({
    carrier: {
      findMany: vi.fn().mockResolvedValue([{ id: '1', name: 'DHL', code: 'DHL' }]),
      findUnique: vi.fn().mockResolvedValue({ id: '1', name: 'DHL', code: 'DHL' }),
    },
  } as never);

  it('findAll returns carriers', async () => {
    await expect(service.findAll()).resolves.toHaveLength(1);
  });

  it('findById throws NotFoundException for unknown id', async () => {
    const failing = new CarriersService({
      carrier: { findUnique: vi.fn().mockResolvedValue(null) },
    } as never);
    await expect(failing.findById('missing')).rejects.toThrow('Carrier not found');
  });
});
