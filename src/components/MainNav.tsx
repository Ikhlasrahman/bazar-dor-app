import Image from "next/image";
import Link from "next/link";
import UserInfo from "./UserInfo";

const MainNav = () => {
  return (
    <div className="border-y border-base-300">
      <div className="flex w-full items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="বাজার দর লোগো"
              width={60}
              height={60}
            />
          </Link>

          <div className="flex flex-col">
            <Link href="/">
              <h1 className="whitespace-nowrap font-serif text-2xl font-bold leading-6 text-gray-800">
                বাজার দর
              </h1>
            </Link>

            <p className="whitespace-nowrap text-xs text-gray-600">
              {new Intl.DateTimeFormat("bn-BD", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date())}
            </p>
          </div>
        </div>

        <UserInfo />
      </div>
    </div>
  );
};

export default MainNav;