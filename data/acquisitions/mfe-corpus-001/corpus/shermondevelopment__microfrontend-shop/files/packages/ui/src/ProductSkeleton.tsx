import { ProductCardSkeleton } from '@microfrontend/ui';

function ProductSkeleton() {
  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-4 h-8 w-48 animate-pulse rounded bg-slate-200" />

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </section>
    </section>
  );
}

export default ProductSkeleton;