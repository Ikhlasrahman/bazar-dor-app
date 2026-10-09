
import type { Product } from "@/types/product";

const API_URL = "https://api.abcz.workers.dev/api/bazardor";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await response.json();

  return data;
}

export async function getProductById(
  id: string
): Promise<Product | null> {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }

  const data: Product = await response.json();

  return data;
}
