import { apiClient, queryKeys } from "@microfrontend/shared";
import type { ProductsResponse } from "@microfrontend/types";

export const productsQuery = {
  queryKey: queryKeys.products.list(),
  queryFn: () =>
    apiClient.get<ProductsResponse>(
      "https://dummyjson.com/products?select=title,price,thumbnail,description,category,price,images,weight",
    ),
};
