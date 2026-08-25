'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Mail, Phone } from 'lucide-react';
import { navLinks, site, whatsappLink } from '@/lib/site';
import { WhatsAppIcon } from './whatsapp-icon';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="BM Global Investment — Home">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-900 font-display text-lg font-bold text-gold-400">
        BM
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-base font-bold tracking-wide ${light ? 'text-white' : 'text-forest-900'}`}>
          BM GLOBAL
        </span>
        <span className={`block text-[10px] font-semibold uppercase tracking-[0.28em] ${light ? 'text-cream-300' : 'text-forest-600'}`}>
          Investment
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-forest-950 text-cream-200 lg:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Mail className="h-3.5 w-3.5" /> {site.email}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> {site.phone}
            </span>
          </div>
          <p className="tracking-wide">Sourcing • Processing • Packaging • Export • Logistics</p>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? 'border-forest-100 shadow-md shadow-forest-900/5' : 'border-transparent'
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Main navigation" className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => {
              const active =
                link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'text-forest-800 underline decoration-gold-500 decoration-2 underline-offset-8'
                      : 'text-ink-soft hover:bg-forest-50 hover:text-forest-800'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with BM Global Investment on WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105"
            >
              <WhatsAppIcon />
            </a>
            <Link href="/request-quote" className="btn-primary !px-5 !py-2.5">
              Request a Quote
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-forest-100 text-forest-900 xl:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-white xl:hidden">
            <nav aria-label="Mobile navigation" className="container-x flex flex-col py-4">
              {navLinks.map((link) => {
                const active =
                  link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`border-b border-cream-200 py-4 text-lg font-medium ${
                      active ? 'text-forest-800' : 'text-ink-soft'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/request-quote"
                className="btn-primary mt-6 w-full"
                onClick={() => setOpen(false)}
              >
                Request a Quote
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white"
              >
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
