import Link from "next/link";
import CategoryProducts from "@/components/CategoryProducts";
import {
  getCategories,
  getProducts,
} from "@/lib/api";
import type { Category } from "@/types/bazardor";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

function getCategoryTitle(
  categories: Category[],
  slug: string
) {
  const category = categories.find(
    (item) =>
      item.slug === slug ||
      item.name === slug
  );

  return category;
}

export default async function CategoryPage({
  params,
}: Props) {
  const { slug } = await params;

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const category = getCategoryTitle(
    categories,
    slug
  );

  /*
   * API যদি categorySlug/category field দেয়,
   * সেটার মাধ্যমে filter করব।
   */
  const categoryProducts = products.filter(
    (product) =>
      product.categorySlug === slug ||
      product.category === slug ||
      product.category?.toLowerCase() ===
        category?.title?.toLowerCase()
  );

  /*
   * যদি category API পাওয়া না যায় কিন্তু product
   * data-তে category থাকে, তাহলে সেটাও handle হবে।
   */
  if (!category && categoryProducts.length === 0) {
    return (
      <CategoryNotFound />
    );
  }

  const title =
    category?.title ||
    category?.name ||
    slug;

  return (
    <main className="min-h-[70vh]">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#e8f7ee] px-6 py-8 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
              {category?.icon || "🛒"}
            </div>

            <div>
              <p className="text-sm font-semibold text-[#008f4c]">
                Category
              </p>

              <h1 className="text-3xl font-black text-gray-900">
                {title}
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600">
            {title} category-এর সকল পণ্যের
            বর্তমান বাজারদর দেখুন।
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <CategoryProducts
          products={categoryProducts}
        />
      </section>
    </main>
  );
}

function CategoryNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
        <div className="text-6xl">🔎</div>

        <h1 className="mt-5 text-2xl font-black text-gray-900">
          Category পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          আপনি যে category খুঁজছেন সেটি পাওয়া
          যায়নি অথবা বর্তমানে কোনো পণ্য নেই।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-[#008f4c] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#006f3b]"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}