import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  Box,
  CheckCircle2,
  FileCheck,
  Globe2,
  Info,
  Package,
  Ship,
} from 'lucide-react';
import {
  categoryLabels,
  getProduct,
  getProductsByCategory,
  products,
} from '@/lib/products';
import { whatsappLink } from '@/lib/site';
import { CategoryChip, ProductVisual } from '@/components/marketing/product-visual';
import { ProductCard } from '@/components/marketing/product-card';
import { WhatsAppIcon } from '@/components/marketing/whatsapp-icon';
import { Reveal } from '@/components/marketing/reveal';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} Supplier Nigeria | Bulk Export — ${categoryLabels[product.category]}`,
    description: `${product.tagline}. ${product.short}`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} — Nigerian Export Supplier | BM Global Investment`,
      description: product.short,
    },
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const details = [
    { icon: Globe2, label: 'Origin', value: 'Nigeria' },
    { icon: Box, label: 'Product Category', value: categoryLabels[product.category] },
    { icon: Package, label: 'Available Forms', value: product.forms.join(', ') },
    { icon: Package, label: 'Packaging Options', value: product.packaging.join('; ') },
    { icon: CheckCircle2, label: 'Bulk Availability', value: 'Available for bulk supply — quantity confirmed per enquiry' },
    { icon: Info, label: 'Quality Specifications', value: '[TO BE CONFIRMED — shared on request according to buyer requirements]' },
    { icon: Info, label: 'Minimum Order Quantity', value: '[TO BE CONFIRMED]' },
    { icon: Ship, label: 'Shipping Options', value: 'Sea freight (FCL/LCL); air freight where applicable' },
    { icon: ContainerIcon, label: 'Container Loading', value: '40ft / 20ft container loading coordinated to buyer requirement' },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-cream-300 bg-cream-100">
        <ol className="container-x flex flex-wrap items-center gap-2 py-3.5 text-xs text-ink-soft">
          <li><Link href="/" className="hover:text-forest-800">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/products" className="hover:text-forest-800">Products</Link></li>
          <li aria-hidden="true">/</li>
          <li className="font-semibold text-forest-900">{product.name}</li>
        </ol>
      </nav>

      <section className="bg-white py-14 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Visual */}
          <Reveal>
            <div className="sticky top-28">
              <ProductVisual
                product={product}
                className="aspect-square w-full rounded-2xl shadow-xl shadow-forest-900/10"
                iconSize="h-32 w-32"
              />
              <p className="mt-3 text-center text-xs text-ink-soft/70">
                {product.image ? 'Product photograph.' : 'Photograph showing by request.'}
              </p>
            </div>
          </Reveal>

          {/* Info */}
          <Reveal delay={100}>
            <CategoryChip category={product.category} />
            <h1 className="mt-4 font-display text-3xl font-bold text-forest-900 sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 font-display text-lg italic text-forest-600">{product.tagline}</p>
            <p className="mt-6 leading-relaxed text-ink-soft">{product.description}</p>

            <dl className="mt-8 divide-y divide-cream-200 overflow-hidden rounded-xl border border-cream-300 bg-cream-50">
              {details.map((d) => (
                <div key={d.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[190px_1fr] sm:gap-4 sm:px-6">
                  <dt className="flex items-center gap-2.5 text-sm font-semibold text-forest-900">
                    <d.icon className="h-4 w-4 shrink-0 text-gold-600" strokeWidth={1.75} />
                    {d.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-ink-soft">{d.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={`/request-quote?product=${encodeURIComponent(product.name)}`}
                className="btn-primary flex-1 !py-4 text-base"
              >
                Request a Quote for {product.name} →
              </Link>
              <a
                href={whatsappLink(
                  `Hello BM Global Investment, I am interested in ${product.name}. Please share availability and terms.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#1fb857] sm:flex-initial"
              >
                <WhatsAppIcon /> Discuss This Product on WhatsApp
              </a>
            </div>

            <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-ink-soft/70">
              <FileCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Specifications, minimum order quantities and packing details are confirmed per
              enquiry according to your requirements.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-cream-100 py-16 sm:py-20">
          <div className="container-x">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-bold text-forest-900 sm:text-3xl">
                More {categoryLabels[product.category]}
              </h2>
              <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-forest-700 hover:text-forest-900">
                View all products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function ContainerIcon(props: React.SVGProps<SVGSVGElement>) {
  // Local minimal container icon to avoid extra dependency weight in detail rows
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="7" width="18" height="10" rx="1" />
      <path d="M7 7v10M11 7v10M15 7v10M19 7v10" />
    </svg>
  );
}
