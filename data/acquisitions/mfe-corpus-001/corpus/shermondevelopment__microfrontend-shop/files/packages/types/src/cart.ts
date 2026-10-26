export type CartProduct = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  thumbnail: string;
};

export type Cart = {
  products: CartProduct[];
  total: number;
};