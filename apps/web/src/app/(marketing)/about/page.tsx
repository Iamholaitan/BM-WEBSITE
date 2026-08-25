import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass, Handshake, Leaf, ShieldCheck, Truck } from 'lucide-react';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Reveal } from '@/components/marketing/reveal';
import { CtaBanner } from '@/components/marketing/cta-banner';

export const metadata: Metadata = {
  title: 'About Us — Nigerian Agro-Commodity Sourcing & Export Company',
  description:
    'BM Global Investment connects quality Nigerian agricultural products with buyers across international markets through professional sourcing, quality control, packaging, documentation and logistics coordination.',
  alternates: { canonical: '/about' },
};

const values = [
  {
    icon: ShieldCheck,
    title: 'Quality',
    text: 'Attention to quality at every stage — from sourcing through preparation to shipment.',
  },
  {
    icon: Handshake,
    title: 'Reliability',
    text: 'Clear communication and dependable coordination buyers can plan around.',
  },
  {
    icon: Compass,
    title: 'Transparency',
    text: 'Straightforward processes so buyers know what is happening with their order.',
  },
  {
    icon: Truck,
    title: 'Global Reach',
    text: 'Export preparation and logistics coordination serving international markets.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-forest-950 py-20 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-950 to-black" />
        <div aria-hidden="true" className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-x relative text-center">
          <Reveal>
            <p className="eyebrow !text-gold-300">About Us</p>
            <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold text-white sm:text-5xl">
              Connecting Nigeria&apos;s Agricultural Wealth to Global Markets
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream-300/85 sm:text-lg">
              BM Global Investment is a Nigerian agro-commodity sourcing and export company
              focused on connecting quality agricultural products from Nigeria with buyers
              across international markets.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">Who We Are</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-forest-900">
              Local Sourcing Knowledge. International Standards of Service.
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
              <p>
                We work with farmers, processors, aggregators, logistics partners, and other
                supply-chain stakeholders to source and prepare agricultural commodities for
                bulk export.
              </p>
              <p>
                Our approach combines local sourcing knowledge with professional quality control,
                packaging, documentation, and logistics coordination — so international buyers
                can order Nigerian commodities with confidence.
              </p>
              <p>
                From a single pallet enquiry to full container programmes, we structure every
                supply engagement around the buyer&apos;s specifications and the requirements of the
                destination market.
              </p>
            </div>

            <h3 className="mt-10 font-display text-xl font-bold text-forest-900">What We Do</h3>
            <ul className="mt-4 grid gap-3 text-sm text-ink-soft sm:grid-cols-2">
              {[
                'Agro-commodity sourcing',
                'Agricultural product processing',
                'Cleaning and grading',
                'Bulk packaging',
                'Custom container loading',
                'Export documentation',
                'International shipping',
                'Logistics coordination',
                'Global commodity supply',
              ].map((s) => (
                <li key={s} className="flex items-center gap-2.5 rounded-lg border border-cream-300 bg-cream-50 px-4 py-2.5 font-medium">
                  <Leaf className="h-4 w-4 shrink-0 text-gold-600" /> {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-2xl shadow-xl shadow-forest-900/10">
              <div className="flex aspect-[3/4] flex-col justify-between bg-gradient-to-b from-forest-800 via-forest-700 to-forest-500 p-8 sm:p-10">
                <Leaf className="h-12 w-12 text-gold-300" strokeWidth={1.25} aria-hidden="true" />
                <div>
                  <p className="font-display text-3xl font-bold leading-snug text-white">
                    From Nigeria&apos;s Farms to the World. 🌍
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/75">
                    Every consignment we prepare begins in Nigeria&apos;s farming communities and ends
                    at a destination chosen by our buyers. Our job is to make that journey smooth,
                    professional, and predictable.
                  </p>
                  <Link href="/request-quote" className="btn-gold mt-8 inline-flex">
                    Start Your Enquiry <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-100 py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Values"
            title="Quality • Reliability • Transparency • Professionalism • Global Reach"
          />
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="h-full rounded-xl border border-cream-300 bg-white p-7 text-center shadow-sm transition-shadow hover:shadow-lg hover:shadow-forest-900/5">
                  <v.icon className="mx-auto h-8 w-8 text-gold-600" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-lg font-bold text-forest-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        headline="Ready to Source From Nigeria?"
        text="Tell us the commodity, quantity and destination — we'll take it from there."
      />
    </>
  );
}
