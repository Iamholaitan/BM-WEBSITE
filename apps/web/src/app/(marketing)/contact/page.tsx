import type { Metadata } from 'next';
import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Reveal } from '@/components/marketing/reveal';
import { WhatsAppIcon } from '@/components/marketing/whatsapp-icon';
import { CtaBanner } from '@/components/marketing/cta-banner';
import { site, whatsappLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Us — Talk to Our Export Team in Nigeria',
  description:
    'Contact BM Global Investment — Nigerian agro-commodity sourcing and export company. Reach our team by email, phone or WhatsApp to discuss bulk agricultural commodity supply.',
  alternates: { canonical: '/contact' },
};

const channels = [
  {
    icon: MapPin,
    label: 'Office Address',
    value: site.address,
    hint: 'Placeholder — update with company address.',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: site.phone,
    hint: 'Placeholder — update with phone number.',
  },
  {
    icon: WhatsAppIcon,
    label: 'WhatsApp',
    value: '[WHATSAPP_NUMBER]',
    hint: 'Opens WhatsApp chat when the number is configured.',
    href: whatsappLink(),
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: site.email,
    hint: 'Placeholder — update with company email.',
    href: `mailto:${site.email}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest-950 py-20 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-950 to-black" />
        <div aria-hidden="true" className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-x relative text-center">
          <Reveal>
            <p className="eyebrow !text-gold-300">Contact Us</p>
            <h1 className="mx-auto mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
              Let&apos;s Do Business
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-cream-300/85 sm:text-lg">
              Whether you have a specific requirement or want to explore what&apos;s possible,
              our team is ready to talk.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Reach Us" title="Choose What Works for You" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 60}>
                <div className="flex h-full flex-col rounded-xl border border-cream-300 bg-cream-50 p-7 transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-forest-900/5">
                  <c.icon className="h-7 w-7 text-gold-600" strokeWidth={1.5} />
                  <h2 className="mt-4 text-sm font-semibold uppercase tracking-wider text-ink-soft">
                    {c.label}
                  </h2>
                  {'href' in c && c.href ? (
                    <a
                      href={c.href}
                      {...(('external' in c && c.external) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="mt-1 break-words font-semibold text-forest-900 underline decoration-gold-500 decoration-2 underline-offset-4"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-1 break-words font-semibold text-forest-900">{c.value}</p>
                  )}
                  <p className="mt-auto pt-3 text-[11px] italic leading-snug text-ink-soft/60">{c.hint}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-cream-300 bg-cream-50 p-7">
              <h2 className="flex items-center gap-2.5 font-display text-lg font-bold text-forest-900">
                <Clock3 className="h-5 w-5 text-gold-600" /> Business Hours
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{site.businessHours}</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-cream-300 bg-cream-50">
              <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-3 p-7 text-center">
                <MapPin className="h-9 w-9 text-forest-300" strokeWidth={1.25} />
                <h2 className="font-display text-lg font-bold text-forest-900">Find Us on the Map</h2>
                <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
                  Google Maps embed placeholder. Connect your business location here once the
                  office address is confirmed.
                </p>
                <code className="rounded bg-forest-900/5 px-3 py-1.5 font-mono text-xs text-forest-800">
                  &lt;Google Maps embed&gt;
                </code>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        headline="Have a Requirement Ready?"
        text="Skip straight to a quotation — send us the details of what you need."
      />
    </>
  );
}
