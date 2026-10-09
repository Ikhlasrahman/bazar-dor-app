
import type { Category } from "@/types/category";

const CATEGORY_API_URL =
  "https://api.abcz.workers.dev/api/bazardor/categories";

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(CATEGORY_API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: Category[] = await response.json();

  return data;
}
