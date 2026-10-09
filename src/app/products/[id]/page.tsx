
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById } from "@/services/productServices";

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="py-6">
      <Link
        href={`/category/${product.category}`}
        className="text-sm text-base-content/70 hover:text-success"
      >
        ← {product.categoryNameBn}
      </Link>

      <section className="mt-6 rounded-2xl border border-base-300 bg-base-100 p-6">
        <div className="flex items-start gap-4">
          <div className="text-5xl">{product.image}</div>

          <div>
            <h1 className="text-3xl font-bold">
              {product.nameBn}
            </h1>

            <p className="mt-2 text-base-content/60">
              {product.categoryNameBn} · প্রতি {product.unit}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-base-content/60">
            আজকের দাম
          </p>

          <p className="mt-1 text-3xl font-bold">
            ৳{product.today}
            <span className="ml-2 text-base font-normal">
              / {product.unit}
            </span>
          </p>

          <span
            className={`badge badge-sm mt-3 ${
              product.change.dir === "up"
                ? "border-red-200 bg-red-50 text-red-700"
                : product.change.dir === "down"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-base-300 bg-base-200 text-base-content/70"
            }`}
          >
            {product.change.dir === "up"
              ? "▲"
              : product.change.dir === "down"
                ? "▼"
                : "—"}{" "}
            {product.change.pct}%
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-base-200 p-4">
            <p className="text-sm text-base-content/60">
              গতকাল
            </p>
            <p className="mt-1 text-xl font-semibold">
              ৳{product.yesterday}
            </p>
          </div>

          <div className="rounded-xl bg-base-200 p-4">
            <p className="text-sm text-base-content/60">
              গত সপ্তাহ
            </p>
            <p className="mt-1 text-xl font-semibold">
              ৳{product.lastWeek}
            </p>
          </div>

          <div className="rounded-xl bg-base-200 p-4">
            <p className="text-sm text-base-content/60">
              গত মাস
            </p>
            <p className="mt-1 text-xl font-semibold">
              ৳{product.lastMonth}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">
          বিভিন্ন বাজারে দাম
        </h2>

        <div className="overflow-x-auto rounded-xl border border-base-300">
          <table className="table">
            <thead>
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th>সর্বনিম্ন দাম</th>
                <th>সর্বোচ্চ দাম</th>
              </tr>
            </thead>

            <tbody>
              {product.markets.map((market, index) => (
                <tr key={`${market.market}-${index}`}>
                  <td>{market.market}</td>
                  <td>{market.division}</td>
                  <td>৳{market.min}</td>
                  <td>৳{market.max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
