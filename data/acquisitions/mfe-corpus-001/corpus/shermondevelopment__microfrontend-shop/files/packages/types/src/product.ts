export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[];
  weight: number;
  thumbnail: string;
}

export type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}
