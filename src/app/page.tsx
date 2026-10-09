
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/services/productServices";

export default async function HomePage() {
  const products = await getProducts();
  const priceHikeProducts = products.filter(
    (product) => product.change.dir === "up"
  );

  const priceDownProducts = products.filter(
    (product) => product.change.dir === "down"
  );

  return (
    <main className="mx-auto max-w-7xl p-6">
     <HeroSection/>
      {/* Price Hike */}
      <section>

        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">
              <span className=" text-red-700">▲</span>
              আজ দাম বেড়েছে
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {priceHikeProducts.slice(0,6).map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </div>
        </section>

        {/* PriceDrop */}
         <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">
              <span className=" text-green-700">▼</span>
              আজ দাম কমেছে
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {priceDownProducts.slice(0,6).map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </div>
        </section>

      </section>
      <section>

        <div className="mb-4 flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">
            সব পণ্য
          </h2>

          <p className="text-sm text-base-content/70">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>


        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))}
        </div>
      </section>
    </main>
  );
}
