
import Image from "next/image";
import Link from "next/link";

// import AuthUser from "@/components/AuthUser";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  // Products with the highest price increases
  const sorted = [...products].sort(
    (a, b) => b.change.pct - a.change.pct
  );

  const risers = sorted
    .filter((product) => product.change.pct > 0)
    .slice(0, 6);

  // Products with the highest price decreases
  const fallers = [...products]
    .sort((a, b) => a.change.pct - b.change.pct)
    .filter((product) => product.change.pct < 0)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f6faf7]">
      {/* AUTHENTICATED USER */}
      <section className="px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* <AuthUser /> */}
        </div>
      </section>

      {/* HERO */}
      <section className="px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="display-flex grid grid-cols-1 items-center gap-10 rounded-2xl bg-green-600 sm:grid-cols-2 lg:gap-16">
            <div className="px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
              <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                🛒 আজকের বাজারদর
              </span>

              <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                বাজারের দাম
                <br />
                এক নজরে জানুন
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-green-50 sm:text-lg">
                চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ
                প্রয়োজনীয় পণ্যের বর্তমান বাজারদর
                সহজেই দেখুন।
              </p>

              <Link
                href="#সব-পণ্য"
                className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-green-700 shadow-lg transition hover:bg-green-50"
              >
                সব পণ্য দেখুন →
              </Link>
            </div>

            <div className="hidden items-center justify-center lg:flex">
              <div className="text-[150px]" aria-hidden="true">
                <Image src="/bazar-hero.png" alt="Bazar Hero" width={200} height={200} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICE INCREASES */}
      {risers.length > 0 && (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5">
              <h2 className="text-2xl font-black text-slate-900">
                আজ দাম বেড়েছে{" "}
                <span className="text-green-600">▲</span>
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                যেসব পণ্যের দাম আজ সবচেয়ে বেশি বেড়েছে
              </p>
            </div>

            <ProductGrid products={risers} />
          </div>
        </section>
      )}

      {/* PRICE DECREASES */}
      {fallers.length > 0 && (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5">
              <h2 className="text-2xl font-black text-slate-900">
                আজ দাম কমেছে{" "}
                <span className="text-red-500">▼</span>
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                যেসব পণ্যের দাম আজ সবচেয়ে বেশি কমেছে
              </p>
            </div>

            <ProductGrid products={fallers} />
          </div>
        </section>
      )}

      {/* ALL PRODUCTS */}
      <section
        id="সব-পণ্য"
        className="px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-black text-slate-900">
                সব পণ্য
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                বর্তমানে পাওয়া সব পণ্যের বাজারদর
              </p>
            </div>

            <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              {products.length}টি পণ্য
            </div>
          </div>

          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}