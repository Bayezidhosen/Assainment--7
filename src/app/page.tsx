import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";



export default async function HomePage() {
  const products = await getProducts();

  const risingProducts = [...products]
    .filter((product) => product.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  const fallingProducts = [...products]
    .filter((product) => product.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <main>
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-[#e8f7ee] px-6 py-10 sm:px-10 lg:grid-cols-2 lg:px-14">
          
          <div>
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold text-[#008f4c] shadow-sm">
              📊 প্রতিদিনের বাজারদর
            </span>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-5xl">
              বাজারের দাম
              <br />
              <span className="text-[#008f4c]">
                এক নজরে জানুন
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600">
              আপনার প্রয়োজনীয় পণ্যের আজকের বাজারদর,
              দাম বৃদ্ধি ও কমার তথ্য সহজেই দেখুন।
            </p>

            <Link
              href="#সব-পণ্য"
              className="mt-7 inline-flex rounded-xl bg-[#008f4c] px-6 py-3 font-bold text-white transition hover:bg-[#006f3b]"
            >
              সব পণ্য দেখুন →
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="flex h-56 w-56 items-center justify-center rounded-full bg-white text-8xl shadow-xl sm:h-72 sm:w-72 sm:text-9xl">
              🛒
            </div>
          </div>
        </div>
      </section>

      {/* RISING */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-gray-900">
            আজ দাম বেড়েছে{" "}
            <span className="text-[#008f4c]">▲</span>
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            আজ যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে
          </p>
        </div>

        <ProductGrid products={risingProducts} />
      </section>

      {/* FALLING */}
      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-gray-900">
            আজ দাম কমেছে{" "}
            <span className="text-red-500">▼</span>
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            আজ যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে
          </p>
        </div>

        <ProductGrid products={fallingProducts} />
      </section>

      {/* ALL PRODUCTS */}
      <section
        id="সব-পণ্য"
        className="mx-auto mt-14 max-w-7xl scroll-mt-44 px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-black text-gray-900">
            সব পণ্য
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            আপনার প্রয়োজনীয় সব পণ্যের আজকের বাজারদর
          </p>
        </div>

        <ProductGrid products={products} />
      </section>
    </main>
  );
}