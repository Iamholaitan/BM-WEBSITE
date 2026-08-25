import {
  Bean,
  Carrot,
  Circle,
  CircleDot,
  Droplets,
  Fish,
  Flame,
  Flower2,
  Layers,
  Leaf,
  Nut,
  Pepper,
  Salad,
  Shell,
  Sparkle,
  Sprout,
  Wheat,
  type LucideIcon,
} from 'lucide-react';
import type { ProductCategory } from '@/lib/products';

const iconMap: Record<string, LucideIcon> = {
  Bean,
  Carrot,
  Circle,
  CircleDot,
  Droplets,
  Fish,
  Flame,
  Flower2,
  Layers,
  Leaf,
  Nut,
  Pepper,
  Salad,
  Shell,
  Sparkle,
  Sprout,
  Wheat,
};

const categoryStyles: Record<
  ProductCategory,
  { gradient: string; chip: string }
> = {
  'agro-commodities': {
    gradient: 'from-forest-800 via-forest-700 to-forest-500',
    chip: 'bg-gold-100 text-gold-700',
  },
  'dried-food': {
    gradient: 'from-[#7c2d12] via-[#b45309] to-[#ca8a04]',
    chip: 'bg-orange-100 text-orange-800',
  },
  'non-food': {
    gradient: 'from-neutral-900 via-neutral-700 to-neutral-500',
    chip: 'bg-neutral-200 text-neutral-700',
  },
};

export function ProductVisual({
  product,
  className = '',
  iconSize = 'h-16 w-16',
}: {
  product: { name: string; category: ProductCategory; icon: string };
  className?: string;
  iconSize?: string;
}) {
  const style =
    categoryStyles[product.category] ?? categoryStyles['agro-commodities'];
  const Icon = iconMap[product.icon] ?? Leaf;

  return (
    <div
      aria-hidden="true"
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${style.gradient} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, white 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-black/10" />
      <Icon className={`${iconSize} text-white/90`} strokeWidth={1.25} />
      <span className="sr-only">{product.name}</span>
    </div>
  );
}

export function CategoryChip({ category }: { category: ProductCategory }) {
  const style =
    categoryStyles[category] ?? categoryStyles['agro-commodities'];
  const label =
    category === 'agro-commodities'
      ? 'Agro Commodity'
      : category === 'dried-food'
        ? 'Dried Food'
        : 'Non-Food';
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${style.chip}`}
    >
      {label}
    </span>
  );
}
