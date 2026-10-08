"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/bazardor";
import ProductGrid from "./ProductGrid";

type SortOption = "default" | "low" | "high";

export default function CategoryProducts({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, sort]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            মোট পণ্য
          </p>

          <p className="mt-1 text-lg font-black text-slate-900">
            {products.length}টি পণ্য
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="sort"
            className="text-sm font-semibold text-slate-600"
          >
            সাজান:
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value as SortOption)
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
          >
            <option value="default">
              ডিফল্ট
            </option>

            <option value="low">
              কম দাম → বেশি দাম
            </option>

            <option value="high">
              বেশি দাম → কম দাম
            </option>
          </select>
        </div>
      </div>

      <ProductGrid products={sortedProducts} />
    </div>
  );
}