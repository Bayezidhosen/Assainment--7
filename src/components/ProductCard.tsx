import Link from "next/link";

import type { Product } from "@/types/bazardor";

import {
  formatChange,
  formatPrice,
} from "@/lib/utils";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const up =
    product.changePercent > 0;

  const down =
    product.changePercent < 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* TOP */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-4xl">
          {product.emoji}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            up
              ? "bg-green-100 text-green-700"
              : down
              ? "bg-red-100 text-red-600"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {formatChange(
            product.changePercent
          )}
        </span>
      </div>

      {/* PRODUCT */}
      <div className="mt-5">
        <h3 className="text-lg font-extrabold text-slate-900">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          প্রতি {product.unit}
        </p>
      </div>

      {/* PRICE */}
      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-xs text-slate-400">
            আজকের দাম
          </p>

          <p className="mt-1 text-xl font-black text-green-600">
            {formatPrice(product.price)}
          </p>
        </div>

        <span className="text-xl text-slate-400 transition group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}