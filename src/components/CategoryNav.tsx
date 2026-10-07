import Link from "next/link";

const categories = [
  {
    slug: "chal",
    title: "চাল",
    icon: "🍚",
  },
  {
    slug: "dal",
    title: "ডাল",
    icon: "🫘",
  },
  {
    slug: "shobji",
    title: "সবজি",
    icon: "🥬",
  },
  {
    slug: "mach",
    title: "মাছ",
    icon: "🐟",
  },
  {
    slug: "mangsho",
    title: "মাংস",
    icon: "🥩",
  },
  {
    slug: "dim",
    title: "ডিম",
    icon: "🥚",
  },
];

export default function CategoryNav() {
  return (
    <nav className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-max items-center gap-2 py-2">
          {/* Home */}
          <Link
            href="/"
            className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            🏠 হোম
          </Link>

          {/* Categories */}
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-green-50 hover:text-green-700"
            >
              <span className="mr-1">
                {category.icon}
              </span>

              {category.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}