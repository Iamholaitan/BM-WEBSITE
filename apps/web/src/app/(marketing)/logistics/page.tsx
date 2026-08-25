import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Anchor,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Container,
  FileCheck,
  Globe2,
  Ship,
} from 'lucide-react';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Reveal } from '@/components/marketing/reveal';
import { CtaBanner } from '@/components/marketing/cta-banner';

export const metadata: Metadata = {
  title: 'Global Shipping & Export Logistics From Nigeria',
  description:
    'BM Global Investment coordinates export logistics from Nigeria to international destinations — container loading, port coordination, documentation, freight coordination, cargo handling and delivery.',
  alternates: { canonical: '/logistics' },
};

const capabilities = [
  {
    icon: Container,
    title: 'Container Loading',
    text: 'Professional loading of 40ft/20ft containers with product-appropriate stacking and weight distribution.',
  },
  {
    icon: Anchor,
    title: 'Port Coordination',
    text: 'Coordination of consignments through port processes ahead of international departure.',
  },
  {
    icon: FileCheck,
    title: 'Export Documentation',
    text: 'Required export and shipping documentation coordinated for each consignment.',
  },
  {
    icon: Globe2,
    title: 'Freight Coordination',
    text: 'Freight arrangements made through established shipping and logistics partners.',
  },
  {
    icon: Ship,
    title: 'Shipping Arrangements',
    text: 'Booking and scheduling coordinated around your timeline and destination requirements.',
  },
  {
    icon: Boxes,
    title: 'Cargo Handling',
    text: 'Careful handling of packaged commodities from warehouse to vessel.',
  },
  {
    icon: CheckCircle2,
    title: 'Destination Coordination',
    text: 'Alignment on arrival requirements so your consignment lands ready for clearance.',
  },
];

const lanes = [
  { region: 'Nigeria', note: 'Origin — sourcing, preparation & loading' },
  { region: 'Africa', note: 'Regional trade within the continent' },
  { region: 'Europe', note: 'Established trade corridors' },
  { region: 'Middle East', note: 'Growing demand for African commodities' },
  { region: 'Asia', note: 'Major processing & manufacturing markets' },
  { region: 'North America', note: 'Specialty & mainstream food channels' },
];

export default function LogisticsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest-950 py-20 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-950 to-black" />
        <div aria-hidden="true" className="absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-x relative text-center">
          <Reveal>
            <p className="eyebrow !text-gold-300">Shipping &amp; Logistics</p>
            <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold text-white sm:text-5xl">
              Global Shipping &amp; Export Logistics
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream-300/85 sm:text-lg">
              BM Global Investment coordinates logistics from Nigeria to international
              destinations — serving buyers across global markets.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Route map */}
      <section className="bg-white py-16 sm:py-20" aria-label="Trade lanes">
        <div className="container-x">
          <SectionHeading
            eyebrow="Where We Ship"
            title="Nigeria to International Markets"
            subtitle="Serving buyers across international markets. Trade lanes are coordinated per consignment based on your destination and routing preferences."
          />
          <Reveal>
            <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              {lanes.map((lane, i) => (
                <li
                  key={lane.region}
                  className={`relative flex h-full flex-col rounded-xl border p-6 ${
                    i === 0
                      ? 'border-gold-500/60 bg-gold-100/40'
                      : 'border-cream-300 bg-cream-50'
                  }`}
                >
                  <span className={`font-display text-3xl font-bold ${i === 0 ? 'text-gold-600' : 'text-forest-200'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 flex items-center gap-2 font-display text-lg font-bold text-forest-900">
                    {i === 0 && <Anchor className="h-4 w-4 text-gold-600" />}
                    {lane.region}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{lane.note}</p>
                  {i < lanes.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-gold-600 lg:block" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
          <p className="mt-6 text-center text-xs text-ink-soft/70">
            Destinations served are confirmed per enquiry based on shipping routes and buyer requirements.
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-cream-100 py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="What We Coordinate"
            title="Logistics Handled End-to-End"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 50}>
                <div className="group h-full rounded-xl border border-cream-300 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-forest-900/10">
                  <c.icon className="h-7 w-7 text-gold-600" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-base font-bold text-forest-900">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.text}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={350}>
              <Link
                href="/request-quote"
                className="flex h-full min-h-[180px] flex-col items-start justify-between rounded-xl bg-forest-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-forest-800"
              >
                <Ship className="h-7 w-7 text-gold-400" strokeWidth={1.5} />
                <span className="font-display text-lg font-bold leading-snug text-white">
                  Plan Your Shipment With Us{' '}
                  <ArrowRight className="inline h-5 w-5 text-gold-400" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
