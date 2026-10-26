import "./index.css";
import { useQuery } from "@tanstack/react-query";
import { productsQuery } from "./api";
import { ProductCard } from "./components/Product";
import { ProductSkeleton } from '@microfrontend/ui';

function ProductsList() {
  const { data, error, isLoading } = useQuery(productsQuery);

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return (
      <p className="text-sm text-red-600">
        Nao foi possivel carregar os produtos.
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-5xl">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        Todos Produtos
      </h2>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data?.products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.thumbnail}
            name={product.title}
            weight={product.weight}
            price={product.price}
          />
        ))}
      </section>
    </section>
  );
}

export default ProductsList;
