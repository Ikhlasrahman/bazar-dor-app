
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const handleEdit = () => {
        setName(user?.name || "");
        setImage(user?.image || "");
        setIsEditing(true);
    };

    const handleUpdate = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const updatedName = name.trim();
        const updatedImage = image.trim();

        if (!updatedName) {
            toast.error("আপনার নাম লিখুন");
            return;
        }

        if (updatedImage) {
            try {
                new URL(updatedImage);
            } catch {
                toast.error("সঠিক ছবির URL দিন");
                return;
            }
        }

        setIsUpdating(true);

        try {
            const { error } = await authClient.updateUser({
                name: updatedName,
                image: updatedImage || null,
            });

            if (error) {
                toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি");
                return;
            }

            toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে");
            setIsEditing(false);
            router.refresh();
        } catch {
            toast.error("আবার চেষ্টা করুন");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSignOut = async () => {
        setIsSigningOut(true);

        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error(error.message || "সাইন আউট করা যায়নি");
                return;
            }

            toast.success("সফলভাবে সাইন আউট হয়েছে");
            router.push("/signin");
            router.refresh();
        } catch {
            toast.error("আবার চেষ্টা করুন");
        } finally {
            setIsSigningOut(false);
        }
    };

    if (isPending) {
        return (
            <main className="min-h-[60vh]  px-4 py-12">
                <div className="mx-auto max-w-[736px] animate-pulse">
                    <div className="mb-8 h-10 w-48 rounded-lg bg-gray-200" />
                    <div className="h-32 rounded-2xl bg-white" />
                </div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
                <section className="w-full max-w-md rounded-2xl border border-[#DFE7DF] bg-[#FCFDFC] p-8 text-center">
                    <h1 className="text-2xl font-bold text-[#202820]">
                        সাইন ইন করুন
                    </h1>

                    <p className="mt-3 text-sm text-[#687368]">
                        আপনার প্রোফাইল দেখতে অ্যাকাউন্টে সাইন ইন করুন।
                    </p>

                    <Link
                        href="/signin"
                        className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-green-700 px-6 font-semibold text-white transition hover:bg-green-800"
                    >
                        সাইন ইন
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-[calc(100vh-220px)] bg-[#F0F5F0] px-4 py-10 sm:py-12">
            <div className="mx-auto w-full max-w-[736px]">
                {/* Page heading */}
                <header className="mb-7">
                    <h1 className="text-2xl font-bold tracking-tight text-[#202820] sm:text-3xl">
                        আমার প্রোফাইল
                    </h1>

                    <p className="mt-1 text-sm text-[#687368]">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </header>

                {/* Profile summary card */}
                <section className="flex flex-col gap-5 rounded-2xl border border-[#DFE7DF] bg-[#FCFDFC] p-5 sm:flex-row sm:items-center sm:p-6">
                    {/* Profile image */}
                    <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#EEF0EE]">
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name || "Profile picture"}
                                width={80}
                                height={80}
                                unoptimized
                                className="size-full object-cover"
                            />
                        ) : (
                            <span className="text-2xl font-semibold text-green-800">
                                {user.name?.charAt(0).toUpperCase() || "U"}
                            </span>
                        )}
                    </div>

                    {/* Name and email */}
                    <div className="min-w-0 flex-1">
                        <h2 className="wrap-break-word text-xl font-semibold text-[#202820] sm:text-2xl">
                            {user.name || "ব্যবহারকারী"}
                        </h2>

                        <p className="mt-1 break-all text-sm text-[#687368] sm:text-base">
                            {user.email}
                        </p>
                    </div>

                    {/* Sign out */}
                    <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-red-500 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                        {isSigningOut ? (
                            <span className="loading loading-spinner loading-xs" />
                        ) : (
                            <span aria-hidden="true">↶</span>
                        )}
                        সাইন আউট
                    </button>
                </section>

                {/* Information card */}
                <section className="mt-6 rounded-2xl border border-[#DFE7DF] bg-[#FCFDFC] p-5 sm:p-6">
                    <h2 className="text-lg font-bold text-[#202820]">
                        তথ্য
                    </h2>

                    <form onSubmit={handleUpdate} className="mt-6">
                        {/* Name field */}
                        <div>
                            <label
                                htmlFor="profile-name"
                                className="mb-2 block text-sm font-medium text-[#202820]"
                            >
                                নাম
                            </label>

                            <input
                                id="profile-name"
                                name="name"
                                type="text"
                                value={isEditing ? name : user.name || ""}
                                onChange={(e) => setName(e.target.value)}
                                readOnly={!isEditing}
                                required
                                className={`h-11 w-full rounded-lg border border-[#DFE7DF] px-4 text-sm text-[#202820] outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/10 ${isEditing ? "bg-white" : "bg-transparent"
                                    }`}
                            />
                        </div>

                        {/* Image URL field */}
                        <div className="mt-5">
                            <label
                                htmlFor="profile-image"
                                className="mb-2 block text-sm font-medium text-[#202820]"
                            >
                                প্রোফাইল ছবির URL
                            </label>

                            <input
                                id="profile-image"
                                name="image"
                                type="url"
                                value={isEditing ? image : user.image || ""}
                                onChange={(e) => setImage(e.target.value)}
                                readOnly={!isEditing}
                                placeholder="https://example.com/photo.jpg"
                                className={`h-11 w-full rounded-lg border border-[#DFE7DF] px-4 text-sm text-[#202820] outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/10 ${isEditing ? "bg-white" : "bg-transparent"
                                    }`}
                            />
                        </div>

                        {/* Actions */}
                        {isEditing ? (
                            <div className="mt-4 flex gap-3">
                                <button
                                    type="button"
                                    disabled={isUpdating}
                                    onClick={() => {
                                        setIsEditing(false);
                                        setName(user.name || "");
                                        setImage(user.image || "");
                                    }}
                                    className="h-11 rounded-lg border border-[#DFE7DF] px-5 text-sm font-medium text-[#202820] transition hover:bg-gray-50 disabled:opacity-50"
                                >
                                    বাতিল
                                </button>

                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="btn h-11 flex-1 border-green-700 bg-green-700 text-sm font-semibold text-white shadow-md hover:border-green-800 hover:bg-green-800"
                                >
                                    {isUpdating ? (
                                        <>
                                            <span className="loading loading-spinner loading-xs" />
                                            আপডেট হচ্ছে...
                                        </>
                                    ) : (
                                        "আপডেট"
                                    )}
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={handleEdit}
                                className="btn mt-4 h-11 w-full border-green-700 bg-green-700 text-sm font-semibold text-white shadow-md hover:border-green-800 hover:bg-green-800"
                            >
                                আপডেট
                            </button>
                        )}
                    </form>
                </section>
            </div>
        </main>
    );
}
