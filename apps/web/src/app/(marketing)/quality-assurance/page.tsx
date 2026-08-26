import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Award,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileCheck,
  Info,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Reveal } from '@/components/marketing/reveal';
import { CtaBanner } from '@/components/marketing/cta-banner';

export const metadata: Metadata = {
  title: 'Quality Assurance — Quality From Source to Shipment',
  description:
    'BM Global Investment applies quality checks throughout the supply chain: product selection, inspection, cleaning & sorting, packaging, documentation and traceability for Nigerian agricultural exports.',
  alternates: { canonical: '/quality-assurance' },
};

const sections = [
  {
    icon: ClipboardCheck,
    title: 'Product Selection',
    text: 'Careful sourcing and supplier selection. We work through a network of farmers, aggregators, and processors, selecting supply based on the commodity characteristics agreed with each buyer.',
  },
  {
    icon: ShieldCheck,
    title: 'Inspection',
    text: 'Products are inspected before processing and shipment. Checks are carried out at key points — on receipt, during preparation, and prior to packing — to confirm conformity with agreed requirements.',
  },
  {
    icon: Sparkles,
    title: 'Cleaning & Sorting',
    text: 'Products are prepared to meet agreed buyer requirements — including cleaning, sorting, and grading as applicable to each commodity.',
  },
  {
    icon: PackageCheck,
    title: 'Packaging',
    text: 'Packaging can be arranged according to buyer requirements — bag sizes, materials, labelling, and any buyer-specified packing instructions.',
  },
  {
    icon: FileCheck,
    title: 'Documentation',
    text: 'Export and shipment documentation is coordinated appropriately for each consignment and destination.',
  },
  {
    icon: Award,
    title: 'Traceability',
    text: 'Where applicable, we provide traceability through the sourcing and preparation process, connecting finished consignments back to their supply sources.',
  },
];

export default function QualityAssurancePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest-950 py-20 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-950 to-black" />
        <div aria-hidden="true" className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-x relative text-center">
          <Reveal>
            <p className="eyebrow !text-gold-300">Quality Assurance</p>
            <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold text-white sm:text-5xl">
              Quality From Source to Shipment
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream-300/85 sm:text-lg">
              Quality is considered throughout the supply chain — not inspected in at the end.
              From supplier selection to container loading, every stage is handled with care.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <article className="flex h-full flex-col rounded-xl border border-cream-300 bg-cream-50 p-7 transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-forest-900/5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-forest-900">
                    <s.icon className="h-6 w-6 text-gold-400" strokeWidth={1.75} />
                  </span>
                  <h2 className="mt-5 font-display text-lg font-bold text-forest-900">{s.title}</h2>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">{s.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Honest certification note */}
          <Reveal className="mt-14">
            <aside className="rounded-xl border border-gold-200 bg-gold-100/50 p-6 sm:p-8" aria-label="Certification note">
              <h2 className="flex items-center gap-2.5 font-display text-lg font-bold text-forest-900">
                <Info className="h-5 w-5 shrink-0 text-gold-700" /> A Note on Certifications
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                We do not make certification claims on this website. Where third-party
                inspections, analyses, or certifications apply to your requirement, these can be
                discussed and arranged as part of your enquiry.{' '}
                <Link href="/contact" className="font-semibold text-forest-700 underline decoration-gold-500 underline-offset-4 hover:text-forest-900">
                  Contact us
                </Link>{' '}
                to discuss the quality requirements for your market.
              </p>
            </aside>
          </Reveal>

          {/* Commitment strip */}
          <Reveal className="mt-14">
            <div className="rounded-2xl bg-forest-950 px-8 py-12 text-center sm:px-14">
              <CheckCircle2 className="mx-auto h-9 w-9 text-gold-400" strokeWidth={1.5} />
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-2xl font-bold text-white sm:text-3xl">
                Our Quality Commitment
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-cream-300/85 sm:text-base">
                Every consignment is prepared according to the specifications agreed with you —
                and if something does not meet the agreed requirements, we want to hear about it.
                Clear standards, honestly applied.
              </p>
              <Link href="/request-quote" className="btn-gold mt-7 inline-flex">
                Discuss Your Quality Requirements <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
