import type { Product, Category } from "@/types/bazardor";

const BASE_URL =
  "https://api.api-store.workers.dev/api/bazardor";

const FALLBACK_URL =
  "https://api.abcz.workers.dev/api/bazardor";

type ApiRecord = Record<string, unknown>;

function getArray(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;

  const record = data as ApiRecord | null;

  if (Array.isArray(record?.data)) {
    return record.data as unknown[];
  }

  if (Array.isArray(record?.products)) {
    return record.products as unknown[];
  }

  if (Array.isArray((record?.data as ApiRecord | undefined)?.products)) {
    return (record?.data as ApiRecord).products as unknown[];
  }

  if (Array.isArray(record?.categories)) {
    return record.categories as unknown[];
  }

  if (Array.isArray((record?.data as ApiRecord | undefined)?.categories)) {
    return (record?.data as ApiRecord).categories as unknown[];
  }

  return [];
}

function getValue(
  source: ApiRecord,
  keys: string[]
): unknown {
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const value = source[key];

      if (value !== undefined) {
        return value;
      }
    }
  }

  return undefined;
}

function getStringValue(
  source: ApiRecord,
  keys: string[],
  fallback = ""
): string {
  for (const key of keys) {
    const value = source[key];

    if (typeof value === "string" && value) {
      return value;
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
  }

  return fallback;
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

function getName(item: ApiRecord): string {
  return getStringValue(
    item,
    [
      "name",
      "title",
      "productName",
      "product_name",
      "product",
    ],
    "অজানা পণ্য"
  );
}

function getImage(item: ApiRecord): string {
  return getStringValue(
    item,
    [
      "image",
      "imageUrl",
      "imageURL",
      "image_url",
      "productImage",
      "product_image",
      "thumbnail",
      "thumbnailUrl",
      "photo",
    ]
  );
}

function getPrice(item: ApiRecord): number {
  return toNumber(
    getValue(item, [
      "price",
      "currentPrice",
      "current_price",
      "todayPrice",
      "today_price",
      "today",
      "amount",
      "rate",
    ])
  );
}

function getChange(item: ApiRecord): number {
  return toNumber(
    getValue(item, [
      "change",
      "changePercent",
      "change_percentage",
      "change_percent",
      "percentage",
      "percent",
    ])
  );
}

function getCategory(item: ApiRecord): string {
  const category = item.category;

  if (typeof category === "string") {
    return category;
  }

  if (category && typeof category === "object") {
    return getStringValue(
      category as ApiRecord,
      ["title", "name"],
      getStringValue(item, ["categoryName", "category_name"], "")
    );
  }

  return getStringValue(item, ["categoryName", "category_name"], "");
}

function getCategorySlug(item: ApiRecord): string {
  const category = item.category;

  if (category && typeof category === "object") {
    return String(
      getValue(category as ApiRecord, ["slug", "id"]) ?? ""
    );
  }

  return String(
    getValue(item, ["categorySlug", "category_slug"]) ?? ""
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

function normalizeProduct(item: ApiRecord): Product {
  const name = getName(item);

  const slug = String(
    getValue(item, ["slug", "productSlug", "product_slug", "id", "_id"]) ?? name
  );

  const idValue = getValue(item, ["id", "_id", "productId"]);
  const productId: string | number =
    typeof idValue === "string" || typeof idValue === "number"
      ? idValue
      : slug;

  return {
    id: productId,

    slug,

    name,

    description: getStringValue(item, ["description", "subtitle", "summary"], ""),

    category: getCategory(item),

    categorySlug: getCategorySlug(item),

    unit: getStringValue(item, ["unit", "unitName", "unit_name", "measurement"], "কেজি"),

    price: getPrice(item),

    minPrice: toNumber(
      getValue(item, ["minPrice", "min_price", "minimumPrice"])
    ),

    maxPrice: toNumber(
      getValue(item, ["maxPrice", "max_price", "maximumPrice"])
    ),

    averagePrice: toNumber(
      getValue(item, ["averagePrice", "average_price", "avgPrice"])
    ),

    change: getChange(item),

    emoji: getStringValue(item, ["emoji", "icon"], getEmoji(name)),

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

  return getArray(data).map((item) => normalizeProduct(item as ApiRecord));
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
        ((data as ApiRecord)?.data as ApiRecord | undefined)?.product ??
        (data as ApiRecord)?.data ??
        (data as ApiRecord)?.product ??
        data;

      if (item && typeof item === "object") {
        return normalizeProduct(item as ApiRecord);
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

    return getArray(data).map((item) => {
      const record = item as ApiRecord;

      return {
        id: getValue(record, ["id", "_id"]) as string | number | undefined,

        slug: String(
          getValue(record, ["slug", "categorySlug", "id"]) ?? ""
        ),

        title: getStringValue(record, ["title", "name", "categoryName"], "ক্যাটাগরি"),

        name: getStringValue(record, ["name", "title"], ""),

        icon: getStringValue(record, ["icon", "emoji"], "🛒"),
      };
    });
  } catch {
    return [];
  }
}