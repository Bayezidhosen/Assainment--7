
"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type SocialProvider = "google" | "github";

export default function SignInPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] =
        useState<SocialProvider | null>(null);
    const [error, setError] = useState("");

    const isBusy = loading || socialLoading !== null;

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        setError("");

        const cleanEmail = email.trim().toLowerCase();

        if (!cleanEmail) {
            setError("আপনার ইমেইল লিখুন।");
            return;
        }

        if (!cleanEmail.includes("@")) {
            setError("সঠিক ইমেইল ঠিকানা দিন।");
            return;
        }

        if (!password) {
            setError("আপনার পাসওয়ার্ড লিখুন।");
            return;
        }

        if (isBusy) return;

        try {
            setLoading(true);

            const result = await authClient.signIn.email({
                email: cleanEmail,
                password,
            });

            if (result.error) {
                console.error("SIGN IN ERROR:", result.error);

                setError(
                    result.error.message ||
                    "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
                );
                return;
            }

            router.replace("/");
            router.refresh();
        } catch (err) {
            console.error("SIGN IN ERROR:", err);
            setError("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    }

    async function handleSocialSignIn(
        provider: SocialProvider
    ) {
        if (isBusy) return;

        setError("");

        try {
            setSocialLoading(provider);

            const result = await authClient.signIn.social({
                provider,
                callbackURL: "/",
                errorCallbackURL: "/signin?error=oauth",
            });

            if (result.error) {
                console.error(
                    `${provider} SIGN IN ERROR:`,
                    result.error
                );

                setError(
                    provider === "google"
                        ? "Google দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
                        : "GitHub দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
                );

                setSocialLoading(null);
            }
        } catch (err) {
            console.error(`${provider} SIGN IN ERROR:`, err);

            setError(
                provider === "google"
                    ? "Google দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
                    : "GitHub দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।"
            );

            setSocialLoading(null);
        }
    }

    return (
        <main className="min-h-screen bg-[#f6faf7] px-4 py-12 sm:py-16">
            <div className="mx-auto grid max-w-5xl overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-xl md:grid-cols-2">

                {/* Left */}
                <div className="hidden bg-linear-to-br from-green-600 to-emerald-700 p-10 text-white md:flex md:flex-col md:justify-between">
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
                            <div
                                role="alert"
                                className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-600"
                            >
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
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                        setError("");
                                    }}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                    disabled={isBusy}
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 disabled:bg-slate-50"
                                />
                            </div>

                            {/* Password */}
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
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                        setError("");
                                    }}
                                    placeholder="আপনার পাসওয়ার্ড"
                                    autoComplete="current-password"
                                    required
                                    disabled={isBusy}
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 disabled:bg-slate-50"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isBusy}
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

                        {/* Social buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* Google */}
                            <button
                                type="button"
                                onClick={() => handleSocialSignIn("google")}
                                disabled={isBusy}
                                className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {socialLoading === "google" ? (
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-green-600" />
                                ) : (
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill="#4285F4"
                                            d="M23.49 12.27c0-.8-.07-1.58-.21-2.33H12v4.38h6.47a6.98 6.98 0 0 1-2.77 3.88v2.88h3.68c2.16-1.99 4.11-5.06 4.11-8.81Z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 24c3.08 0 5.66-1.01 7.38-2.92L15.7 18.2c-.98.66-2.22 1.11-3.7 1.11-2.97 0-5.49-2.01-6.36-4.72H1.84v2.97C3.55 21.37 7.47 24 12 24Z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.64 14.59a7.2 7.2 0 0 1 0-4.18V7.44H1.84a12 12 0 0 0 0 10.12l3.8-2.97Z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.69c1.67 0 3.16.58 4.34 1.71l3.12-3.12C17.65 2.6 15.08 1.5 12 1.5c-4.53 0-8.45 2.63-10.16 6.44l3.8 2.97C6.51 8.2 9.03 5.69 12 5.69Z"
                                        />
                                    </svg>
                                )}

                                {socialLoading === "google"
                                    ? "Google..."
                                    : "Google"}
                            </button>

                            {/* GitHub */}
                            <button
                                type="button"
                                onClick={() => handleSocialSignIn("github")}
                                disabled={isBusy}
                                className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#24292f] px-5 py-4 text-base font-bold text-white shadow-sm transition hover:bg-[#1f2328] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {socialLoading === "github" ? (
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                ) : (
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.13c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.95.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.35.78 1.04.78 2.1v3.12c0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                                    </svg>
                                )}

                                {socialLoading === "github"
                                    ? "GitHub..."
                                    : "GitHub"}
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