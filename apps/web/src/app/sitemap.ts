import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';

const base = 'https://bmglobalinvestment.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/products',
    '/40ft-container-supply',
    '/export-process',
    '/quality-assurance',
    '/logistics',
    '/request-quote',
    '/contact',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : route === '/products' || route === '/request-quote' ? 0.9 : 0.7,
  }));

  const productRoutes = products.map((product) => ({
    url: `${base}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
