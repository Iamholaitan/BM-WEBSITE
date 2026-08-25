import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions governing the use of the BM Global Investment website and enquiries.',
  alternates: { canonical: '/terms' },
};

const sections = [
  {
    title: '1. About These Terms',
    body: `These terms govern your use of the ${site.name} website and the submission of enquiries through it. By using this website you agree to these terms.`,
  },
  {
    title: '2. Website Content',
    body: 'Content on this website is provided for general information about our products and services. Product descriptions indicate typical offerings; all supply is subject to specifications, quantities, prices and terms agreed in writing for each transaction. Information on this website does not constitute a contractual offer.',
  },
  {
    title: '3. Quotations & Orders',
    body: 'Quotation requests submitted through this website are invitations to negotiate. Any quotation issued remains subject to availability, confirmation of specifications, and agreed commercial terms. Binding obligations arise only through written agreements signed by authorised representatives.',
  },
  {
    title: '4. Product Information',
    body: 'Agricultural products are natural commodities; natural variation in appearance, size, moisture and other characteristics should be expected within the specifications agreed for each order. Where third-party inspection or analysis is required, this will be arranged and agreed separately.',
  },
  {
    title: '5. Intellectual Property',
    body: `All content on this website — including text, design elements and branding — is the property of ${site.name} unless otherwise stated, and may not be reproduced without permission.`,
  },
  {
    title: '6. Limitation of Liability',
    body: 'To the extent permitted by law, BM Global Investment accepts no liability for indirect or consequential losses arising from use of this website. Nothing in these terms limits liability that cannot lawfully be limited.',
  },
  {
    title: '7. Governing Terms',
    body: 'Transactions are governed by the terms of the individual agreements concluded for each transaction, together with applicable Nigerian law where no other jurisdiction is agreed in writing.',
  },
  {
    title: '8. Contact',
    body: `Questions about these terms may be directed to ${site.email}.`,
  },
];

export default function TermsPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-forest-900">Terms &amp; Conditions</h1>
        <p className="mt-4 text-sm text-ink-soft">
          Last updated: August 2026 · Applies to {site.url}
        </p>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-xl font-bold text-forest-900">{s.title}</h2>
              <p className="mt-2.5 leading-relaxed text-ink-soft">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
