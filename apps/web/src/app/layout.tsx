import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bmglobalinvestment.com'),
  title: {
    default: 'BM Global Investment | Nigerian Agro-Commodity Export Company',
    template: '%s | BM Global Investment',
  },
  description:
    "Premium Nigerian agro-commodities delivered worldwide. BM Global Investment sources, processes, packages and exports quality Nigerian agricultural products in bulk — from Nigeria's farms to the world.",
  keywords: [
    'Nigerian agricultural exporters',
    'Nigeria agro commodity exporter',
    'agricultural commodities Nigeria',
    'Nigerian agricultural products supplier',
    'bulk agricultural products Nigeria',
    'Nigerian hibiscus supplier',
    'Nigerian cashew supplier',
    'Nigerian sesame supplier',
    'Nigerian ginger supplier',
  ],
  openGraph: {
    type: 'website',
    siteName: 'BM Global Investment',
    title: 'BM Global Investment | Premium Nigerian Agro-Commodities, Delivered Worldwide',
    description:
      'Sourcing • Processing • Packaging • Export • Logistics. Quality Nigerian agricultural commodities supplied in bulk to international buyers.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
