
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

import { getProducts } from "@/services/productServices";
import Link from "next/link";

const PriceMarquee = async () => {
    const products = await getProducts();

    const tickerProducts = products.filter(
        (product) => product.change.dir !== "flat"
    );

    return (
        <div className="border-y border-base-300 bg-base-100">
            <div className="mx-auto flex max-w-7xl items-center">
                <div className="shrink-0 bg-green-600 px-4 py-3 font-bold text-primary-content">
                    বাজারদর
                </div>

                <div className="min-w-0 flex-1 overflow-hidden">
                    <MarqueeText
                        duration={20}
                        pauseOnHover={true}
                        direction="right"
                    >

                        {tickerProducts.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                className="inline-flex items-center gap-2 border-r border-base-300 px-5 py-3 transition-colors hover:bg-base-200"
                            >
                                <span>{product.categoryIcon}</span>

                                <span className="whitespace-nowrap text-sm font-medium">
                                    {product.nameBn} {product.today} টাকা/{product.unit}
                                </span>

                                <span
                                    className={
                                        product.change.dir === "up"
                                            ? "whitespace-nowrap text-sm font-semibold text-red-600"
                                            : "whitespace-nowrap text-sm font-semibold text-green-600"
                                    }
                                >
                                    {product.change.dir === "up" ? "▲" : "▼"}{" "}
                                    {product.change.pct}%
                                </span>
                            </Link>
                        ))}

                    </MarqueeText>
                </div>
            </div>
        </div>
    );
};

export default PriceMarquee;
