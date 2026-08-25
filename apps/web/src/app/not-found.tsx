import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream-100 px-6 text-center">
      <p className="font-display text-7xl font-bold text-forest-900">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-forest-900">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Homepage
      </Link>
    </div>
  );
}
