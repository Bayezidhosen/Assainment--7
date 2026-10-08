import type { Product } from "@/types/bazardor";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
}: {
  products: Product[];
}) {
  if (!products.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <div className="text-5xl">🛒</div>

        <h3 className="mt-4 text-xl font-bold">
          কোনো পণ্য পাওয়া যায়নি
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          পরে আবার চেষ্টা করুন।
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={`${product.id}-${product.slug}`}
          product={product}
        />
      ))}
    </div>
  );
}