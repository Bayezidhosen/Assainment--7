"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("আপনার নাম লিখুন।");
      return;
    }

    if (!email.trim()) {
      setError("আপনার ইমেইল লিখুন।");
      return;
    }

    if (password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        setError(
          error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।"
        );
        return;
      }

      router.push("/signin?registered=true");
    } catch {
      setError("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6faf7] px-4 py-12 sm:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl md:grid-cols-2">

        {/* Left side */}
        <div className="hidden bg-gradient-to-br from-green-600 to-emerald-700 p-10 text-white md:flex md:flex-col md:justify-between">
          <div>
            <Link
              href="/"
              className="text-2xl font-black"
            >
              🛒 বাজার দর
            </Link>

            <div className="mt-20">
              <p className="text-sm font-bold text-green-100">
                BAZARDOR
              </p>

              <h1 className="mt-3 text-4xl font-black leading-tight">
                আপনার বাজারদর,
                <br />
                এক জায়গায়।
              </h1>

              <p className="mt-5 max-w-sm leading-7 text-green-50">
                অ্যাকাউন্ট তৈরি করুন এবং আপনার প্রয়োজনীয়
                বাজারদরের তথ্য সহজে দেখুন।
              </p>
            </div>
          </div>

          <p className="text-sm text-green-100">
            © ২০২৬ বাজার দর
          </p>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-10">
          <div className="mx-auto max-w-md">
            <div className="md:hidden">
              <Link
                href="/"
                className="text-xl font-black text-slate-900"
              >
                🛒 বাজার দর
              </Link>
            </div>

            <div className="mt-8 md:mt-4">
              <p className="text-sm font-bold text-green-600">
                CREATE ACCOUNT
              </p>

              <h2 className="mt-2 text-3xl font-black text-slate-900">
                অ্যাকাউন্ট তৈরি করুন
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                শুরু করতে আপনার তথ্য দিন।
              </p>
            </div>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  নাম
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম"
                  autoComplete="name"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  ইমেইল
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  পাসওয়ার্ড
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  autoComplete="new-password"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-green-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-green-100 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                  : "অ্যাকাউন্ট তৈরি করুন"}
              </button>
            </form>

            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-medium text-slate-400">
                অথবা
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-sm text-slate-500">
              ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/signin"
                className="font-bold text-green-600 hover:text-green-700"
              >
                সাইন ইন করুন
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}