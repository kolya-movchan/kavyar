
import { Category } from "./Category";

export interface Product {
  id: number,
  name: string,
  price?: string | number,
  value?: string,
  description?: string
  category?: Category,
}

export type ProductForAPI = (Pick<Product, "id" | "price">);
