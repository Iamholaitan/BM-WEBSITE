import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How BM Global Investment collects, uses and protects the information you share with us.',
  alternates: { canonical: '/privacy-policy' },
};

const sections = [
  {
    title: '1. Information We Collect',
    body: 'When you submit an enquiry or quotation request through this website, we collect the information you provide — such as your name, company name, email address, phone number, country, and details about your product requirement. We do not collect payment information through this website.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use your information solely to respond to your enquiry, prepare quotations, communicate with you about your requirement, and coordinate any resulting business relationship. We do not sell, rent, or trade your personal information to third parties.',
  },
  {
    title: '3. Communication',
    body: "By submitting a form or contacting us, you consent to being contacted by BM Global Investment regarding your enquiry via email, phone, or WhatsApp. You may request at any time that we stop contacting you.",
  },
  {
    title: '4. Data Sharing',
    body: 'We may share necessary details with logistics partners, suppliers, or service providers strictly as required to fulfil your order or enquiry. Any such sharing is limited to what is necessary for the purpose.',
  },
  {
    title: '5. Data Retention & Security',
    body: 'We retain enquiry records only as long as needed for business purposes and applicable record-keeping requirements. We apply reasonable measures to protect your information against unauthorised access.',
  },
  {
    title: '6. Cookies',
    body: 'This website may use basic cookies and analytics tools to understand how visitors use the site and improve performance. No advertising trackers are used.',
  },
  {
    title: '7. Your Rights',
    body: `You may request access to, correction of, or deletion of the personal information we hold about you by contacting us at ${site.email}.`,
  },
  {
    title: '8. Changes to This Policy',
    body: 'We may update this policy from time to time. The current version will always be published on this page.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-x max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-forest-900">Privacy Policy</h1>
        <p className="mt-4 text-sm text-ink-soft">
          Last updated: August 2026 · Applies to {site.url}
        </p>
        <p className="mt-8 leading-relaxed text-ink-soft">
          BM Global Investment respects your privacy. This policy explains what information we
          collect through this website, how we use it, and the choices you have.
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
