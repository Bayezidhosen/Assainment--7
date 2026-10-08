"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  if (isPending) {
    return (
      <section className="min-h-screen bg-[#f6faf7] px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="skeleton-box h-80 rounded-3xl" />
        </div>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl">🔐</div>

          <h1 className="mt-5 text-2xl font-black">
            আগে সাইন ইন করুন
          </h1>

          <button
            onClick={() => router.push("/signin")}
            className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
          >
            সাইন ইন
          </button>
        </div>
      </section>
    );
  }

  const user = session.user;

  if (!name && user.name) {
    setName(user.name);
  }

  if (!image && user.image) {
    setImage(user.image);
  }

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    const { error } = await authClient.updateUser({
      name: name.trim(),
      image: image.trim() || undefined,
    });

    setSaving(false);

    if (error) {
      setMessage(error.message || "Profile update করা যায়নি।");
      return;
    }

    setMessage("প্রোফাইল সফলভাবে আপডেট হয়েছে।");
    router.refresh();
  }

  async function handleLogout() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  const initial = user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <section className="min-h-screen bg-[#f6faf7] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="bg-green-600 px-6 py-10 text-center text-white sm:px-10">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl font-black text-green-600 shadow-lg">
              {initial}
            </div>

            <h1 className="mt-5 text-3xl font-black">
              {user.name || "ব্যবহারকারী"}
            </h1>

            <p className="mt-2 text-green-100">
              {user.email}
            </p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6 p-6 sm:p-10">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                নাম
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                placeholder="আপনার নাম"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Profile Image URL
              </label>

              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Email
              </label>

              <input
                value={user.email}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500"
              />
            </div>

            {message && (
              <div className="rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                {message}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "আপডেট হচ্ছে..." : "প্রোফাইল আপডেট"}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-red-200 px-6 py-3 font-bold text-red-600 hover:bg-red-50"
              >
                সাইন আউট
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}