"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";
import AuthActions from "./AuthActions";

export default function Navbar() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      setDate(
        new Intl.DateTimeFormat("bn-BD", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "Asia/Dhaka",
        }).format(new Date())
      );
    };

    updateDate();

    // মধ্যরাতে তারিখ আপডেট করার জন্য
    const timer = window.setInterval(updateDate, 60_000);

    return () => window.clearInterval(timer);
  }, []);

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
              {date || "তারিখ লোড হচ্ছে..."}
            </p>
          </div>
        </Link>

        <AuthActions />
      </div>

      <CategoryNav />
      <PriceTicker />
    </header>
  );
}