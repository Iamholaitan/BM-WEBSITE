import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Boxes,
  ClipboardCheck,
  Container,
  FileCheck,
  Globe2,
  Handshake,
  Leaf,
  Package,
  PackageCheck,
  Ship,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  Users,
} from 'lucide-react';
import { featuredProducts } from '@/lib/products';
import { whatsappLink } from '@/lib/site';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Reveal } from '@/components/marketing/reveal';
import { ProductCard } from '@/components/marketing/product-card';
import { WhatsAppIcon } from '@/components/marketing/whatsapp-icon';
import { CtaBanner } from '@/components/marketing/cta-banner';

export const metadata: Metadata = {
  title: 'Nigerian Agro-Commodity Export Company | Bulk Supply Worldwide',
  description:
    "BM Global Investment sources, processes, packages and exports premium Nigerian agricultural commodities in bulk — hibiscus, cashew, sesame, ginger and more. From Nigeria's farms to the world.",
  alternates: { canonical: '/' },
};

const trustItems = [
  { stat: '100%', label: 'Quality Focused', icon: BadgeCheck },
  { stat: 'Bulk', label: 'Container Supply', icon: Container },
  { stat: 'Global', label: 'Export Markets', icon: Globe2 },
  { stat: 'Custom', label: 'Packaging Options', icon: Package },
  { stat: 'Reliable', label: 'Export Logistics', icon: Truck },
];

const benefits = [
  {
    icon: Leaf,
    title: 'Nigerian Sourcing Network',
    text: 'Access to agricultural commodities from farming regions across Nigeria through our established supply network.',
  },
  {
    icon: Boxes,
    title: 'Bulk Supply',
    text: 'Supply structured for wholesale and commercial requirements — from sizeable orders to full container loads.',
  },
  {
    icon: Package,
    title: 'Flexible Packaging',
    text: 'Packaging arranged based on agreed buyer specifications, from standard bags to custom export packing.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Focus',
    text: 'Quality checks throughout sourcing, cleaning, grading, and preparation before shipment.',
  },
  {
    icon: FileCheck,
    title: 'Export Support',
    text: 'Support with export preparation, documentation, and the requirements of international trade.',
  },
  {
    icon: Truck,
    title: 'Logistics Coordination',
    text: 'Coordination of container loading, shipping arrangements, and delivery requirements.',
  },
];

const buyerTypes = [
  { icon: Ship, label: 'Importers' },
  { icon: Handshake, label: 'Distributors' },
  { icon: Boxes, label: 'Wholesalers' },
  { icon: Package, label: 'Food Manufacturers' },
  { icon: Store, label: 'Retailers' },
  { icon: Globe2, label: 'Commodity Traders' },
  { icon: Users, label: 'Restaurants & Food Businesses' },
];

const processSteps = [
  { title: 'Submit Your Requirement', text: 'Share your product, quantity, packaging, destination, and specifications.' },
  { title: 'Product Sourcing', text: 'We source the required commodity through our Nigerian supply network.' },
  { title: 'Quality Inspection', text: 'Products are inspected, cleaned, sorted, and graded to applicable requirements.' },
  { title: 'Processing & Packaging', text: 'Products are prepared and packaged according to agreed specifications.' },
  { title: 'Container Loading', text: 'Products are professionally loaded and prepared for shipment.' },
  { title: 'Export Documentation', text: 'Required export and shipping documentation is coordinated.' },
  { title: 'Shipping & Logistics', text: 'Cargo is handed over for international shipment and logistics coordination.' },
  { title: 'Delivery', text: 'Shipment proceeds to your destination port.' },
];

const qaPoints = [
  { icon: ClipboardCheck, title: 'Product Selection', text: 'Careful sourcing and supplier selection across producing regions.' },
  { icon: ShieldCheck, title: 'Inspection', text: 'Products are inspected before processing and prior to shipment.' },
  { icon: Sparkles, title: 'Cleaning & Sorting', text: 'Prepared to meet agreed buyer requirements.' },
  { icon: PackageCheck, title: 'Packaging', text: 'Arranged according to buyer specifications.' },
  { icon: FileCheck, title: 'Documentation', text: 'Export and shipment documentation coordinated appropriately.' },
  { icon: Award, title: 'Traceability', text: 'Where applicable, traceability through the sourcing and preparation process.' },
];

