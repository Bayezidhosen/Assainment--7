"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();

    router.refresh();
    router.push("/");
  }

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#f6faf7] px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-sm">
          <div className="animate-pulse">
            <div className="h-20 w-20 rounded-full bg-slate-200" />

            <div className="mt-5 h-7 w-48 rounded bg-slate-200" />

            <div className="mt-3 h-5 w-64 rounded bg-slate-200" />
          </div>
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f6faf7] px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="text-6xl">🔐</div>

          <h1 className="mt-5 text-2xl font-black text-slate-900">
            আগে সাইন ইন করুন
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            প্রোফাইল দেখতে আপনার অ্যাকাউন্টে সাইন ইন করতে হবে।
          </p>

          <Link
            href="/signin"
            className="mt-7 inline-flex rounded-2xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </main>
    );
  }

  const firstLetter = (
    session.user.name ||
    session.user.email ||
    "U"
  )
    .charAt(0)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-[#f6faf7] px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-sm font-bold text-green-600 hover:text-green-700"
        >
          ← হোমে ফিরে যান
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-10 sm:px-10">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl font-black text-green-600 shadow-lg">
              {firstLetter}
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <p className="text-sm font-bold text-green-600">
              MY PROFILE
            </p>

            <h1 className="mt-2 text-3xl font-black text-slate-900">
              {session.user.name || "User"}
            </h1>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-400">
                  নাম
                </p>

                <p className="mt-1 font-bold text-slate-800">
                  {session.user.name || "নাম নেই"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-400">
                  ইমেইল
                </p>

                <p className="mt-1 break-all font-bold text-slate-800">
                  {session.user.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="mt-8 w-full rounded-2xl border border-red-200 px-5 py-3.5 font-bold text-red-500 transition hover:bg-red-50"
            >
              সাইন আউট
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}