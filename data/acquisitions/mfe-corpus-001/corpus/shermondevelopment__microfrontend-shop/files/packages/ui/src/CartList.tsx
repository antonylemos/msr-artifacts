import type { CartProduct } from "@microfrontend/types";

type CartListProps = {
  products: CartProduct[];
  onRemoveAll?: (id: number) => void;
};

function CartList({
  products,
  onRemoveAll,
}: CartListProps) {
  if (products.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-gray-500">
          Nenhum produto adicionado ao carrinho.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center gap-4 border-b pb-4"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-16 w-16 rounded-lg object-cover"
          />

          <div className="flex-1">
            <h3 className="line-clamp-1 font-medium">
              {product.title}
            </h3>

            <p className="text-sm text-gray-500">
              ${product.price}
            </p>
          </div>
          {onRemoveAll && (
            <button
              onClick={() => onRemoveAll(product.id)}
              className="rounded-md px-3 py-1 text-sm font-medium text-red-500 transition hover:bg-red-50 hover:text-red-600"
            >
              Remover
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default CartList;