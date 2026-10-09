
"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function AuthUser() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="rounded-2xl bg-white p-4 text-sm text-slate-500 shadow-sm">
        ইউজারের তথ্য লোড হচ্ছে...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-bold text-slate-900">
            বাজার দর-এ স্বাগতম!
          </p>
          <p className="mt-1 text-sm text-slate-500">
            আপনার অ্যাকাউন্টে প্রবেশ করুন।
          </p>
        </div>

        <Link
          href="/signin"
          className="inline-flex justify-center rounded-xl bg-green-600 px-5 py-2.5 font-bold text-white transition hover:bg-green-700"
        >
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-green-200 bg-white p-5 shadow-sm">
      <p className="font-bold text-green-700">
        <span aria-hidden="true">✓ </span>
        লগইন সফল!
      </p>

      <div className="mt-3 space-y-2 text-sm text-slate-700">
        <p>
          <span className="font-bold">নাম:</span>{" "}
          {session.user.name || "নাম পাওয়া যায়নি"}
        </p>

        <p className="break-all">
          <span className="font-bold">ইমেইল:</span>{" "}
          {session.user.email || "ইমেইল পাওয়া যায়নি"}
        </p>

        <p className="break-all">
          <span className="font-bold">User ID:</span>{" "}
          {session.user.id}
        </p>
      </div>
    </div>
  );
}