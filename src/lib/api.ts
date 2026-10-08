import type { Product, Category } from "@/types/bazardor";

const BASE_URL =
  "https://api.api-store.workers.dev/api/bazardor";

const FALLBACK_URL =
  "https://api.abcz.workers.dev/api/bazardor";

function getArray(data: any): any[] {
  if (Array.isArray(data)) return data;

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.products)) {
    return data.products;
  }

  if (Array.isArray(data?.data?.products)) {
    return data.data.products;
  }

  if (Array.isArray(data?.categories)) {
    return data.categories;
  }

  if (Array.isArray(data?.data?.categories)) {
    return data.data.categories;
  }

  return [];
}

function toNumber(value: unknown): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value !== "string") {
    return 0;
  }

  const english = value
    .replace(/[০-৯]/g, (digit) =>
      String("০১২৩৪৫৬৭৮৯".indexOf(digit))
    )
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "");

  return Number(english) || 0;
}

function getName(item: any): string {
  return (
    item.name ??
    item.title ??
    item.productName ??
    item.product_name ??
    item.product ??
    "অজানা পণ্য"
  );
}

function getImage(item: any): string {
  return (
    item.image ??
    item.imageUrl ??
    item.imageURL ??
    item.image_url ??
    item.productImage ??
    item.product_image ??
    item.thumbnail ??
    item.thumbnailUrl ??
    item.photo ??
    ""
  );
}

function getPrice(item: any): number {
  return toNumber(
    item.price ??
      item.currentPrice ??
      item.current_price ??
      item.todayPrice ??
      item.today_price ??
      item.today ??
      item.amount ??
      item.rate
  );
}

function getChange(item: any): number {
  return toNumber(
    item.change ??
      item.changePercent ??
      item.change_percentage ??
      item.change_percent ??
      item.percentage ??
      item.percent
  );
}

function getCategory(item: any): string {
  if (typeof item.category === "string") {
    return item.category;
  }

  return (
    item.category?.title ??
    item.category?.name ??
    item.categoryName ??
    item.category_name ??
    ""
  );
}

function getCategorySlug(item: any): string {
  if (typeof item.category === "object") {
    return String(
      item.category?.slug ??
        item.category?.id ??
        ""
    );
  }

  return String(
    item.categorySlug ??
      item.category_slug ??
      ""
  );
}

function getEmoji(name: string): string {
  const value = name.toLowerCase();

  if (value.includes("চাল") || value.includes("rice")) {
    return "🍚";
  }

  if (value.includes("ডাল") || value.includes("dal")) {
    return "🫘";
  }

  if (value.includes("আলু") || value.includes("potato")) {
    return "🥔";
  }

  if (
    value.includes("পেঁয়াজ") ||
    value.includes("পেঁয়াজ") ||
    value.includes("onion")
  ) {
    return "🧅";
  }

  if (
    value.includes("মরিচ") ||
    value.includes("chili")
  ) {
    return "🌶️";
  }

  if (value.includes("মাছ") || value.includes("fish")) {
    return "🐟";
  }

  if (
    value.includes("মাংস") ||
    value.includes("meat")
  ) {
    return "🥩";
  }

  if (value.includes("ডিম") || value.includes("egg")) {
    return "🥚";
  }

  if (
    value.includes("রসুন") ||
    value.includes("garlic")
  ) {
    return "🧄";
  }

  if (
    value.includes("আদা") ||
    value.includes("ginger")
  ) {
    return "🫚";
  }

  return "🛒";
}

function normalizeProduct(item: any): Product {
  const name = getName(item);

  const slug = String(
    item.slug ??
      item.productSlug ??
      item.product_slug ??
      item.id ??
      item._id ??
      name
  );

  return {
    id:
      item.id ??
      item._id ??
      item.productId ??
      slug,

    slug,

    name,

    description:
      item.description ??
      item.subtitle ??
      item.summary ??
      "",

    category: getCategory(item),

    categorySlug: getCategorySlug(item),

    unit:
      item.unit ??
      item.unitName ??
      item.unit_name ??
      item.measurement ??
      "কেজি",

    price: getPrice(item),

    minPrice: toNumber(
      item.minPrice ??
        item.min_price ??
        item.minimumPrice
    ),

    maxPrice: toNumber(
      item.maxPrice ??
        item.max_price ??
        item.maximumPrice
    ),

    averagePrice: toNumber(
      item.averagePrice ??
        item.average_price ??
        item.avgPrice
    ),

    change: getChange(item),

    emoji:
      item.emoji ??
      item.icon ??
      getEmoji(name),

    image: getImage(item),
  };
}

async function fetchApi(path: string) {
  try {
    const response = await fetch(
      `${BASE_URL}${path}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (response.ok) {
      return response;
    }
  } catch {}

  return fetch(
    `${FALLBACK_URL}${path}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetchApi("/products");

  if (!response.ok) {
    throw new Error("Products API failed");
  }

  const data = await response.json();

  return getArray(data).map(normalizeProduct);
}

export async function getProduct(
  slug: string
): Promise<Product | null> {
  try {
    const response = await fetchApi(
      `/products/${encodeURIComponent(slug)}`
    );

    if (response.ok) {
      const data = await response.json();

      const item =
        data?.data?.product ??
        data?.data ??
        data?.product ??
        data;

      if (item && typeof item === "object") {
        return normalizeProduct(item);
      }
    }

    const products = await getProducts();

    return (
      products.find(
        (product) =>
          String(product.slug) === String(slug) ||
          String(product.id) === String(slug)
      ) ?? null
    );
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetchApi("/categories");

    if (!response.ok) return [];

    const data = await response.json();

    return getArray(data).map((item: any) => ({
      id: item.id ?? item._id,

      slug: String(
        item.slug ??
          item.categorySlug ??
          item.id ??
          ""
      ),

      title:
        item.title ??
        item.name ??
        item.categoryName ??
        "ক্যাটাগরি",

      name:
        item.name ??
        item.title ??
        "",

      icon:
        item.icon ??
        item.emoji ??
        "🛒",
    }));
  } catch {
    return [];
  }
}