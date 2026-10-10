
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <section className="rounded-3xl border border-base-300 bg-base-100 p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        {/* Left: Hero Content */}
        <div className="flex w-full flex-col items-start gap-4 md:max-w-xl">
          <span className="rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-green-700">
            {today}
          </span>

          <h1 className="text-3xl font-bold leading-tight text-base-content sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-base leading-7 text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link href="#products" className="btn mt-2 text-amber-50 bg-green-500">
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Right: Market Illustration */}
        <div
          className="flex w-full max-w-xs items-end justify-center gap-3 rounded-2xl bg-base-200/50 px-5 pb-6 pt-10 sm:max-w-sm"
          aria-hidden="true"
        >
          <Image src={'/bazar-hero.png'} height={263} width={315} alt="Logo"/>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
