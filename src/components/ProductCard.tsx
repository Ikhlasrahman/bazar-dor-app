
import type { Product } from "@/types/product";
import Link from "next/link";

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <article className="card border border-base-300 bg-base-100 shadow-sm">
            <Link href={`/products/${product.id}`} className="card border border-base-300 bg-base-100 shadow-sm transition hover:border-success hover:shadow-md">
                <div className="card-body">
                <div className="flex items-center gap-3">
                    <div className="text-3xl">{product.image}</div>

                    <div>
                        <h3 className="card-title text-lg">{product.nameBn}</h3>
                        <p className="text-sm text-base-content/60">
                            {product.categoryNameBn} · প্রতি {product.unit}
                        </p>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-sm text-base-content/60">আজকের দাম</p>
                    <p className="text-2xl font-bold">
                        ৳{product.today}
                        <span className="ml-1 text-sm font-normal">
                            / {product.unit}
                        </span>
                    </p>
                </div>

                <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-base-content/60">
                        গতকাল: ৳{product.yesterday}
                    </span>

                    <span
                        className={`badge badge-sm ${product.change.dir === "up"
                                ? " bg-red-50 text-red-700"
                                : product.change.dir === "down"
                                    ? " bg-green-50 text-green-700"
                                    : " bg-base-200 text-base-content/70"
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
            </div>
            </Link>
        </article>
    );
}
