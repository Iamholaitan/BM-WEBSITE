'use client';

import { useMemo, useState } from 'react';
import type { ProductCategory } from '@/lib/products';
import { categoryLabels, products } from '@/lib/products';
import { ProductCard } from './product-card';

type Filter = 'all' | ProductCategory;

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'agro-commodities', label: categoryLabels['agro-commodities'] },
  { value: 'dried-food', label: categoryLabels['dried-food'] },
  { value: 'non-food', label: categoryLabels['non-food'] },
];

function isProductCategory(value: string | null): value is ProductCategory {
  return value === 'agro-commodities' || value === 'dried-food' || value === 'non-food';
}

export function ProductsFilter({ initialCategory }: { initialCategory?: string | null }) {
  const [active, setActive] = useState<Filter>(
    isProductCategory(initialCategory ?? null) ? (initialCategory as Filter) : 'all',
  );

  const visible = useMemo(
    () => (active === 'all' ? products : products.filter((p) => p.category === active)),
    [active],
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter products by category"
        className="flex flex-wrap justify-center gap-3"
      >
        {filters.map((f) => (
          <button
            key={f.value}
            role="tab"
            aria-selected={active === f.value}
            onClick={() => setActive(f.value)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              active === f.value
                ? 'bg-forest-900 text-white shadow-md shadow-forest-900/20'
                : 'border border-forest-200 bg-white text-forest-800 hover:bg-forest-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-ink-soft" aria-live="polite">
        Showing {visible.length} product{visible.length === 1 ? '' : 's'}
        {active !== 'all' && ` in ${categoryLabels[active]}`}
      </p>

      <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
