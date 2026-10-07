"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/bazardor";
import ProductCard from "./ProductCard";

type SortOption = "default" | "low" | "high";

type Props = {
  products: Product[];
};

export default function CategoryProducts({
  products,
}: Props) {
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
      {/* Sort */}
      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          মোট{" "}
          <span className="font-bold text-gray-900">
            {products.length}
          </span>{" "}
          টি পণ্য
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="sort"
            className="whitespace-nowrap text-sm font-semibold text-gray-700"
          >
            সাজান
          </label>

          <div className="relative">
            <select
              id="sort"
              value={sort}
              onChange={(event) =>
                setSort(
                  event.target.value as SortOption
                )
              }
              className="appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-10 text-sm font-medium outline-none transition focus:border-[#008f4c] focus:ring-2 focus:ring-[#008f4c]/10"
            >
              <option value="default">
                ডিফল্ট
              </option>

              <option value="low">
                দাম: কম থেকে বেশি
              </option>

              <option value="high">
                দাম: বেশি থেকে কম
              </option>
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* Products */}
      {sortedProducts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
          <div className="text-6xl">🛒</div>

          <h2 className="mt-5 text-xl font-extrabold text-gray-900">
            কোনো পণ্য পাওয়া যায়নি
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            এই category-তে বর্তমানে কোনো পণ্য পাওয়া
            যাচ্ছে না।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}