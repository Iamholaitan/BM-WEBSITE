import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductsFilter } from '@/components/marketing/products-filter';
import { CtaBanner } from '@/components/marketing/cta-banner';
import { Reveal } from '@/components/marketing/reveal';

export const metadata: Metadata = {
  title: 'Our Products — Nigerian Agricultural Commodities & Dried Foods for Export',
  description:
    'Explore Nigerian agricultural commodities, dried food products and non-food commodities available for bulk supply and international export — hibiscus, cashew, sesame, ginger, cocoa, charcoal, shea butter and more.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest-950 py-20 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-950 to-black" />
        <div aria-hidden="true" className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-x relative text-center">
          <Reveal>
            <p className="eyebrow !text-gold-300">Product Catalogue</p>
            <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold text-white sm:text-5xl">
              Our Products
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream-300/85 sm:text-lg">
              Explore our range of Nigerian agricultural commodities, dried food products, and
              non-food commodities available for bulk supply and international export.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <ProductsFilter />
          <Reveal className="mt-14 rounded-xl border border-forest-100 bg-cream-50 p-6 text-center sm:p-8">
            <p className="text-sm leading-relaxed text-ink-soft">
              Can&apos;t find what you&apos;re looking for? We source to requirement —{' '}
              <Link href="/request-quote" className="font-semibold text-forest-700 underline decoration-gold-500 underline-offset-4 hover:text-forest-900">
                send us your specification
              </Link>{' '}
              or browse our{' '}
              <Link href="/40ft-container-supply" className="font-semibold text-forest-700 underline decoration-gold-500 underline-offset-4 hover:text-forest-900">
                40ft container supply options
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
