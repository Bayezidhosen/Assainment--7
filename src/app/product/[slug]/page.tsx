import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import { formatChange, formatPrice } from "@/lib/utils";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?callbackUrl=/product/${slug}`);
  }

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const up = product.change > 0;
  const down = product.change < 0;

  return (
    <section className="min-h-screen bg-[#f6faf7] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
            {product.emoji} {product.category || "পণ্য"}
          </span>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-2">
            <div className="flex min-h-[350px] items-center justify-center bg-green-50 p-10">
              <div className="text-[9rem]">
                {product.emoji}
              </div>
            </div>

            <div className="p-6 sm:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
                    {product.name}
                  </h1>

                  <p className="mt-2 text-slate-500">
                    প্রতি {product.unit}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-2 text-sm font-bold ${
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

              {product.description && (
                <p className="mt-6 leading-7 text-slate-600">
                  {product.description}
                </p>
              )}

              <div className="mt-8 rounded-3xl bg-green-50 p-6">
                <p className="text-sm font-medium text-slate-500">
                  আজকের দাম
                </p>

                <p className="mt-2 text-4xl font-black text-green-600">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">সর্বনিম্ন</p>
                  <p className="mt-2 font-black text-slate-800">
                    {formatPrice(product.minPrice ?? product.price)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">গড়</p>
                  <p className="mt-2 font-black text-slate-800">
                    {formatPrice(product.averagePrice ?? product.price)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">সর্বোচ্চ</p>
                  <p className="mt-2 font-black text-slate-800">
                    {formatPrice(product.maxPrice ?? product.price)}
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-slate-200 p-5">
                <p className="text-sm text-slate-500">
                  মূল্য পরিবর্তন
                </p>

                <p
                  className={`mt-2 text-xl font-black ${
                    up
                      ? "text-green-600"
                      : down
                        ? "text-red-500"
                        : "text-slate-500"
                  }`}
                >
                  {formatChange(product.change)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}