const routes = ['Nigeria', 'Africa', 'Europe', 'Middle East', 'Asia', 'North America'];

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BM Global Investment',
    url: 'https://bmglobalinvestment.com',
    description:
      'Nigerian agro-commodity sourcing and export company supplying quality agricultural commodities and food products in bulk to international buyers.',
    slogan: "From Nigeria's Farms to the World",
    address: { '@type': 'PostalAddress', addressCountry: 'NG' },
    areaServed: 'Worldwide',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-forest-950">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-950 to-black" />
        <div aria-hidden="true" className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-gold-500/10 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-48 -left-32 h-[30rem] w-[30rem] rounded-full bg-forest-500/20 blur-3xl" />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 35%, white 1.5px, transparent 1.5px)',
            backgroundSize: '42px 42px',
          }}
        />

        <div className="container-x relative grid gap-14 py-20 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
                🌍 From Nigeria&apos;s Farms to the World
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[3.4rem]">
                Premium Nigerian Agro-Commodities,{' '}
                <span className="text-gold-400">Delivered Worldwide</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-cream-300/90">
                Sourcing • Processing • Packaging • Export • Logistics
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-cream-300/85 sm:text-lg">
                We supply quality Nigerian agricultural commodities and food products in bulk,
                packed according to your specifications and shipped worldwide.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link href="/request-quote" className="btn-gold !px-8 !py-3.5 text-base">
                  Request a Quote →
                </Link>
                <Link href="/products" className="btn-outline-light !px-8 !py-3.5 text-base">
                  Explore Our Commodities
                </Link>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#1fb857]"
                >
                  <WhatsAppIcon /> Chat on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          {/* Route indicator card */}
          <Reveal delay={320}>
            <div className="relative mx-auto w-full max-w-md">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/40 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-cream-300/70">
                  <span>Live Trade Corridor</span>
                  <Ship className="h-4 w-4 text-gold-400" />
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/20 ring-1 ring-gold-400/50">
                      <Leaf className="h-6 w-6 text-gold-300" />
                    </div>
                    <p className="mt-3 font-display text-lg font-bold text-white">Nigeria</p>
                    <p className="text-[11px] uppercase tracking-wider text-cream-300/60">Origin</p>
                  </div>

                  <div className="mx-3 flex-1" aria-hidden="true">
                    <svg viewBox="0 0 120 24" fill="none" className="w-full">
                      <path d="M2 12 H104" stroke="#c9a227" strokeWidth="1.5" strokeDasharray="5 5" className="animate-pulse" />
                      <path d="M96 5 L106 12 L96 19" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <circle cx="60" cy="12" r="3" fill="#c9a227" />
                    </svg>
                  </div>

                  <div className="text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-500/25 ring-1 ring-forest-300/50">
                      <Globe2 className="h-6 w-6 text-forest-200" />
                    </div>
                    <p className="mt-3 font-display text-lg font-bold text-white">Global</p>
                    <p className="text-[11px] uppercase tracking-wider text-cream-300/60">Markets</p>
                  </div>
                </div>
                <div className="mt-7 space-y-2.5 border-t border-white/10 pt-6 text-sm text-cream-200/90">
                  {['Farmer & aggregator networks', 'Cleaning, grading & packaging', 'Container loading & shipping'].map((t) => (
                    <p key={t} className="flex items-center gap-2.5">
                      <BadgeCheck className="h-4 w-4 shrink-0 text-gold-400" /> {t}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── TRUST STRIP ──────────────────────────────────────────── */}
      <section aria-label="Why buyers trust BM Global Investment" className="border-b border-cream-300 bg-white">
        <div className="container-x grid grid-cols-2 gap-y-10 py-12 sm:grid-cols-3 lg:grid-cols-5">
          {trustItems.map((item, i) => (
            <Reveal key={item.label} delay={i * 70} className="text-center">
              <item.icon className="mx-auto h-7 w-7 text-gold-600" strokeWidth={1.75} />
              <p className="mt-3 font-display text-2xl font-bold text-forest-900">{item.stat}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-soft">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ────────────────────────────────────────────────── */}
      <section className="bg-cream-100 py-20 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative">
              <div className="flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-forest-800 via-forest-700 to-forest-500 p-8 shadow-xl shadow-forest-900/15 sm:p-10">
                <div aria-hidden="true" className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, white 2px, transparent 2px)', backgroundSize: '36px 36px' }} />
                <Leaf className="h-12 w-12 text-gold-300" strokeWidth={1.25} />
                <div>
                  <p className="font-display text-3xl font-bold leading-snug text-white sm:text-4xl">
                    Connecting Nigeria&apos;s Agricultural Wealth to Global Markets
                  </p>
                  <p className="mt-3 text-sm uppercase tracking-[0.2em] text-gold-300">
                    Nigeria → The World
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-4 hidden rounded-xl border border-cream-300 bg-white px-6 py-4 shadow-lg sm:block">
                <p className="font-display text-xl font-bold text-forest-900">Bulk Export</p>
                <p className="text-xs uppercase tracking-wider text-ink-soft">Container-Ready Supply</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow">About BM Global Investment</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-forest-900 sm:text-4xl">
              Your Partner for Nigerian Agro-Commodities
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
              <p>
                BM Global Investment is a Nigerian agro-commodity sourcing and export company
                focused on connecting quality agricultural products from Nigeria with buyers
                across international markets.
              </p>
              <p>
                We work with farmers, processors, aggregators, logistics partners, and other
                supply-chain stakeholders to source and prepare agricultural commodities for
                bulk export.
              </p>
              <p>
                Our approach combines local sourcing knowledge with professional quality control,
                packaging, documentation, and logistics coordination.
              </p>
            </div>
            <Link href="/about" className="btn-primary mt-8">
              Learn More About Us <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── FEATURED COMMODITIES ─────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Featured Commodities"
            title="Our Agricultural Commodities"
            subtitle="Quality Nigerian Products. Prepared for Global Markets."
          />
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product, i) => (
              <Reveal key={product.slug} delay={i * 60}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Link href="/products" className="btn-outline !px-8">
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── PRODUCT CATEGORIES ───────────────────────────────────── */}
      <section className="bg-cream-100 py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Product Categories"
            title="Three Ways We Serve Your Supply Chain"
            subtitle="From raw agro commodities to dried foods and non-food products — all prepared for bulk international supply."
          />
          <div className="grid gap-7 md:grid-cols-3">
            {[
              {
                title: 'Agro Commodities',
                count: 10,
                text: 'Hibiscus, cashew nuts, sesame seeds, ginger, shea nuts, tiger nuts, cocoa, soybeans, groundnuts and moringa.',
                href: '/products?category=agro-commodities',
                cls: 'from-forest-800 via-forest-700 to-forest-500',
              },
              {
                title: 'Dried Food Products',
                count: 12,
                text: 'Dried pepper, onion, garlic, ginger, vegetables, okra, crayfish, beans, rice, uziza, bitter kola and yam.',
                href: '/products?category=dried-food',
                cls: 'from-[#7c2d12] via-[#b45309] to-[#ca8a04]',
              },
              {
                title: 'Non-Food Commodities',
                count: 5,
                text: 'Charcoal, palm kernel, shea butter, palm kernel shell and coconut shell.',
                href: '/products?category=non-food',
                cls: 'from-neutral-900 via-neutral-700 to-neutral-500',
              },
            ].map((cat, i) => (
              <Reveal key={cat.title} delay={i * 90}>
                <Link
                  href={cat.href}
                  className={`group relative flex h-full min-h-[260px] flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br ${cat.cls} p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
                >
                  <div aria-hidden="true" className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }} />
                  <span className="absolute right-6 top-6 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {cat.count} products
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white">{cat.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">{cat.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-300 transition-transform group-hover:translate-x-1">
                    Browse Category <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Built for Serious International Buyers"
            subtitle="Six reasons importers, distributors and manufacturers choose BM Global Investment as their Nigerian sourcing partner."
          />
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 60}>
                <div className="group h-full rounded-xl border border-cream-300 bg-cream-50 p-7 transition-all duration-300 hover:border-forest-200 hover:bg-white hover:shadow-lg hover:shadow-forest-900/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-forest-900 transition-colors group-hover:bg-gold-500">
                    <b.icon className="h-6 w-6 text-gold-400 transition-colors group-hover:text-forest-900" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-forest-900">{b.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GLOBAL BUYERS ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-forest-950 py-20 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-forest-900 via-forest-950 to-black" />
        <div aria-hidden="true" className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-x relative">
          <SectionHeading
            dark
            eyebrow="Who We Serve"
            title="Built for Global Buyers"
            subtitle="Whether you are a food manufacturer, distributor, wholesaler, retailer, commodity trader, or importer, BM Global Investment can help you source Nigerian agricultural products for your market."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
            {buyerTypes.map((b, i) => (
              <Reveal key={b.label} delay={i * 50}>
                <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-6 text-center backdrop-blur-sm transition-colors hover:bg-white/10">
                  <b.icon className="h-6 w-6 text-gold-400" strokeWidth={1.5} />
                  <span className="text-xs font-medium leading-snug text-cream-200">{b.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Link href="/request-quote" className="btn-gold !px-8">
              Discuss Your Requirement <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── 40FT CONTAINER TEASER ────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Bulk Supply"
            title="40ft Container Supply"
            subtitle="BM Global Investment coordinates bulk commodity sourcing, preparation, packaging, loading, documentation, and shipping — ready for container export."
          />
          <Reveal>
            <ol className="flex flex-wrap items-stretch justify-center gap-3" aria-label="Supply chain stages">
              {['Sourcing', 'Processing', 'Packaging', 'Container Loading', 'Port', 'International Delivery'].map(
                (stage, i, arr) => (
                  <li key={stage} className="flex items-center gap-3">
                    <span className="flex items-center gap-2.5 rounded-lg border border-forest-100 bg-cream-50 px-4 py-3 text-sm font-semibold text-forest-900">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-900 text-[11px] font-bold text-gold-400">
                        {i + 1}
                      </span>
                      {stage}
                    </span>
                    {i < arr.length - 1 && <ArrowRight className="hidden h-4 w-4 shrink-0 text-gold-600 md:block" aria-hidden="true" />}
                  </li>
                ),
              )}
            </ol>
          </Reveal>
          <Reveal className="mt-12 text-center">
            <Link href="/40ft-container-supply" className="btn-primary !px-8">
              Explore 40ft Container Supply <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── EXPORT PROCESS PREVIEW ───────────────────────────────── */}
      <section className="bg-cream-100 py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="How It Works"
            title="A Clear, Professional Export Process"
            subtitle="Eight structured steps from your first enquiry to delivery — so you always know what happens next."
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.slice(0, 4).map((step, i) => (
              <Reveal key={step.title} delay={i * 70}>
                <li className="h-full rounded-xl border border-cream-300 bg-white p-6 shadow-sm">
                  <span className="font-display text-4xl font-bold text-gold-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-forest-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-10 text-center">
            <Link href="/export-process" className="btn-outline !px-8">
              View All 8 Steps <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── QUALITY + LOGISTICS ──────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Quality Assurance"
              title="Quality From Source to Shipment"
            />
            <ul className="-mt-4 space-y-5">
              {qaPoints.map((q, i) => (
                <Reveal key={q.title} delay={i * 50}>
                  <li className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-50">
                      <q.icon className="h-5 w-5 text-forest-700" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-forest-900">{q.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{q.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-8">
              <Link href="/quality-assurance" className="btn-outline">
                Read Our Quality Approach <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Shipping & Logistics"
              title="Coordinating Cargo From Nigeria Outward"
            />
            <Reveal delay={80}>
              <div className="rounded-2xl border border-cream-300 bg-cream-50 p-7 sm:p-9">
                <p className="text-sm leading-relaxed text-ink-soft">
                  Serving buyers across international markets. We coordinate container loading,
                  port operations, export documentation, freight coordination, shipping
                  arrangements, cargo handling, and destination coordination.
                </p>
                <ol className="mt-7 space-y-0" aria-label="Trade lanes">
                  {routes.map((r, i) => (
                    <li key={r} className="flex items-center gap-3">
                      <span className="flex flex-col items-center" aria-hidden="true">
                        <span className={`h-3 w-3 rounded-full ${i === 0 ? 'bg-gold-500' : 'bg-forest-600'}`} />
                        {i < routes.length - 1 && <span className="h-7 w-px bg-forest-200" />}
                      </span>
                      <span className={`pb-1 text-sm font-medium ${i === 0 ? 'font-bold text-forest-900' : 'text-ink-soft'}`}>
                        {r}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal className="mt-8" delay={120}>
              <Link href="/logistics" className="btn-outline">
                Explore Shipping &amp; Logistics <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── COMPANY PROFILE ──────────────────────────────────────── */}
      <section className="border-y border-cream-300 bg-cream-100 py-16">
        <div className="container-x flex flex-col items-center justify-between gap-8 lg:flex-row">
          <Reveal>
            <p className="eyebrow">Company Profile</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-forest-900 sm:text-3xl">
              Everything You Need to Know — In One Document
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Who we are · What we supply · What we do · Our export process · Quality commitment ·
              Logistics capability · Why choose BM Global Investment · Contact information.
            </p>
          </Reveal>
          <Reveal delay={100} className="shrink-0">
            <a
              href="/profile/bm-global-investment-company-profile.pdf"
              download
              className="btn-primary !px-8 inline-flex items-center gap-2"
            >
              <FileCheck className="h-4 w-4" /> Download Company Profile
            </a>
            <p className="mt-3 max-w-[240px] text-center text-[11px] leading-snug text-ink-soft/70 lg:max-w-none lg:text-left">
              Placeholder link — connect your PDF at <code className="font-mono">/public/profile/</code>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────── */}
      <CtaBanner />
    </>
  );
}
