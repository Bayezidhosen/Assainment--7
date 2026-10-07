import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/bazardor";
import { formatChange, formatPrice } from "@/lib/utils";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const isUp = product.change > 0;
  const isDown = product.change < 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-[#eaf8f0]">
          {product.image ? (
            <Image
              src={product.image}
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

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isUp
              ? "bg-green-100 text-green-700"
              : isDown
              ? "bg-red-100 text-red-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {formatChange(product.change)}
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-xl font-bold text-slate-900">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {product.unit}
        </p>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-sm text-slate-400">
            আজকের দাম
          </p>

          <p className="text-2xl font-bold text-green-600">
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