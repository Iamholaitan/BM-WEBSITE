export type ProductCategory = 'agro-commodities' | 'dried-food' | 'non-food';

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  short: string;
  description: string;
  forms: string[];
  packaging: string[];
  icon: string;
}

export const categoryLabels: Record<ProductCategory, string> = {
  'agro-commodities': 'Agro Commodities',
  'dried-food': 'Dried Food Products',
  'non-food': 'Non-Food Commodities',
};

export const products: Product[] = [
  // ─── AGRO COMMODITIES ───────────────────────────────────────────────
  {
    slug: 'dried-hibiscus',
    name: 'Dried Hibiscus',
    category: 'agro-commodities',
    tagline: 'Premium Nigerian Dried Hibiscus for International Markets',
    short:
      'Deep red Nigerian dried hibiscus flowers, sourced from farming regions across Nigeria and prepared for bulk export.',
    description:
      'Nigeria is one of the world\'s leading producers of dried hibiscus flowers (Hibiscus sabdariffa). BM Global Investment sources dried hibiscus through its supply network, preparing it for bulk export according to buyer requirements.',
    forms: ['Whole dried flowers', 'Graded/cleaned', 'Buyer-specified preparation'],
    packaging: ['Bags per buyer specification', 'Custom bulk packing on request'],
    icon: 'Flower2',
  },
  {
    slug: 'cashew-nuts',
    name: 'Cashew Nuts',
    category: 'agro-commodities',
    tagline: 'Nigerian Cashew Nuts, Sourced and Prepared for Export',
    short:
      'Cashew nuts sourced from Nigerian cashew-producing regions, prepared and packed for wholesale and processing buyers.',
    description:
      'BM Global Investment sources cashew nuts from Nigeria\'s cashew belt through trusted aggregators and suppliers. We coordinate cleaning, grading where required, and packaging to match the specifications agreed with each buyer.',
    forms: ['Raw cashew nuts', 'Graded', 'Buyer-specified preparation'],
    packaging: ['Bags or cartons per buyer specification', 'Container-load packing arranged'],
    icon: 'Nut',
  },
  {
    slug: 'sesame-seeds',
    name: 'Sesame Seeds',
    category: 'agro-commodities',
    tagline: 'Quality Nigerian Sesame Seeds for Global Buyers',
    short:
      'Nigerian sesame seeds sourced from growing regions across the country and cleaned, sorted, and packed for export.',
    description:
      'Sesame is one of Nigeria\'s most important oilseed exports. We source sesame seeds through our supply network and coordinate cleaning, sorting, and packaging in line with the requirements of international buyers.',
    forms: ['Cleaned and sorted seeds', 'Natural (unhulled)', 'Buyer-specified grades'],
    packaging: ['Bags per buyer specification', 'Bulk container loading'],
    icon: 'Wheat',
  },
  {
    slug: 'ginger',
    name: 'Ginger',
    category: 'agro-commodities',
    tagline: 'Nigerian Ginger — Sourced, Processed, Exported',
    short:
      'Fresh and dried ginger from Nigeria\'s ginger-growing regions, supplied in bulk to food and processing companies.',
    description:
      'Nigerian ginger is valued in international markets for its pungency and aroma. BM Global Investment coordinates sourcing, cleaning, splitting or drying where required, and packaging of ginger for bulk export.',
    forms: ['Fresh ginger', 'Dried ginger', 'Split/dried', 'Buyer-specified preparation'],
    packaging: ['Bags per buyer specification', 'Custom export packaging'],
    icon: 'Sprout',
  },
  {
    slug: 'shea-nuts',
    name: 'Shea Nuts',
    category: 'agro-commodities',
    tagline: 'Nigerian Shea Nuts for Cosmetic and Food Industries',
    short:
      'Shea nuts aggregated from collection networks across Nigeria, prepared for bulk shipment to processors worldwide.',
    description:
      'Shea nuts are the raw material behind shea butter, one of West Africa\'s most valuable exports. We aggregate shea nuts through our sourcing network and prepare consignments for bulk export to cosmetic and food-industry buyers.',
    forms: ['Raw shea nuts', 'Sorted/cleaned'],
    packaging: ['Bulk bags', 'Buyer-specified packing'],
    icon: 'Leaf',
  },
  {
    slug: 'tiger-nuts',
    name: 'Tiger Nuts',
    category: 'agro-commodities',
    tagline: 'Nigerian Tiger Nuts, Prepared for International Markets',
    short:
      'Tiger nuts (earth almonds) sourced from Nigerian farms — cleaned, graded, and packed according to buyer requirements.',
    description:
      'Tiger nuts are increasingly in demand globally for beverages, snacks, flour, and health-food applications. BM Global Investment sources Nigerian tiger nuts and coordinates cleaning, grading, and export-ready packaging.',
    forms: ['Fresh/dried tubers', 'Cleaned and graded'],
    packaging: ['Bags per buyer specification', 'Bulk export packing'],
    icon: 'CircleDot',
  },
  {
    slug: 'cocoa',
    name: 'Cocoa',
    category: 'agro-commodities',
    tagline: 'Nigerian Cocoa for Chocolate and Food Manufacturers',
    short:
      'Cocoa beans sourced from Nigeria\'s cocoa-producing states and prepared for bulk export to global buyers.',
    description:
      'Nigeria is one of the world\'s historic cocoa origins. We work with farmers, aggregators, and processors across cocoa-producing communities to supply cocoa beans prepared to the requirements of chocolate manufacturers, traders, and food companies.',
    forms: ['Cocoa beans', 'Buyer-specified grades'],
    packaging: ['Export bags per buyer specification', 'Container loading arranged'],
    icon: 'Bean',
  },
  {
    slug: 'soybeans',
    name: 'Soybeans',
    category: 'agro-commodities',
    tagline: 'Nigerian Soybeans for Food and Feed Industries',
    short:
      'Soybeans sourced from Nigeria\'s middle-belt growing regions — cleaned and prepared for bulk international shipment.',
    description:
      'Soybeans serve food, oil-crushing, and animal-feed industries worldwide. BM Global Investment sources soybeans through established supply channels and coordinates cleaning, grading, and packaging for export.',
    forms: ['Cleaned soybeans', 'Buyer-specified grades'],
    packaging: ['Bags or bulk per buyer specification'],
    icon: 'Sprout',
  },
  {
    slug: 'groundnuts',
    name: 'Groundnuts',
    category: 'agro-commodities',
    tagline: 'Nigerian Groundnuts (Peanuts) for Wholesale Supply',
    short:
      'Groundnuts sourced from northern Nigeria\'s producing regions — shelled, cleaned, and packed for export buyers.',
    description:
      'Groundnuts remain a significant Nigerian commodity for food processors, confectionery makers, and oil pressers. We coordinate sourcing, shelling where required, cleaning, and export packaging according to each buyer\'s needs.',
    forms: ['Shelled groundnuts', 'In-shell on request', 'Buyer-specified preparation'],
    packaging: ['Bags per buyer specification', 'Bulk packing'],
    icon: 'Nut',
  },
  {
    slug: 'moringa',
    name: 'Moringa',
    category: 'agro-commodities',
    tagline: 'Nigerian Moringa for Health and Wellness Markets',
    short:
      'Moringa leaves and powder sourced from Nigerian growers, processed and packed for health-food and wellness buyers.',
    description:
      'Moringa is prized internationally as a nutrient-dense ingredient for teas, supplements, and functional foods. BM Global Investment sources moringa leaf from Nigerian growers and coordinates drying, milling where required, and export packaging.',
    forms: ['Dried leaves', 'Powder', 'Seeds on request'],
    packaging: ['Food-grade bags/containers per buyer specification'],
    icon: 'Leaf',
  },

  // ─── DRIED FOOD PRODUCTS ────────────────────────────────────────────
  {
    slug: 'dried-pepper',
    name: 'Dried Pepper',
    category: 'dried-food',
    tagline: 'Nigerian Dried Pepper for Food Manufacturers and Retail',
    short:
      'Dried peppers including varieties popular in African and international cuisine, supplied whole or milled in bulk.',
    description:
      'Pepper is central to Nigerian and West African cuisine, and demand continues to grow among diaspora and mainstream food markets. We source quality peppers, coordinate drying, sorting, and milling where required, and pack to specification.',
    forms: ['Whole dried', 'Milled/powder', 'Crushed', 'Buyer-specified'],
    packaging: ['Bags or food-grade packs per specification'],
    icon: 'Pepper',
  },
  {
    slug: 'dried-onion',
    name: 'Dried Onion',
    category: 'dried-food',
    tagline: 'Dried Onion — Flakes, Granules and Powder from Nigeria',
    short:
      'Dehydrated onion products for food processing, seasoning blends, and retail packaging, available in bulk.',
    description:
      'Dried onion extends shelf life while retaining flavour, making it a staple ingredient for seasonings, soups, and snack manufacturing. BM Global Investment supplies dried onion slices, flakes, granules, or powder prepared to buyer requirements.',
    forms: ['Slices/flakes', 'Granules', 'Powder'],
    packaging: ['Food-grade bags or cartons per specification'],
    icon: 'Layers',
  },
  {
    slug: 'dried-garlic',
    name: 'Dried Garlic',
    category: 'dried-food',
    tagline: 'Nigerian Dried Garlic for Seasoning and Food Processing',
    short:
      'Dehydrated garlic in flakes, granules, or powder form, cleaned and packed for industrial and retail buyers.',
    description:
      'Dried garlic is a core ingredient in seasoning manufacturing and food service supply chains. We source garlic through Nigerian suppliers and coordinate peeling, drying, sizing, milling, and packaging to specification.',
    forms: ['Flakes', 'Granules', 'Powder'],
    packaging: ['Food-grade bags or cartons per specification'],
    icon: 'Sparkle',
  },
  {
    slug: 'dried-ginger',
    name: 'Dried Ginger',
    category: 'dried-food',
    tagline: 'Premium Dried Ginger Slices and Powder from Nigeria',
    short:
      'Dried ginger whole, split, sliced, or milled — prepared for beverage, spice, and health-food buyers worldwide.',
    description:
      'Dried ginger from Nigeria\'s ginger belt is sought after for tea blends, spices, extracts, and nutraceuticals. BM Global Investment coordinates drying, splitting/slicing, milling, and export-ready packaging to each buyer\'s requirements.',
    forms: ['Whole dried', 'Split', 'Sliced', 'Powder'],
    packaging: ['Bags per buyer specification', 'Bulk packing'],
    icon: 'Sprout',
  },
  {
    slug: 'dried-vegetables',
    name: 'Dried Vegetables',
    category: 'dried-food',
    tagline: 'Assorted Nigerian Dried Vegetables for Global Kitchens',
    short:
      'A range of dehydrated vegetables used in soups, stews, and ready-meal production, supplied in bulk.',
    description:
      'From leafy greens to assorted vegetables used in traditional and contemporary recipes, we supply dried vegetable products cleaned and prepared according to buyer specifications for food manufacturers, repackers, and retailers.',
    forms: ['Whole', 'Flakes', 'Powder', 'Mixes per specification'],
    packaging: ['Food-grade bags or cartons per specification'],
    icon: 'Salad',
  },
  {
    slug: 'dried-okra',
    name: 'Dried Okra',
    category: 'dried-food',
    tagline: 'Nigerian Dried Okra — Slice and Powder Formats',
    short:
      'Dried okra slices and powder for African food markets, soup manufacturers, and specialty retailers.',
    description:
      'Okra is a defining ingredient in West African cooking. Our dried okra is sourced from Nigerian farms, cleaned, sliced, dried, and optionally milled, then packed to meet the needs of diaspora retailers and food producers.',
    forms: ['Slices', 'Powder'],
    packaging: ['Food-grade bags per specification'],
    icon: 'Salad',
  },
  {
    slug: 'dried-crayfish',
    name: 'Dried Crayfish',
    category: 'dried-food',
    tagline: 'Nigerian Dried Crayfish for Authentic Flavour at Scale',
    short:
      'Sun-dried crayfish — a signature West African umami ingredient — cleaned, graded, and packed for export.',
    description:
      'Dried crayfish delivers distinctive umami depth to West African soups and dishes and is in consistent demand among diaspora communities and specialty food businesses. We coordinate sourcing, cleaning, drying, grading, and hygienic packing.',
    forms: ['Whole dried', 'Ground', 'Graded sizes'],
    packaging: ['Sealed food-grade packs per specification'],
    icon: 'Fish',
  },
  {
    slug: 'beans',
    name: 'Beans',
    category: 'dried-food',
    tagline: 'Nigerian Beans (Cowpeas) for Wholesale and Retail Supply',
    short:
      'Cleaned Nigerian cowpeas sorted and packed in bulk for distributors, wholesalers, and food processors.',
    description:
      'Beans are a dietary staple across West Africa with strong ongoing demand. BM Global Investment sources cowpeas from major producing regions and coordinates cleaning, stone/sorting preparation, and bagging to buyer specification.',
    forms: ['Cleaned and sorted', 'Buyer-specified grades'],
    packaging: ['Bags per buyer specification'],
    icon: 'Wheat',
  },
  {
    slug: 'rice',
    name: 'Rice',
    category: 'dried-food',
    tagline: 'Nigerian Rice for Regional and International Buyers',
    short:
      'Locally grown Nigerian rice varieties, milled and cleaned, available for bulk purchase and export enquiries.',
    description:
      'Nigeria is both one of Africa\'s largest rice consumers and an expanding producer. We supply locally grown rice varieties through our sourcing network, coordinating milling partnerships, cleaning, and packaging to order.',
    forms: ['Milled white rice', 'Brown rice', 'Parboiled (on request)'],
    packaging: ['Bags per buyer specification', 'Bulk loading'],
    icon: 'Wheat',
  },
  {
    slug: 'uziza',
    name: 'Uziza',
    category: 'dried-food',
    tagline: 'Uziza Leaves and Seeds — Distinctive West African Spice',
    short:
      'Dried uziza leaves and seeds supplying the characteristic peppery flavour of West African cuisine.',
    description:
      'Uziza (Guinea pepper vine) contributes a unique aromatic heat to soups and delicacies across Nigeria and beyond. We supply dried uziza leaves and seeds, cleaned and packed for specialty grocers, restaurants, and food manufacturers.',
    forms: ['Dried leaves', 'Seeds', 'Ground (on request)'],
    packaging: ['Food-grade packs per specification'],
    icon: 'Leaf',
  },
  {
    slug: 'bitter-kola',
    name: 'Bitter Kola',
    category: 'dried-food',
    tagline: 'Nigerian Bitter Kola (Garcinia kola) for Global Markets',
    short:
      'Fresh, well-graded bitter kola nuts sourced from Nigerian suppliers for nutraceutical and specialty buyers.',
    description:
      'Bitter kola is valued in traditional medicine, nutraceuticals, and cultural markets worldwide. BM Global Investment sources quality bitter kola through Nigerian supply channels, grading and packing consignments to buyer requirements.',
    forms: ['Whole nuts', 'Graded sizes'],
    packaging: ['Bags or cartons per buyer specification'],
    icon: 'CircleDot',
  },
  {
    slug: 'yam',
    name: 'Yam',
    category: 'dried-food',
    tagline: 'Nigerian Yam Tubers and Yam Flour Supply',
    short:
      'Yam tubers and processed yam products from Nigeria\'s yam belt, supplied to wholesalers and food businesses.',
    description:
      'Nigeria is the world\'s largest yam producer. We coordinate supply of fresh yam tubers and processed formats such as yam flour, working with trusted farm partners and processors to meet buyer specifications.',
    forms: ['Fresh tubers', 'Flour', 'Pieces (on request)'],
    packaging: ['Cartons/bags per buyer specification'],
    icon: 'Carrot',
  },

  // ─── NON-FOOD COMMODITIES ───────────────────────────────────────────
  {
    slug: 'charcoal',
    name: 'Charcoal',
    category: 'non-food',
    tagline: 'Hardwood Charcoal for BBQ and Industrial Markets',
    short:
      'Nigerian hardwood charcoal supplied in bulk for BBQ, restaurant, and industrial applications worldwide.',
    description:
      'Nigerian hardwood charcoal is in steady demand across Europe, Asia, and the Middle East for grilling and industrial use. We coordinate sourcing, processing, and bagging of charcoal consignments to buyer specifications.',
    forms: ['Lump charcoal', 'BBQ grade', 'Industrial grade'],
    packaging: ['Bags per buyer specification', 'Bulk loading'],
    icon: 'Flame',
  },
  {
    slug: 'palm-kernel',
    name: 'Palm Kernel',
    category: 'non-food',
    tagline: 'Nigerian Palm Kernel Nuts for Oil Milling Industries',
    short:
      'Palm kernel nuts sourced from Nigerian supply chains, cleaned and prepared for crushing and oil extraction.',
    description:
      'Palm kernel nuts are the feedstock for palm kernel oil used in food, oleochemical, and cosmetic industries. BM Global Investment sources palm kernels from Nigerian producing regions and prepares them for bulk export.',
    forms: ['Dried palm kernel nuts', 'Cracked (on request)'],
    packaging: ['Bags per buyer specification'],
    icon: 'Circle',
  },
  {
    slug: 'shea-butter',
    name: 'Shea Butter',
    category: 'non-food',
    tagline: 'Unrefined Nigerian Shea Butter for Cosmetics Worldwide',
    short:
      'Traditionally processed unrefined shea butter for cosmetic, personal-care, and food-industry buyers.',
    description:
      'Unrefined shea butter from Nigeria is prized by natural-cosmetic brands and food manufacturers alike. We work with women-led processing groups and suppliers to coordinate quality shea butter production and bulk export packing.',
    forms: ['Unrefined (raw)', 'Refined (on request)'],
    packaging: ['Cartons/drums per buyer specification'],
    icon: 'Droplets',
  },
  {
    slug: 'palm-kernel-shell',
    name: 'Palm Kernel Shell',
    category: 'non-food',
    tagline: 'Palm Kernel Shells for Biomass Energy Applications',
    short:
      'Palm kernel shells as a renewable biomass fuel, supplied in bulk to energy and industrial customers.',
    description:
      'Palm kernel shell (PKS) is a widely traded biomass commodity used in power generation and industrial boilers. We coordinate the aggregation, cleaning, and containerized shipment of PKS from Nigerian supply points.',
    forms: ['Bulk shells', 'Size-graded (on request)'],
    packaging: ['Bulk vessel/container loading', 'Bags on request'],
    icon: 'Shell',
  },
  {
    slug: 'coconut-shell',
    name: 'Coconut Shell',
    category: 'non-food',
    tagline: 'Coconut Shells for Activated Carbon and Crafts',
    short:
      'Dried coconut shells supplied in bulk for activated carbon production and other industrial uses.',
    description:
      'Coconut shell is the preferred raw material for high-quality activated carbon, alongside uses in handicrafts and charcoal production. BM Global Investment aggregates coconut shells from Nigerian coastal supply chains for bulk export.',
    forms: ['Whole dried shells', 'Broken/cut (on request)'],
    packaging: ['Bags per buyer specification', 'Bulk loading'],
    icon: 'CircleDot',
  },
];

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const featuredProducts = [
  getProduct('dried-hibiscus'),
  getProduct('cashew-nuts'),
  getProduct('sesame-seeds'),
  getProduct('ginger'),
  getProduct('cocoa'),
  getProduct('charcoal'),
].filter((p): p is Product => Boolean(p));
