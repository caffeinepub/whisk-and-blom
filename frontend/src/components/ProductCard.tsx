import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import type { Product } from '../backend';

interface ProductCardProps {
  product: Product;
}

const productImageMap: Record<string, string> = {
  'red.png': '/assets/generated/product-red.dim_800x800.png',
  'yellow.png': '/assets/generated/product-yellow.dim_800x800.png',
  'blue.png': '/assets/generated/product-blue.dim_800x800.png',
  'green.png': '/assets/generated/product-green.dim_800x800.png',
};

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const imageUrl = productImageMap[product.imageUrl] || '/assets/generated/product-red.dim_800x800.png';

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-soft"
      onClick={() => navigate({ to: '/products/$id', params: { id: product.id.toString() } })}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">
          ${Number(product.price)}
        </span>
        <Button 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate({ to: '/products/$id', params: { id: product.id.toString() } });
          }}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
