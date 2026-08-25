import Link from 'next/link';
import type { Product } from '@/lib/products';
import { CategoryChip, ProductVisual } from './product-visual';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-cream-300 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest-900/10">
      <ProductVisual product={product} className="h-44 w-full" iconSize="h-14 w-14" />
      <div className="flex flex-1 flex-col p-5">
        <CategoryChip category={product.category} />
        <h3 className="mt-3 font-display text-lg font-bold text-forest-900 group-hover:text-forest-700">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
          {product.short}
        </p>
        <div className="mt-5 flex items-center gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 rounded-lg border border-forest-200 px-3 py-2.5 text-center text-xs font-semibold text-forest-800 transition-colors hover:border-forest-400 hover:bg-forest-50"
          >
            View Product
          </Link>
          <Link
            href={`/request-quote?product=${encodeURIComponent(product.name)}`}
            className="flex-1 rounded-lg bg-forest-900 px-3 py-2.5 text-center text-xs font-semibold text-white transition-colors hover:bg-forest-700"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </article>
  );
}
