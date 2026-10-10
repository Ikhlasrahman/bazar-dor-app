
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState("");

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "Sign in failed");
                return;
            }

            if (data) {
                toast.success("সফলভাবে সাইন ইন হয়েছে");
                router.push("/");
                router.refresh();
            }
        } catch {
            toast.error("আবার চেষ্টা করুন।");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialSignIn = async (
        provider: "google" | "github"
    ) => {
        setSocialLoading(provider);

        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "Social sign in failed");
                setSocialLoading("");
            }
        } catch {
            toast.error("আবার চেষ্টা করুন।");
            setSocialLoading("");
        }
    };

    return (
        <main className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center bg-base-200/40 px-4 py-12">
            {/* Heading */}
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-black">
                    সাইন ইন
                </h1>
                <p className="mt-2 text-sm text-gray-400">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </header>

            {/* Form Card */}
            <section className="w-full max-w-125 rounded-2xl border border-gray-200 bg-[#FAFCFA] p-6 text-gray-800 shadow-sm sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="signin-email"
                            className="mb-2 block text-sm font-semibold"
                        >
                            ইমেইল
                        </label>
                        <input
                            id="signin-email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="input input-bordered w-full border-gray-200 bg-transparent text-gray-800 focus:border-green-600 focus:outline-none"
                            autoComplete="email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="signin-password"
                            className="mb-2 block text-sm font-semibold"
                        >
                            পাসওয়ার্ড
                        </label>
                        <input
                            id="signin-password"
                            name="password"
                            type="password"
                            placeholder="আপনার পাসওয়ার্ড লিখুন"
                            className="input input-bordered w-full border-gray-200 bg-transparent text-gray-800 focus:border-green-600 focus:outline-none"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading || !!socialLoading}
                        className="btn mt-1 w-full border-green-700 bg-green-700 text-white shadow-md hover:border-green-800 hover:bg-green-800"
                    >
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner loading-sm" />
                                সাইন ইন হচ্ছে...
                            </>
                        ) : (
                            "সাইন ইন"
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-5 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-sm text-gray-500">অথবা</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                {/* Social buttons */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                        type="button"
                        disabled={isLoading || !!socialLoading}
                        onClick={() => handleSocialSignIn("google")}
                        className="btn h-auto min-h-12 border border-gray-200 bg-transparent px-3 text-gray-800 shadow-none hover:bg-gray-100"
                    >
                        {socialLoading === "google" ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : (
                            <span className="font-bold text-lg text-blue-600">G</span>
                        )}
                        Google দিয়ে চালিয়ে যান
                    </button>

                    <button
                        type="button"
                        disabled={isLoading || !!socialLoading}
                        onClick={() => handleSocialSignIn("github")}
                        className="btn h-auto min-h-12 border border-gray-200 bg-transparent px-3 text-gray-800 shadow-none hover:bg-gray-100"
                    >
                        {socialLoading === "github" ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : (
                            <span className="font-bold text-lg">GH</span>
                        )}
                        GitHub দিয়ে চালিয়ে যান
                    </button>
                </div>

                {/* Sign-up link */}
                <p className="mt-5 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link
                        href="/signup"
                        className="font-medium text-green-700 hover:text-green-800"
                    >
                        সাইন আপ করুন
                    </Link>
                </p>
            </section>

            {/* Back to home */}
            <Link
                href="/"
                className="mt-7 text-sm text-gray-400 transition hover:text-white"
            >
                ← হোম পেজে ফিরে যান
            </Link>
        </main>
    );
}
