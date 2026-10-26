function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-xl border-2 border-gray-300 bg-white p-8">
      <div className="h-40 w-full animate-pulse rounded bg-slate-200" />

      <div className="mt-2 h-12 animate-pulse rounded bg-slate-200" />

      <div className="mx-auto mt-2 h-5 w-16 animate-pulse rounded bg-slate-200" />

      <div className="mx-auto mt-2 h-6 w-24 animate-pulse rounded bg-slate-200" />

      <div className="mt-auto">
        <div className="mt-2 h-11 w-full animate-pulse rounded-lg bg-slate-200" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;