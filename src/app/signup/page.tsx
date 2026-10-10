
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState("");

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get("name") ?? "");
        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");
        const image = String(formData.get("image") ?? "").trim();

        try {
            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password,
                ...(image ? { image } : {}),
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "Sign up failed");
                return;
            }

            if (data) {
                toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে");
                router.push("/");
                router.refresh();
            }
        } catch {
            toast.error("আবার চেষ্টা করুন।");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialSignUp = async (
        provider: "google" | "github"
    ) => {
        setSocialLoading(provider);

        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "Social sign up failed");
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
                <h1 className="text-3xl font-bold text-white">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>
                <p className="mt-2 text-sm text-gray-400">
                    বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </header>

            {/* Form Card */}
            <section className="w-full max-w-125 rounded-2xl border border-gray-200 bg-[#FAFCFA] p-6 text-gray-800 shadow-sm sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-semibold"
                        >
                            নাম
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="যেমন: রহিম উদ্দিন"
                            className="input input-bordered w-full border-gray-200 bg-transparent text-gray-800 focus:border-green-600 focus:outline-none"
                            autoComplete="name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="signup-email"
                            className="mb-2 block text-sm font-semibold"
                        >
                            ইমেইল
                        </label>
                        <input
                            id="signup-email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="input input-bordered w-full border-gray-200 bg-transparent text-gray-800 focus:border-green-600 focus:outline-none"
                            autoComplete="email"
                            required
                        />
                    </div>

                    {/* Optional image URL */}
                    <div>
                        <label
                            htmlFor="image"
                            className="mb-2 flex items-center justify-between text-sm font-semibold"
                        >
                            প্রোফাইল ছবির URL
                            <span className="font-normal text-gray-400">
                                ঐচ্ছিক
                            </span>
                        </label>
                        <input
                            id="image"
                            name="image"
                            type="url"
                            placeholder="https://example.com/photo.jpg"
                            className="input input-bordered w-full border-gray-200 bg-transparent text-gray-800 focus:border-green-600 focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="signup-password"
                            className="mb-2 block text-sm font-semibold"
                        >
                            পাসওয়ার্ড
                        </label>
                        <input
                            id="signup-password"
                            name="password"
                            type="password"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="input input-bordered w-full border-gray-200 bg-transparent text-gray-800 focus:border-green-600 focus:outline-none"
                            autoComplete="new-password"
                            minLength={8}
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
                                অ্যাকাউন্ট তৈরি হচ্ছে...
                            </>
                        ) : (
                            "অ্যাকাউন্ট তৈরি করুন"
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
                        onClick={() => handleSocialSignUp("google")}
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
                        onClick={() => handleSocialSignUp("github")}
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

                {/* Sign in link */}
                <p className="mt-5 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট আছে?{" "}
                    <Link
                        href="/signin"
                        className="font-medium text-green-700 hover:text-green-800"
                    >
                        সাইন ইন করুন
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
