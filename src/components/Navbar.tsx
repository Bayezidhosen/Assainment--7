import Link from "next/link";
import CategoryNav from "@/components/CategoryNav";
import PriceTicker from "@/components/PriceTicker";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      {/* Top Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>

            <div>
              <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                বাজার দর
              </h1>

              <p className="text-xs text-slate-500">
                বৃহস্পতিবার, ৮ অক্টোবর, ২০২৬
              </p>
            </div>
          </div>
        </Link>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/signin"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-xl bg-green-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            সাইন আপ
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end sm:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle"
          >
            <span className="text-xl">☰</span>
          </label>

          <ul
            tabIndex={0}
            className="menu dropdown-content z-[60] mt-3 w-52 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl"
          >
            <li>
              <Link href="/signin">
                সাইন ইন
              </Link>
            </li>

            <li>
              <Link href="/signup">
                সাইন আপ
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Category Navigation */}
      <CategoryNav />

      {/* Price Ticker */}
      <PriceTicker />
    </header>
  );
}