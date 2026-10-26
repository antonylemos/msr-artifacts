import { apiClient, queryKeys } from "@microfrontend/shared";
import type { Cart } from "@microfrontend/types";

export const cartQuery = {
  queryKey: queryKeys.products.getCart(),
  queryFn: () =>
    apiClient.get<Cart>(
      "https://dummyjson.com/cart/1",
    ),
};
