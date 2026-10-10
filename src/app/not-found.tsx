
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
            <span className="text-7xl font-extrabold tracking-tight text-success">
                404
            </span>

            <h1 className="mt-4 text-2xl font-bold text-base-content sm:text-3xl">
                পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
            </h1>

            <p className="mt-3 max-w-md text-base text-base-content/70">
                দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি পাওয়া যায়নি।
                ঠিকানাটি পরীক্ষা করুন অথবা হোম পেজে ফিরে যান।
            </p>

            <Link href="/" className="btn btn-success mt-6">
                হোম পেজে ফিরে যান
            </Link>
        </main>
    );
}
