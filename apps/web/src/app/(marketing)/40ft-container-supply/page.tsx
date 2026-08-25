import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Anchor,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Container,
  FileCheck,
  Package,
  Settings2,
  Ship,
  Truck,
} from 'lucide-react';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Reveal } from '@/components/marketing/reveal';
import { WhatsAppIcon } from '@/components/marketing/whatsapp-icon';
import { whatsappLink } from '@/lib/site';

export const metadata: Metadata = {
  title: '40ft Container Supply — Bulk Nigerian Agro-Commodities for Export',
  description:
    'Bulk agricultural commodities ready for container export. BM Global Investment coordinates sourcing, processing, packaging, 40ft container loading, documentation and shipping to international buyers.',
  alternates: { canonical: '/40ft-container-supply' },
};

const stages = [
  { label: 'Sourcing', icon: Boxes },
  { label: 'Processing', icon: Settings2 },
  { label: 'Packaging', icon: Package },
  { label: 'Container Loading', icon: Container },
  { label: 'Port', icon: Anchor },
  { label: 'International Delivery', icon: Ship },
];

const options = [
  {
    icon: Container,
    title: '40ft Container Supply',
    text: 'Full container load (FCL) consignments of Nigerian commodities prepared and loaded for international shipment.',
  },
  {
    icon: Settings2,
    title: 'Custom Loading Requirements',
    text: 'Loading plans arranged around your product mix, stacking, weight distribution, and handling requirements.',
  },
  {
    icon: Package,
    title: 'Bulk Packaging',
    text: 'Standard bulk bag formats for high-volume commodity movement.',
  },
  {
    icon: CheckCircle2,
    title: 'Buyer-Specified Packaging',
    text: 'Packaging arranged according to your specifications — bag sizes, materials, labelling, and branding.',
  },
  {
    icon: Boxes,
    title: 'Product-Specific Loading',
    text: 'Loading approaches adapted to each commodity\'s characteristics and destination requirements.',
  },
  {
    icon: FileCheck,
    title: 'Export Documentation',
    text: 'Required export and shipping documentation coordinated as part of the consignment.',
  },
  {
    icon: Ship,
    title: 'Shipping Coordination',
    text: 'Freight and shipping arrangements coordinated through trusted logistics partners.',
  },
];

export default function ContainerSupplyPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest-950 py-20 sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-950 to-black" />
        <div aria-hidden="true" className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-x relative text-center">
          <Reveal>
            <p className="eyebrow !text-gold-300">For Serious Bulk Buyers</p>
            <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Bulk Agricultural Commodities —{' '}
              <span className="text-gold-400">Ready for Container Export</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-cream-300/85 sm:text-lg">
              BM Global Investment coordinates bulk commodity sourcing, preparation, packaging,
              loading, documentation, and shipping — giving international buyers a single
              accountable partner from Nigerian farms to their destination port.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/request-quote" className="btn-gold !px-8 !py-3.5 text-base">
                Request a 40ft Container Quote →
              </Link>
              <a
                href={whatsappLink('Hello BM Global Investment, I would like to discuss a 40ft container order.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#1fb857]"
              >
                <WhatsAppIcon /> WhatsApp Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Journey visual */}
      <section className="border-b border-cream-300 bg-white py-16" aria-label="Supply chain journey">
        <div className="container-x">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {stages.map((stage, i) => (
              <Reveal key={stage.label} delay={i * 70}>
                <li className="relative flex h-full flex-col items-center rounded-xl border border-cream-300 bg-cream-50 px-4 py-7 text-center">
                  <span className="absolute right-3 top-3 font-display text-xl font-bold text-cream-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <stage.icon className="h-8 w-8 text-forest-700" strokeWidth={1.5} />
                  <span className="mt-3 text-sm font-semibold leading-snug text-forest-900">
                    {stage.label}
                  </span>
                  <ArrowRight className="mt-auto hidden pt-3 text-gold-600 lg:hidden" aria-hidden="true" />
                </li>
              </Reveal>
            ))}
          </ol>
          <p className="sr-only">
            Sourcing → Processing → Packaging → Container Loading → Port → International Delivery
          </p>
        </div>
      </section>

      {/* Options */}
      <section className="bg-cream-100 py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Container Supply Options"
            title="Structured Around Your Requirement"
            subtitle="Every consignment is planned around the product, packaging, loading, and shipping arrangements agreed with you."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {options.map((o, i) => (
              <Reveal key={o.title} delay={i * 60}>
                <div className="group h-full rounded-xl border border-cream-300 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-forest-900/10">
                  <o.icon className="h-8 w-8 text-gold-600" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-lg font-bold text-forest-900">{o.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{o.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we coordinate */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">One Partner, Full Coordination</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-forest-900 sm:text-4xl">
              From Farm Gate to Destination Port
            </h2>
            <ul className="mt-7 space-y-4">
              {[
                'Sourcing the agreed commodity through our Nigerian supply network',
                'Cleaning, sorting, grading, and preparation before packing',
                'Packing to buyer-specified formats, sizes, and labelling',
                'Professional container loading with product-appropriate planning',
                'Coordination of required export documentation',
                'Handover for international shipment and onward logistics',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-forest-600" />
                  <span className="text-sm leading-relaxed text-ink-soft">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-2xl shadow-xl shadow-forest-900/10">
              <div className="flex aspect-square flex-col items-center justify-center gap-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-600 p-10 text-center">
                <Truck className="h-16 w-16 text-gold-400" strokeWidth={1} aria-hidden="true" />
                <p className="font-display text-3xl font-bold leading-snug text-white sm:text-4xl">
                  40ft Containers.
                  <br />
                  Buyer-Specified Packing.
                  <br />
                  <span className="text-gold-400">Global Delivery.</span>
                </p>
                <Link href="/request-quote" className="btn-gold mt-2 inline-flex">
                  Request a 40ft Container Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
