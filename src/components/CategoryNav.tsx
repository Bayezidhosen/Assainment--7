import Link from "next/link";

const categories = [
  ["chal", "🍚", "চাল"],
  ["dal", "🫘", "ডাল"],
  ["shobji", "🥬", "সবজি"],
  ["mach", "🐟", "মাছ"],
  ["mangsho", "🥩", "মাংস"],
  ["dim", "🥚", "ডিম"],
];

export default function CategoryNav() {
  return (
    <nav className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-max items-center gap-2 py-2">
          <Link
            href="/"
            className="rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white"
          >
            🏠 হোম
          </Link>

          {categories.map(
            ([slug, icon, title]) => (
              <Link
                key={slug}
                href={`/category/${slug}`}
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-green-50 hover:text-green-700"
              >
                {icon} {title}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}