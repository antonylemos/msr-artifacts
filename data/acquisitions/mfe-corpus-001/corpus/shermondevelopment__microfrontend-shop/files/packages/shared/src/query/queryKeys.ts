export const queryKeys = {
  products: {
    all: ['products'] as const,
    list: () => ['products', 'list'] as const,
    detail: (id: string) => ['products', id] as const,
    getCart: () => ['cart'] as const,
  },
};
