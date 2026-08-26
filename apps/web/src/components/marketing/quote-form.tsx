'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { products } from '@/lib/products';
import { whatsappLink } from '@/lib/site';
import { WhatsAppIcon } from './whatsapp-icon';

const quoteSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  companyName: z.string().min(2, 'Please enter your company name'),
  businessEmail: z.string().email('Please enter a valid business email'),
  phone: z.string().optional(),
  country: z.string().min(2, 'Please enter your country'),
  productName: z.string().min(1, 'Please select a product'),
  quantity: z.string().min(1, 'Please tell us the quantity you need'),
  packaging: z.string().optional(),
  destinationPort: z.string().optional(),
  shipmentType: z.string().optional(),
  targetDate: z.string().optional(),
  requirements: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const inputClass =
  'w-full rounded-lg border border-cream-300 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20';

const labelClass = 'mb-1.5 block text-sm font-semibold text-forest-900';
const errorClass = 'mt-1.5 text-xs font-medium text-red-600';

const shipmentTypes = [
  'Sea Freight (Full Container)',
  'Sea Freight (Shared/LCL)',
  'Air Freight',
  'Not Sure — Please Advise',
];

export function QuoteForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      productName: searchParams.get('product') ?? '',
      shipmentType: shipmentTypes[0],
    },
  });

  const whatsappSummary = useMemo(() => {
    const v = getValues();
    const lines = [
      'Hello BM Global Investment, I would like to request a quotation:',
      `• Product: ${v.productName || '-'}`,
      `• Quantity: ${v.quantity || '-'}`,
      `• Company: ${v.companyName || '-'}`,
      `• Country: ${v.country || '-'}`,
    ];
    return lines.join('\n');
  }, [submitted]);

  const onSubmit = async (_values: QuoteFormValues) => {
    // NOTE: Connect to your backend/API endpoint here when ready,
    // e.g. POST to your CRM or email service.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-forest-100 bg-white p-8 text-center shadow-lg shadow-forest-900/5 sm:p-12">
        <CheckCircle2 className="mx-auto h-14 w-14 text-forest-600" strokeWidth={1.5} />
        <h2 className="mt-5 font-display text-2xl font-bold text-forest-900 sm:text-3xl">
          Request Received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
          Thank you for your enquiry. Our team will review your requirement and respond with
          next steps shortly. For a faster response, continue the conversation on WhatsApp.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={whatsappLink(whatsappSummary)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1fb857]"
          >
            <WhatsAppIcon /> Continue on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              reset();
            }}
            className="btn-outline"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-xl border border-cream-300 bg-white p-6 shadow-lg shadow-forest-900/5 sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full Name <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input id="fullName" autoComplete="name" className={inputClass} placeholder="John Doe" {...register('fullName')} aria-invalid={!!errors.fullName} />
          {errors.fullName && <p className={errorClass} role="alert">{errors.fullName.message}</p>}
        </div>

        <div>
          <label htmlFor="companyName" className={labelClass}>
            Company Name <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input id="companyName" autoComplete="organization" className={inputClass} placeholder="Your Company Ltd." {...register('companyName')} aria-invalid={!!errors.companyName} />
          {errors.companyName && <p className={errorClass} role="alert">{errors.companyName.message}</p>}
        </div>

        <div>
          <label htmlFor="businessEmail" className={labelClass}>
            Business Email <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input id="businessEmail" type="email" autoComplete="email" className={inputClass} placeholder="you@company.com" {...register('businessEmail')} aria-invalid={!!errors.businessEmail} />
          {errors.businessEmail && <p className={errorClass} role="alert">{errors.businessEmail.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number</label>
          <input id="phone" type="tel" autoComplete="tel" className={inputClass} placeholder="+44 0000 000000" {...register('phone')} />
        </div>

        <div>
          <label htmlFor="country" className={labelClass}>
            Country <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input id="country" autoComplete="country-name" className={inputClass} placeholder="United Kingdom" {...register('country')} aria-invalid={!!errors.country} />
          {errors.country && <p className={errorClass} role="alert">{errors.country.message}</p>}
        </div>

        <div>
          <label htmlFor="productName" className={labelClass}>
            Product <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <select id="productName" className={inputClass} {...register('productName')} aria-invalid={!!errors.productName}>
            <option value="">Select a product…</option>
            <optgroup label="Agro Commodities">
              {products.filter((p) => p.category === 'agro-commodities').map((p) => (
                <option key={p.slug} value={p.name}>{p.name}</option>
              ))}
            </optgroup>
            <optgroup label="Dried Food Products">
              {products.filter((p) => p.category === 'dried-food').map((p) => (
                <option key={p.slug} value={p.name}>{p.name}</option>
              ))}
            </optgroup>
            <optgroup label="Non-Food Commodities">
              {products.filter((p) => p.category === 'non-food').map((p) => (
                <option key={p.slug} value={p.name}>{p.name}</option>
              ))}
            </optgroup>
            <option value="Multiple Products">Multiple Products</option>
            <option value="Other">Other (specify in requirements)</option>
          </select>
          {errors.productName && <p className={errorClass} role="alert">{errors.productName.message}</p>}
        </div>

        <div>
          <label htmlFor="quantity" className={labelClass}>
            Quantity Required <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input id="quantity" className={inputClass} placeholder="e.g. 1 x 40ft container" {...register('quantity')} aria-invalid={!!errors.quantity} />
          {errors.quantity && <p className={errorClass} role="alert">{errors.quantity.message}</p>}
        </div>

        <div>
          <label htmlFor="packaging" className={labelClass}>Packaging Preference</label>
          <input id="packaging" className={inputClass} placeholder="e.g. 50kg bags, custom branding" {...register('packaging')} />
        </div>

        <div>
          <label htmlFor="destinationPort" className={labelClass}>Destination Port</label>
          <input id="destinationPort" className={inputClass} placeholder="e.g. Port of Rotterdam" {...register('destinationPort')} />
        </div>

        <div>
          <label htmlFor="shipmentType" className={labelClass}>Preferred Shipment Type</label>
          <select id="shipmentType" className={inputClass} {...register('shipmentType')}>
            {shipmentTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="targetDate" className={labelClass}>Target Delivery Date</label>
          <input id="targetDate" type="date" className={inputClass} {...register('targetDate')} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="requirements" className={labelClass}>Additional Requirements</label>
          <textarea id="requirements" rows={5} className={inputClass} placeholder="Specifications, quality expectations, delivery notes…" {...register('requirements')} />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary mt-8 w-full !py-4 text-base disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[240px]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
          </>
        ) : (
          'Submit Request'
        )}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-ink-soft/80">
        By submitting this request you agree to be contacted regarding your enquiry. Your details are used solely to respond to your quotation request.
      </p>
    </form>
  );
}
