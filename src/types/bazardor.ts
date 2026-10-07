export type Product = {
  id: string | number;

  slug: string;

  name: string;

  description?: string;

  category?: string;

  categorySlug?: string;

  unit: string;

  price: number;

  minPrice?: number;

  maxPrice?: number;

  averagePrice?: number;

  change: number;

  emoji: string;

  image?: string;
};

export type Category = {
  id?: string | number;

  slug: string;

  title: string;

  name?: string;

  icon?: string;

  scrapable?: boolean;
};