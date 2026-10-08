export type MarketPrice = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;

  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;

  change: {
    dir: "up" | "down" | "same" | string;
    pct: number;
  };

  markets: MarketPrice[];

  // UI-এর জন্য calculated values
  price: number;
  changePercent: number;
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  name: string;
  categorySlug: string;
  emoji: string;
};

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};