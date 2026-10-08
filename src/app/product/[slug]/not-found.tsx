import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f6faf7] px-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="text-7xl">🛒</div>

        <h1 className="mt-6 text-3xl font-black text-slate-900">
          পণ্য পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-slate-500">
          আপনি যে পণ্যটি খুঁজছেন সেটি পাওয়া যায়নি অথবা
          পণ্যটি বর্তমানে আর উপলব্ধ নেই।
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-2xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700"
        >
          ← সব পণ্য দেখুন
        </Link>
      </div>
    </main>
  );
}