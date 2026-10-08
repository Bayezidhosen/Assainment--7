import Link from "next/link";
import { notFound } from "next/navigation";

import CategoryProducts from "@/components/CategoryProducts";

import {
  getCategories,
  getProductsByCategory,
} from "@/lib/api";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({
  params,
}: Props) {
  const { slug } = await params;

  const categories =
    await getCategories();

  const category =
    categories.find(
      (item) =>
        item.slug.toLowerCase() ===
        slug.toLowerCase()
    );

  if (!category) {
    notFound();
  }

  const products =
    await getProductsByCategory(slug);

  return (
    <section className="min-h-screen bg-[#f6faf7] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              {category.icon}{" "}
              {category.nameBn}
            </div>

            <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
              {category.nameBn} এর বাজারদর
            </h1>

            <p className="mt-2 text-slate-500">
              {category.nameBn} সম্পর্কিত
              সব পণ্যের বর্তমান বাজারদর দেখুন।
            </p>
          </div>

          <Link
            href="/"
            className="w-fit rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700"
          >
            ← সব পণ্য
          </Link>
        </div>

        {products.length > 0 ? (
          <CategoryProducts
            products={products}
          />
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="text-6xl">
              {category.icon}
            </div>

            <h2 className="mt-5 text-2xl font-black">
              কোনো পণ্য পাওয়া যায়নি
            </h2>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-green-600 px-6 py-3 font-bold text-white"
            >
              🏠 হোমে ফিরে যান
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}