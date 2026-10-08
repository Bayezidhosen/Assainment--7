import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { formatChange, formatPrice } from "@/lib/utils";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const up = product.change > 0;
  const down = product.change < 0;

  return (
    <main className="min-h-screen bg-[#f6faf7]">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-green-600 transition hover:text-green-700"
        >
          ← সব পণ্যে ফিরে যান
        </Link>

        {/* Product */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            {/* Image / Emoji */}
            <div className="flex min-h-[320px] items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-8 sm:min-h-[450px]">
              <div className="flex h-64 w-64 items-center justify-center rounded-[3rem] bg-white text-[10rem] shadow-xl">
                {product.emoji}
              </div>
            </div>

            {/* Information */}
            <div className="p-6 sm:p-10">
              {/* Category */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  {product.category || "পণ্য"}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    up
                      ? "bg-green-100 text-green-700"
                      : down
                        ? "bg-red-100 text-red-600"
                        : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {formatChange(product.change)}
                </span>
              </div>

              {/* Name */}
              <h1 className="mt-5 text-3xl font-black text-slate-900 sm:text-4xl">
                {product.name}
              </h1>

              {/* Description */}
              <p className="mt-3 leading-7 text-slate-500">
                {product.description ||
                  `${product.name} এর বর্তমান বাজারদর ও মূল্য পরিবর্তনের তথ্য দেখুন।`}
              </p>

              {/* Main price */}
              <div className="mt-8 rounded-3xl bg-green-50 p-6">
                <p className="text-sm font-semibold text-slate-500">
                  আজকের বাজারদর
                </p>

                <div className="mt-2 flex flex-wrap items-end gap-3">
                  <span className="text-4xl font-black text-green-600">
                    {formatPrice(product.price)}
                  </span>

                  <span className="pb-1 text-sm text-slate-500">
                    / {product.unit}
                  </span>
                </div>
              </div>

              {/* Min / Max / Average */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                  <p className="text-xs text-slate-400">
                    সর্বনিম্ন
                  </p>

                  <p className="mt-2 text-base font-black text-slate-900 sm:text-lg">
                    {formatPrice(
                      product.minPrice ?? product.price
                    )}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                  <p className="text-xs text-slate-400">
                    গড় দাম
                  </p>

                  <p className="mt-2 text-base font-black text-green-600 sm:text-lg">
                    {formatPrice(
                      product.averagePrice ?? product.price
                    )}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
                  <p className="text-xs text-slate-400">
                    সর্বোচ্চ
                  </p>

                  <p className="mt-2 text-base font-black text-slate-900 sm:text-lg">
                    {formatPrice(
                      product.maxPrice ?? product.price
                    )}
                  </p>
                </div>
              </div>

              {/* Product meta */}
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-sm text-slate-500">
                    পণ্যের একক
                  </span>

                  <span className="font-bold text-slate-900">
                    {product.unit}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <span className="text-sm text-slate-500">
                    মূল্য পরিবর্তন
                  </span>

                  <span
                    className={`font-bold ${
                      up
                        ? "text-green-600"
                        : down
                          ? "text-red-500"
                          : "text-slate-500"
                    }`}
                  >
                    {formatChange(product.change)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}