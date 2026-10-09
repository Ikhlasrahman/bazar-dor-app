
import { notFound } from "next/navigation";
import { getProducts } from "@/services/productServices";
import { getCategories } from "@/services/categoryServices";
import ProductCard from "@/components/ProductCard";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (product) => product.category === category.slug
  );

  return (
    <main className="py-6">
      <section className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{category.icon}</span>

          <div>
            <h1 className="text-3xl font-bold">
              {category.nameBn}
            </h1>

            <p className="mt-1 text-sm text-base-content/70">
              মোট {categoryProducts.length}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>
        </div>
      </section>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-base-content/70">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </main>
  );
}
