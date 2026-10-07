import type { Product } from "@/types/bazardor";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};

export default function ProductGrid({
  products,
}: Props) {
  if (!products.length) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
        <div className="text-5xl">🛒</div>

        <h3 className="mt-4 text-lg font-bold">
          কোনো পণ্য পাওয়া যায়নি
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          এই মুহূর্তে দেখানোর মতো কোনো পণ্য নেই।
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}