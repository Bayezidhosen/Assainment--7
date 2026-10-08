import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/types/bazardor";
import {
  formatChange,
  formatPrice,
} from "@/lib/utils";

function isValidImageUrl(value?: string) {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const up = product.change > 0;
  const down = product.change < 0;

  const validImage = isValidImageUrl(product.image);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image / Emoji */}
      <div className="flex items-start justify-between">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-green-50">
          {validImage ? (
            <Image
              src={product.image!}
              alt={product.name}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-3xl">
              {product.emoji}
            </span>
          )}
        </div>

        {/* Change */}
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

      {/* Product info */}
      <div className="mt-5">
        <h3 className="text-lg font-extrabold text-slate-900">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {product.unit}
        </p>
      </div>

      {/* Price */}
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