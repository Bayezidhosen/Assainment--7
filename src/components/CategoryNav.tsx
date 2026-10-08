"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  ["chal", "🍚", "চাল"],
  ["dal", "🫘", "ডাল"],
  ["tel", "🛢️", "তেল"],
  ["sobji", "🥬", "সবজি"],
  ["mach", "🐟", "মাছ"],
  ["mangsho", "🍗", "মাংস"],
  ["dim-dui", "🥛", "ডিম-দুধ"],
  ["mosla", "🌶️", "মসলা"],
];

export default function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-max items-center gap-2 py-2">

          <Link
            href="/"
            className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
              pathname === "/"
                ? "bg-green-600 text-white"
                : "text-slate-600 hover:bg-green-50 hover:text-green-700"
            }`}
          >
            🏠 হোম
          </Link>

          {categories.map(([slug, icon, title]) => {
            const active = pathname === `/category/${slug}`;

            return (
              <Link
                key={slug}
                href={`/category/${slug}`}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-green-600 text-white"
                    : "text-slate-600 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                {icon} {title}
              </Link>
            );
          })}

        </div>
      </div>
    </nav>
  );
}