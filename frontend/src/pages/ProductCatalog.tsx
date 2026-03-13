import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductCatalog() {
  const { data: products, isLoading } = useProducts();

  return (
    <div className="container py-12">
      <div className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Our Natural Food Colours
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Explore our complete collection of natural food colours, each carefully 
          extracted from botanical sources to bring vibrant, safe colours to your creations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))
        ) : (
          products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
