import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { site, whatsappLink } from '@/lib/site';
import { WhatsAppIcon } from './whatsapp-icon';
import { Logo } from './header';

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Export Process', href: '/export-process' },
  { label: 'Quality Assurance', href: '/quality-assurance' },
  { label: 'Logistics', href: '/logistics' },
];

const productLinks = [
  { label: 'Agro Commodities', href: '/products?category=agro-commodities' },
  { label: 'Dried Food Products', href: '/products?category=dried-food' },
  { label: 'Non-Food Commodities', href: '/products?category=non-food' },
  { label: '40ft Container Supply', href: '/40ft-container-supply' },
];

export function Footer() {
  return (
    <footer className="bg-forest-950 text-cream-200">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-5 font-display text-lg italic text-gold-300">
            &ldquo;{site.tagline}&rdquo; 🌍
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-300/80">
            Nigerian agro-commodity sourcing and export company supplying quality agricultural products to international buyers.
          </p>
        </div>

        <nav aria-label="Company links">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gold-300">Company</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Product links">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gold-300">Products</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {productLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gold-300">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
              <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
              <span>{site.phone}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Chat on WhatsApp
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
              <span>{site.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-cream-300/70 sm:flex-row">
          <p>© 2026 {site.name}. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
