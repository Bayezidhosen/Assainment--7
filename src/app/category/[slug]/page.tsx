import Link from "next/link";
import CategoryProducts from "@/components/CategoryProducts";
import { getCategories, getProducts } from "@/lib/api";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const category = categories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    return (
      <main className="min-h-[60vh] bg-[#f6faf7] px-4 py-20">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="text-6xl">🔎</div>

          <h1 className="mt-5 text-2xl font-black text-slate-900">
            ক্যাটাগরি পাওয়া যায়নি
          </h1>

          <p className="mt-3 text-slate-500">
            আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি পাওয়া যায়নি।
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex rounded-2xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700"
          >
            ← হোমে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const categoryProducts = products.filter(
    (product) =>
      product.categorySlug === slug ||
      product.category === category.title ||
      product.category === category.name
  );

  return (
    <main className="min-h-screen bg-[#f6faf7]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-sm font-semibold text-green-600 hover:text-green-700"
          >
            ← সব পণ্য
          </Link>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl">
              {category.icon || "🛒"}
            </div>

            <div>
              <p className="text-sm font-bold text-green-600">
                CATEGORY
              </p>

              <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
                {category.title || category.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {categoryProducts.length > 0 ? (
          <CategoryProducts products={categoryProducts} />
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="text-6xl">🛒</div>

            <h2 className="mt-5 text-2xl font-black text-slate-900">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h2>

            <p className="mt-3 text-slate-500">
              অন্য ক্যাটাগরি থেকে পণ্য দেখুন।
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex rounded-2xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
            >
              হোমে ফিরে যান
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}