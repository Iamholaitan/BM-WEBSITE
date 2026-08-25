import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Clock3, Mail, ShieldCheck } from 'lucide-react';
import { QuoteForm } from '@/components/marketing/quote-form';
import { WhatsAppIcon } from '@/components/marketing/whatsapp-icon';
import { Reveal } from '@/components/marketing/reveal';
import { site, whatsappLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Request a Quote — Bulk Nigerian Agro-Commodities',
  description:
    "Tell us what you need and we'll help you plan your supply. Request a quotation for Nigerian agricultural commodities, dried foods and non-food products — packed to specification and shipped worldwide.",
  alternates: { canonical: '/request-quote' },
};

function FormFallback() {
  return (
    <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-cream-300 bg-white">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-forest-100 border-t-forest-700" aria-label="Loading form" />
    </div>
  );
}

export default function RequestQuotePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest-950 py-20 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-950 to-black" />
        <div aria-hidden="true" className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-x relative text-center">
          <Reveal>
            <p className="eyebrow !text-gold-300">Get Your Quotation</p>
            <h1 className="mx-auto mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
              Request a Quote
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-cream-300/85 sm:text-lg">
              Tell us what you need. We&apos;ll help you plan your supply.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-100 py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_2fr] lg:gap-14">
          {/* Side panel */}
          <Reveal>
            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-xl border border-cream-300 bg-white p-7 shadow-sm">
                <h2 className="font-display text-lg font-bold text-forest-900">
                  What Happens Next?
                </h2>
                <ol className="mt-5 space-y-5">
                  {[
                    { t: 'We review your requirement', d: 'Our team studies the product, quantity, packaging and destination details you provide.' },
                    { t: 'We come back to you', d: 'With availability, terms and next steps for your consideration.' },
                    { t: 'We plan your supply', d: 'Once agreed, sourcing, preparation, packing and shipping are scheduled.' },
                  ].map((s, i) => (
                    <li key={s.t} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-900 font-display text-sm font-bold text-gold-400">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-forest-900">{s.t}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-ink-soft">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-xl border border-cream-300 bg-white p-7 shadow-sm">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-forest-900">
                  <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> Prefer WhatsApp?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  Many of our buyers start on WhatsApp. Send us your requirement and get a
                  faster first response.
                </p>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1fb857]"
                >
                  <WhatsAppIcon /> Chat With Us on WhatsApp
                </a>
              </div>

              <ul className="space-y-3 px-2 text-xs text-ink-soft">
                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 shrink-0 text-forest-600" /> Your enquiry is handled confidentially.</li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-forest-600" /> Reach us at {site.email}.</li>
                <li className="flex items-center gap-2"><Clock3 className="h-4 w-4 shrink-0 text-forest-600" /> Business hours: {site.businessHours}.</li>
              </ul>
            </aside>
          </Reveal>

          {/* Form */}
          <Reveal delay={100}>
            <Suspense fallback={<FormFallback />}>
              <QuoteForm />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </>
  );
}
