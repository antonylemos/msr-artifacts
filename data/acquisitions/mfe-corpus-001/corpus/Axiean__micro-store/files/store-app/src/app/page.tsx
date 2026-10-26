import { ProductCard } from "@/components/ProductCart";

// Define the shape of the product data fetched from the API for type safety.
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

/**
 * Enables Incremental Static Regeneration (ISR) for this page.
 * Next.js will serve a cached, static version of this page for fast initial loads.
 * In the background, it will re-fetch the data at most once every hour (3600 seconds)
 * to ensure the product list stays reasonably fresh without sacrificing performance.
 */
export const revalidate = 3600;

/**
 * Fetches product data on the server at build time and during revalidation.
 * This server-side approach improves SEO and performance by delivering a fully
 * rendered HTML page to the client.
 */
async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate }, // This uses the revalidate value defined above.
  });

  if (!res.ok) {
    // This will be caught by the nearest error boundary.
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="bg-slate-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          Our Latest Collection
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
          Discover high-quality products from our Fake Store API.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.title}
            price={product.price}
            imageUrl={product.image}
          />
        ))}
      </div>
    </main>
  );
}
