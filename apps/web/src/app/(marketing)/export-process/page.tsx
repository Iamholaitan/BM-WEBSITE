import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CalendarClock,
  ClipboardList,
  FileCheck,
  Leaf,
  PackageCheck,
  Search,
  Ship,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Reveal } from '@/components/marketing/reveal';
import { CtaBanner } from '@/components/marketing/cta-banner';

export const metadata: Metadata = {
  title: 'Our Export Process — 8 Steps From Enquiry to Delivery',
  description:
    'How BM Global Investment exports Nigerian agricultural commodities: requirement submission, sourcing, quality inspection, processing & packaging, container loading, documentation, shipping and delivery.',
  alternates: { canonical: '/export-process' },
};

const steps = [
  {
    icon: ClipboardList,
    title: 'Submit Your Requirement',
    text: 'Buyer tells us the product, quantity, packaging requirements, destination, and other specifications.',
  },
  {
    icon: Leaf,
    title: 'Product Sourcing',
    text: 'We source the required agricultural commodity through our supply network.',
  },
  {
    icon: Search,
    title: 'Quality Inspection',
    text: 'Products are inspected, cleaned, sorted, graded, and prepared according to applicable requirements.',
  },
  {
    icon: Sparkles,
    title: 'Processing & Packaging',
    text: 'Products are prepared and packaged according to agreed specifications.',
  },
  {
    icon: PackageCheck,
    title: 'Container Loading',
    text: 'Products are professionally loaded and prepared for shipment.',
  },
  {
    icon: FileCheck,
    title: 'Export Documentation',
    text: 'Required export and shipping documentation is coordinated.',
  },
  {
    icon: Ship,
    title: 'Shipping & Logistics',
    text: 'Cargo is handed over for international shipment and logistics coordination.',
  },
  {
    icon: MapPin,
    title: 'Delivery',
    text: "Shipment proceeds to the buyer's destination.",
  },
];

export default function ExportProcessPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest-950 py-20 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-950 to-black" />
        <div aria-hidden="true" className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-x relative text-center">
          <Reveal>
            <p className="eyebrow !text-gold-300">Our Export Process</p>
            <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold text-white sm:text-5xl">
              Eight Clear Steps. One Accountable Partner.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream-300/85 sm:text-lg">
              A structured process that takes your enquiry from first conversation to delivered
              cargo — professionally managed at every stage.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vertical timeline */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x max-w-4xl">
          <SectionHeading
            eyebrow="Step by Step"
            title="From Your Enquiry to Your Destination"
            subtitle="Each stage has a clear owner, clear outputs, and clear communication back to you."
          />
          <ol className="relative space-y-10 border-l-2 border-cream-300 pl-8 sm:pl-12" aria-label="Export process steps">
            {steps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={60}>
                  <span
                    className="absolute -left-[22px] flex h-11 w-11 items-center justify-center rounded-full bg-forest-900 font-display text-sm font-bold text-gold-400 ring-4 ring-white sm:-left-[26px] sm:h-[52px] sm:w-[52px] sm:text-base"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div className="rounded-xl border border-cream-300 bg-cream-50 p-6 transition-all duration-300 hover:border-forest-200 hover:bg-white hover:shadow-md hover:shadow-forest-900/5 sm:p-8">
                    <div className="flex items-center gap-3">
                      <step.icon className="h-6 w-6 text-gold-600" strokeWidth={1.75} />
                      <h2 className="font-display text-xl font-bold text-forest-900">
                        Step {i + 1}: {step.title}
                      </h2>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="mt-14 rounded-xl border border-forest-100 bg-cream-50 p-7 text-center sm:p-9">
            <CalendarClock className="mx-auto h-8 w-8 text-gold-600" strokeWidth={1.5} />
            <h2 className="mt-3 font-display text-xl font-bold text-forest-900">
              Ready to Start Step 1?
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">
              Send us your requirement today — product, quantity, packaging preference, and
              destination — and we&apos;ll respond with next steps.
            </p>
            <Link href="/request-quote" className="btn-primary mt-6 !px-8">
              Submit Your Requirement →
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
