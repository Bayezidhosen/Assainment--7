import type {
  Category,
  MarketPrice,
  Product,
} from "@/types/bazardor";

const API_BASE =
  "https://api.api-store.workers.dev/api/bazardor";

/* --------------------------------
   Bengali Number
-------------------------------- */

export function toBanglaNumber(
  value: number
): string {
  return String(value).replace(
    /\d/g,
    (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]
  );
}

/* --------------------------------
   Product Normalize
-------------------------------- */

function normalizeProduct(
  data: any
): Product {
  const markets: MarketPrice[] =
    Array.isArray(data.markets)
      ? data.markets.map((market: any) => ({
          market: market.market || "স্থানীয় বাজার",
          division: market.division || "",
          min: Number(market.min) || 0,
          max: Number(market.max) || 0,
        }))
      : [];

  /*
    বাজারগুলোর min/max থেকে average হিসাব করছি।
  */

  let minPrice = Number(data.today) || 0;
  let maxPrice = Number(data.today) || 0;

  if (markets.length > 0) {
    const mins = markets
      .map((item) => item.min)
      .filter((value) => value > 0);

    const maxs = markets
      .map((item) => item.max)
      .filter((value) => value > 0);

    if (mins.length > 0) {
      minPrice = Math.min(...mins);
    }

    if (maxs.length > 0) {
      maxPrice = Math.max(...maxs);
    }
  }

  const marketAverage =
    markets.length > 0
      ? markets.reduce((total, item) => {
          const average =
            (item.min + item.max) / 2;

          return total + average;
        }, 0) / markets.length
      : Number(data.today) || 0;

  return {
    id: Number(data.id),

    slug: data.slug,

    nameBn:
      data.nameBn ||
      data.name ||
      "পণ্য",

    category:
      data.category || "",

    categoryNameBn:
      data.categoryNameBn ||
      data.categoryName ||
      "",

    categoryIcon:
      data.categoryIcon ||
      "🛒",

    unit:
      data.unit ||
      "kg",

    image:
      data.image ||
      data.categoryIcon ||
      "🛒",

    today:
      Number(data.today) || 0,

    yesterday:
      Number(data.yesterday) || 0,

    lastWeek:
      Number(data.lastWeek) || 0,

    lastMonth:
      Number(data.lastMonth) || 0,

    change: {
      dir:
        data.change?.dir ||
        "same",

      pct:
        Number(data.change?.pct) || 0,
    },

    markets,

    // UI values
    price:
      Number(data.today) || 0,

    changePercent:
      Number(data.change?.pct) || 0,

    minPrice,

    maxPrice,

    averagePrice:
      Math.round(marketAverage),

    name:
      data.nameBn ||
      data.name ||
      "পণ্য",

    categorySlug:
      data.category ||
      "",

    emoji:
      data.image ||
      data.categoryIcon ||
      "🛒",
  };
}

/* --------------------------------
   Get All Products
-------------------------------- */

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      `${API_BASE}/products`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "Products API Error:",
        response.status
      );

      return [];
    }

    const data = await response.json();

    /*
      API সরাসরি array return করে।
    */

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map(normalizeProduct);
  } catch (error) {
    console.error(
      "getProducts error:",
      error
    );

    return [];
  }
}

/* --------------------------------
   Get Single Product
-------------------------------- */

export async function getProduct(
  slug: string
): Promise<Product | null> {
  try {
    /*
      IMPORTANT:
      API single product ID দিয়ে দেয়।

      তাই আগে সব product নিয়ে
      slug match করছি।
    */

    const products = await getProducts();

    const product = products.find(
      (item) =>
        item.slug.toLowerCase() ===
        slug.toLowerCase()
    );

    return product || null;
  } catch (error) {
    console.error(
      "getProduct error:",
      error
    );

    return null;
  }
}

/* --------------------------------
   Get Categories
-------------------------------- */

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      `${API_BASE}/categories`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map(
      (item: any) => ({
        id: item.id,
        slug: item.slug,
        nameBn:
          item.nameBn ||
          item.name ||
          "ক্যাটাগরি",
        icon:
          item.icon ||
          "🛒",
      })
    );
  } catch (error) {
    console.error(
      "getCategories error:",
      error
    );

    return [];
  }
}

/* --------------------------------
   Get Products By Category
-------------------------------- */

export async function getProductsByCategory(
  slug: string
): Promise<Product[]> {
  try {
    const response = await fetch(
      `${API_BASE}/products?category=${encodeURIComponent(
        slug
      )}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map(normalizeProduct);
  } catch (error) {
    console.error(
      "getProductsByCategory error:",
      error
    );

    return [];
  }
}