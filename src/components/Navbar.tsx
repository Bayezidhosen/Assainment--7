import Link from "next/link";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-2xl">
            🛒
          </div>

          <div>
            <h1 className="text-xl font-black text-slate-900 sm:text-2xl">
              বাজার দর
            </h1>

            <p className="text-xs text-slate-500">
              বৃহস্পতিবার, ৮ অক্টোবর, ২০২৬
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href="/signin"
            className="rounded-xl px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-xl bg-green-600 px-5 py-2 font-semibold text-white shadow-sm hover:bg-green-700"
          >
            সাইন আপ
          </Link>
        </div>

        <div className="dropdown dropdown-end sm:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle"
          >
            ☰
          </label>

          <ul
            tabIndex={0}
            className="menu dropdown-content z-[100] mt-3 w-48 rounded-2xl bg-white p-3 shadow-xl"
          >
            <li>
              <Link href="/signin">সাইন ইন</Link>
            </li>

            <li>
              <Link href="/signup">সাইন আপ</Link>
            </li>
          </ul>
        </div>
      </div>

      <CategoryNav />

      <PriceTicker />
    </header>
  );
}