
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const UserInfo = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const user = session?.user;

  const handleSignout = async () => {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Sign out failed");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <span className="loading loading-spinner loading-sm text-success" />
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {user ? (
        <div className="flex items-center gap-3">
          {/* Profile */}
          <Link
            href="/profile"
            className="flex items-center gap-2"
          >
            <div className="avatar">
              <div className="w-10 overflow-hidden rounded-full ring-2 ring-success ring-offset-2 ring-offset-base-100">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User profile"}
                    width={40}
                    height={40}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-success text-lg font-semibold text-white">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>
            </div>

            <span className="hidden font-medium text-base-content sm:inline">
              {user.name}
            </span>
          </Link>

          {/* Sign Out */}
          <button
            type="button"
            className="btn btn-outline btn-error btn-sm"
            onClick={handleSignout}
            disabled={isSigningOut}
          >
            {isSigningOut ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              "সাইন আউট"
            )}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/signin" className="btn btn-ghost btn-sm">
            সাইন ইন
          </Link>

          <Link href="/signup" className="btn bg-green-600 text-white btn-sm">
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
