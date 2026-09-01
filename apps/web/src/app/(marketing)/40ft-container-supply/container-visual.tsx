'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Truck } from 'lucide-react';

export function ContainerVisual() {
  const imageSrc = '/images/40ft-container.jpg';
  const [useFallback, setUseFallback] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl shadow-xl shadow-forest-900/10">
      {useFallback ? (
        <div className="flex aspect-square flex-col items-center justify-center gap-6 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-600 p-10 text-center">
          <Truck className="h-16 w-16 text-gold-400" strokeWidth={1} aria-hidden="true" />
          <p className="font-display text-3xl font-bold leading-snug text-white sm:text-4xl">
            40ft Containers.
            <br />
            Buyer-Specified Packing.
            <br />
            <span className="text-gold-400">Global Delivery.</span>
          </p>
          <Link href="/request-quote" className="btn-gold mt-2 inline-flex">
            Request a 40ft Container Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="relative aspect-square">
          <Image
            src={imageSrc}
            alt="40ft shipping container loaded with bulk Nigerian agro-commodities"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            onError={() => setUseFallback(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex aspect-square flex-col items-center justify-center gap-6 p-10 text-center">
            <p className="font-display text-3xl font-bold leading-snug text-white sm:text-4xl">
              40ft Containers.
              <br />
              Buyer-Specified Packing.
              <br />
              <span className="text-gold-400">Global Delivery.</span>
            </p>
            <Link href="/request-quote" className="btn-gold mt-2 inline-flex">
              Request a 40ft Container Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}