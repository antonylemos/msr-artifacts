function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 animate-pulse rounded bg-slate-200" />
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <div className="h-4 w-11 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-12 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-14 animate-pulse rounded bg-slate-200" />
        </nav>

        <div className="flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-full border border-gray-200 bg-slate-200 shadow-sm" />
          <div className="h-10 w-10 animate-pulse rounded-full border border-gray-200 bg-slate-200 shadow-sm" />
          <div className="h-11 w-11 animate-pulse rounded-full border border-gray-200 bg-slate-200 shadow-sm md:hidden" />
        </div>
      </div>
    </header>
  );
}

export default HeaderSkeleton;
