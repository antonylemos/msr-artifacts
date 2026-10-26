import { QueryClientProvider } from '@tanstack/react-query';
import { createAppQueryClient } from '@microfrontend/shared';
import ProductsList from './ProductsList';

const queryClient = createAppQueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-blue-50 px-6 py-8">
        <ProductsList />
      </main>
    </QueryClientProvider>
  );
}

export default App;
