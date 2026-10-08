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
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#eef9f1]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
          <div>
            <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              📊 প্রতিদিনের বাজারদর
            </span>

            <h1 className="mt-5 max-w-xl text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              বাজারের দাম
              <span className="block text-green-600">
                এক নজরে জানুন
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              আপনার প্রতিদিনের প্রয়োজনীয় পণ্যের
              সর্বশেষ বাজারদর সহজেই দেখে নিন।
            </p>

            <Link
              href="#সব-পণ্য"
              className="mt-8 inline-flex rounded-2xl bg-green-600 px-6 py-3 font-bold text-white shadow-lg shadow-green-200 transition hover:bg-green-700"
            >
              সব পণ্য দেখুন →
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="relative flex h-72 w-72 items-center justify-center rounded-[3rem] bg-white shadow-2xl sm:h-80 sm:w-80">
              <div className="absolute -right-5 -top-5 rounded-2xl bg-green-600 px-4 py-3 text-sm font-bold text-white shadow-lg">
                আজকের দাম
              </div>

              <div className="text-[9rem]">🛒</div>

              <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white px-5 py-4 shadow-xl">
                <p className="text-xs text-slate-400">
                  সহজে দেখুন
                </p>

                <p className="font-black text-green-600">
                  বাজারদর
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Rising */}
        <section>
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-sm font-bold text-green-600">
                PRICE UP
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                আজ দাম বেড়েছে ▲
              </h2>
            </div>
          </div>

          <ProductGrid products={risingProducts} />
        </section>

        {/* Falling */}
        <section className="mt-14">
          <div className="mb-6">
            <p className="text-sm font-bold text-red-500">
              PRICE DOWN
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
              আজ দাম কমেছে ▼
            </h2>
          </div>

          <ProductGrid products={fallingProducts} />
        </section>

        {/* All */}
        <section
          id="সব-পণ্য"
          className="mt-14 scroll-mt-52"
        >
          <div className="mb-6">
            <p className="text-sm font-bold text-green-600">
              ALL PRODUCTS
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
              সব পণ্য
            </h2>
          </div>

          <ProductGrid products={products} />
        </section>
      </div>
    </main>
  );
}