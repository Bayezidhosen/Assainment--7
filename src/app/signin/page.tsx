"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");

        if (!email.trim()) {
            setError("আপনার ইমেইল লিখুন।");
            return;
        }

        if (!password) {
            setError("আপনার পাসওয়ার্ড লিখুন।");
            return;
        }

        try {
            setLoading(true);

            const { error } = await authClient.signIn.email({
                email: email.trim(),
                password,
            });

            if (error) {
                setError(
                    error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
                );
                return;
            }

            router.push("/");
            router.refresh();
        } catch {
            setError("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#f6faf7] px-4 py-12 sm:py-16">
            <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl md:grid-cols-2">

                {/* Left */}
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
                                WELCOME BACK
                            </p>

                            <h1 className="mt-3 text-4xl font-black leading-tight">
                                আবার ফিরে আসুন,
                                <br />
                                বাজারদর দেখুন।
                            </h1>

                            <p className="mt-5 max-w-sm leading-7 text-green-50">
                                আপনার অ্যাকাউন্টে সাইন ইন করুন এবং
                                প্রয়োজনীয় পণ্যের বাজারদর এক নজরে দেখুন।
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-green-100">
                        © ২০২৬ বাজার দর
                    </p>
                </div>

                {/* Right */}
                <div className="p-6 sm:p-10">
                    <div className="mx-auto max-w-md">

                        {/* Mobile logo */}
                        <div className="md:hidden">
                            <Link
                                href="/"
                                className="text-xl font-black text-slate-900"
                            >
                                🛒 বাজার দর
                            </Link>
                        </div>

                        {/* Heading */}
                        <div className="mt-8 md:mt-4">
                            <p className="text-sm font-bold text-green-600">
                                SIGN IN
                            </p>

                            <h2 className="mt-2 text-3xl font-black text-slate-900">
                                সাইন ইন করুন
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন।
                            </p>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="mt-7 space-y-5"
                        >
                            {/* Email */}
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

                            {/* Password */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-bold text-slate-700"
                                    >
                                        পাসওয়ার্ড
                                    </label>
                                </div>

                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="আপনার পাসওয়ার্ড"
                                    autoComplete="current-password"
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-2xl bg-green-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-green-100 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "সাইন ইন হচ্ছে..."
                                    : "সাইন ইন করুন"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-7 flex items-center gap-3">
                            <div className="h-px flex-1 bg-slate-200" />

                            <span className="text-xs font-medium text-slate-400">
                                অথবা
                            </span>

                            <div className="h-px flex-1 bg-slate-200" />
                        </div>

                        {/* Social buttons - next step */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={async () => {
                                    await authClient.signIn.social({
                                        provider: "google",
                                    });
                                }}
                                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                            >
                                Google
                            </button>

                            <button
                                type="button"
                                onClick={async () => {
                                    await authClient.signIn.social({
                                        provider: "github",
                                    });
                                }}
                                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                            >
                                GitHub
                            </button>
                        </div>

                        {/* Sign up */}
                        <p className="mt-7 text-center text-sm text-slate-500">
                            অ্যাকাউন্ট নেই?{" "}
                            <Link
                                href="/signup"
                                className="font-bold text-green-600 hover:text-green-700"
                            >
                                সাইন আপ করুন
                            </Link>
                        </p>

                        {/* Home */}
                        <div className="mt-5 text-center">
                            <Link
                                href="/"
                                className="text-sm font-semibold text-slate-400 hover:text-green-600"
                            >
                                ← হোমে ফিরে যান
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}