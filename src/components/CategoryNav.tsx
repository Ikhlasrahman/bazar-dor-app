import Link from "next/link";
import { getCategories } from "@/services/categoryServices";

export default async function CategoryNav() {
  const categories = await getCategories();

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="flex flex-wrap justify-start gap-4 py-3"
    >
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/category/${cat.slug}`}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-base-200 hover:text-primary"
        >
          <span>{cat.icon}</span>
          <span>{cat.nameBn}</span>
        </Link>
      ))}
    </nav>
  );
}
