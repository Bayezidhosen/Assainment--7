import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl">🛒</div>

        <h1 className="mt-6 text-5xl font-black text-slate-900">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-bold">
          পেজটি পাওয়া যায়নি
        </h2>

        <p className="mt-3 text-slate-500">
          আপনি যে পেজটি খুঁজছেন সেটি আর নেই অথবা ভুল URL।
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
        >
          🏠 হোমে ফিরে যান
        </Link>
      </div>
    </section>
  );
}