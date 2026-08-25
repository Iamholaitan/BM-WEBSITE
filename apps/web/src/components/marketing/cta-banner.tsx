import Link from 'next/link';
import { whatsappLink } from '@/lib/site';
import { WhatsAppIcon } from './whatsapp-icon';

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with BM Global Investment on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

interface CtaBannerProps {
  headline?: string;
  text?: string;
}

export function CtaBanner({
  headline = 'Looking for Quality Nigerian Commodities?',
  text = "Tell us what you need, and let's discuss how we can supply it.",
}: CtaBannerProps) {
  return (
    <section aria-labelledby="cta-heading" className="relative overflow-hidden bg-forest-950">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-950 to-black"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 20%, white 1.5px, transparent 1.5px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)',
          backgroundSize: '48px 48px, 36px 36px',
        }}
      />
      <div className="absolute -left-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="container-x relative py-20 text-center sm:py-24">
        <p className="eyebrow !text-gold-300">Ready When You Are</p>
        <h2 id="cta-heading" className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {headline}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-cream-300/90">{text}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/request-quote" className="btn-gold w-full sm:w-auto">
            Request a Quote →
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1fb857] sm:w-auto"
          >
            <WhatsAppIcon /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
