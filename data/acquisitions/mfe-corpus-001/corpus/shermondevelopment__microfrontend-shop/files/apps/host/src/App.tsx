import { lazy, Suspense } from 'react';
import { HeaderSkeleton, ProductSkeleton, FooterSkeleton } from '@microfrontend/ui';
import { RemoteErrorBoundary } from './components/RemoteErrorBoundary';

const Header = lazy(() => import('header/Header'));
const Footer = lazy(() => import('footer/Footer'));
const ProductsList = lazy(() => import('products/ProductsList'));

function App() {
  return (
    <main className="flex min-h-screen flex-col">
      <RemoteErrorBoundary remoteName="Header">
        <Suspense fallback={<HeaderSkeleton />}>
          <Header />
        </Suspense>
      </RemoteErrorBoundary>

      <section className="flex-1 px-6 py-8">
        <RemoteErrorBoundary remoteName="Produtos">
          <Suspense fallback={<ProductSkeleton />}>
            <ProductsList />
          </Suspense>
        </RemoteErrorBoundary>
      </section>

      <RemoteErrorBoundary remoteName="Footer">
        <Suspense fallback={<FooterSkeleton />}>
          <Footer />
        </Suspense>
      </RemoteErrorBoundary>
    </main>
  );
}

export default App;
