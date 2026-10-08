import Link from "next/link";

import type { Product } from "@/types/bazardor";

import {
  formatChange,
  formatPrice,
} from "@/lib/utils";

export default function ProductDetails({
  product,
}: {
  product: Product;
}) {
  const up =
    product.changePercent > 0;

  const down =
    product.changePercent < 0;

  return (
    <section className="min-h-screen bg-[#f3f8f4] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* BREADCRUMB */}
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link
            href="/"
            className="hover:text-green-600"
          >
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${product.categorySlug}`}
            className="hover:text-green-600"
          >
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="text-slate-700">
            {product.name}
          </span>
        </div>

        {/* PRODUCT HEADER */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#eef6f0] text-5xl">
                {product.emoji}
              </div>

              <div>
                <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">
                  {product.name}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  প্রতি {product.unit}
                </p>

                <div className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  {product.categoryIcon}{" "}
                  {product.categoryNameBn}
                </div>
              </div>
            </div>

            {/* TODAY PRICE */}
            <div className="rounded-2xl bg-[#f0f7f2] px-6 py-4 text-center sm:min-w-[160px]">
              <p className="text-xs text-slate-500">
                আজকের দাম
              </p>

              <p className="mt-1 text-3xl font-black text-slate-800">
                {formatPrice(
                  product.today
                ).replace(
                  " টাকা",
                  ""
                )}
              </p>

              <p className="text-xs text-slate-500">
                টাকা / {product.unit}
              </p>

              <p
                className={`mt-1 text-xs font-bold ${
                  up
                    ? "text-green-600"
                    : down
                    ? "text-red-500"
                    : "text-slate-500"
                }`}
              >
                {formatChange(
                  product.changePercent
                )}
              </p>
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <h2 className="text-lg font-black">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-2 text-2xl font-black text-green-600">
                {formatPrice(
                  product.minPrice
                )}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                বাজারগুলোর সর্বনিম্ন
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">
                সর্বোচ্চ দাম
              </p>

              <p className="mt-2 text-2xl font-black text-red-500">
                {formatPrice(
                  product.maxPrice
                )}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                বাজারগুলোর সর্বোচ্চ
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">
                গড় দাম
              </p>

              <p className="mt-2 text-2xl font-black text-green-600">
                {formatPrice(
                  product.averagePrice
                )}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                বাজারভিত্তিক গড় হিসাব
              </p>
            </div>
          </div>
        </div>

        {/* MARKETS */}
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <h2 className="text-lg font-black">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {product.markets.length > 0 ? (
            <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[650px] border-collapse text-sm">
                <thead>
                  <tr className="bg-[#f7faf8] text-left text-slate-500">
                    <th className="px-4 py-4">
                      বাজার
                    </th>

                    <th className="px-4 py-4">
                      বিভাগ
                    </th>

                    <th className="px-4 py-4">
                      সর্বনিম্ন
                    </th>

                    <th className="px-4 py-4">
                      সর্বোচ্চ
                    </th>

                    <th className="px-4 py-4 text-right">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {product.markets.map(
                    (market, index) => {
                      const average =
                        Math.round(
                          (market.min +
                            market.max) /
                            2
                        );

                      return (
                        <tr
                          key={index}
                          className="border-t border-slate-200"
                        >
                          <td className="px-4 py-4 font-semibold text-slate-700">
                            {market.market}
                          </td>

                          <td className="px-4 py-4 text-slate-600">
                            {market.division}
                          </td>

                          <td className="px-4 py-4 text-slate-600">
                            {formatPrice(
                              market.min
                            )}
                          </td>

                          <td className="px-4 py-4 text-slate-600">
                            {formatPrice(
                              market.max
                            )}
                          </td>

                          <td className="px-4 py-4 text-right font-bold text-slate-800">
                            {formatPrice(
                              average
                            )}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-5 rounded-2xl bg-slate-50 p-8 text-center">
              <div className="text-4xl">
                🏪
              </div>

              <p className="mt-3 font-bold">
                বাজারভিত্তিক তথ্য পাওয়া যায়নি
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}