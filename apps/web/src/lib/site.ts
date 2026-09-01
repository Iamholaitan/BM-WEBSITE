export const site = {
  name: 'BM Global Investment',
  shortName: 'BM Global',
  tagline: "From Nigeria's Farms to the World.",
  subTagline: 'Premium Nigerian Agro-Commodities, Delivered Worldwide',
  description:
    'BM Global Investment is a Nigerian agro-commodity sourcing and export company supplying quality agricultural commodities and food products in bulk to international buyers.',
  url: 'https://bmglobalinvestment.com',
  email: 'bmglobalinvestmentandservices@gmail.com',
  phone: '08186199215',
  whatsapp: '2348186199215',
  address: '22, Wharf Road, Apapa, Lagos',
  businessHours: 'Monday – Friday, 8:00am – 6:00pm WAT',
  profilePdf: '/profile/bm-global-investment-company-profile.pdf',
} as const;

export const whatsappMessage =
  'Hello BM Global Investment, I am interested in your agricultural commodities. I would like to request a quotation.';

export function whatsappLink(message: string = whatsappMessage): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Export Process', href: '/export-process' },
  { label: 'Quality Assurance', href: '/quality-assurance' },
  { label: 'Logistics', href: '/logistics' },
  { label: 'Contact', href: '/contact' },
] as const;
