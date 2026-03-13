import { useState } from 'react';
import { useParams, useNavigate, Link } from '@tanstack/react-router';
import { useProduct } from '../hooks/useProduct';
import { useAddToCart } from '../hooks/useCart';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import QuantitySelector from '../components/QuantitySelector';
import { ArrowLeft, Check, Leaf, Shield, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const productImageMap: Record<string, string> = {
  'red.png': '/assets/generated/product-red.dim_800x800.png',
  'yellow.png': '/assets/generated/product-yellow.dim_800x800.png',
  'blue.png': '/assets/generated/product-blue.dim_800x800.png',
  'green.png': '/assets/generated/product-green.dim_800x800.png',
};

const productDetails: Record<string, { fullDescription: string; ingredients: string; uses: string[] }> = {
  '1': {
    fullDescription: 'Our Natural Red Color is extracted from premium beetroots, providing a vibrant, deep red hue perfect for a wide range of culinary applications. This natural colorant maintains its brilliance in both hot and cold preparations.',
    ingredients: 'Organic beetroot extract, water',
    uses: ['Baking (cakes, cookies, macarons)', 'Frosting and icing', 'Beverages', 'Pasta and noodles', 'Confectionery'],
  },
  '2': {
    fullDescription: 'Derived from high-quality turmeric root, our Natural Yellow Color delivers a warm, golden-yellow tone with subtle earthy notes. This versatile colorant is perfect for both sweet and savory dishes.',
    ingredients: 'Organic turmeric extract, water',
    uses: ['Curries and rice dishes', 'Baked goods', 'Smoothies and beverages', 'Pasta and sauces', 'Dairy products'],
  },
  '3': {
    fullDescription: 'Our Natural Blue Color is carefully extracted from butterfly pea flowers and blueberries, creating a stunning blue shade that transforms your culinary creations. This unique colorant is pH-sensitive and can shift to purple tones.',
    ingredients: 'Butterfly pea flower extract, blueberry extract, water',
    uses: ['Cocktails and mocktails', 'Desserts and pastries', 'Ice cream and frozen treats', 'Decorative icing', 'Specialty beverages'],
  },
};

export default function ProductDetailPage() {
  const { id } = useParams({ from: '/products/$id' });
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(BigInt(id));
  const addToCart = useAddToCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAdding(true);
    try {
      await addToCart.mutateAsync({
        productId: product.id,
        quantity: BigInt(quantity),
      });
      toast.success('Added to cart!', {
        description: `${quantity} × ${product.name}`,
      });
    } catch (error) {
      toast.error('Failed to add to cart', {
        description: 'Please try again',
      });
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <Skeleton className="h-8 w-64 mb-8" />
        <div className="grid md:grid-cols-2 gap-12">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button onClick={() => navigate({ to: '/products' })}>
          Back to Products
        </Button>
      </div>
    );
  }

  const imageUrl = productImageMap[product.imageUrl] || '/assets/generated/product-red.dim_800x800.png';
  const details = productDetails[id] || {
    fullDescription: product.description,
    ingredients: 'Natural botanical extracts',
    uses: ['Various culinary applications'],
  };

  return (
    <div className="container py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/products">Products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-primary">
              ${Number(product.price)}
            </p>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {details.fullDescription}
          </p>

          <div className="flex items-center gap-6 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Leaf className="h-5 w-5 text-secondary" />
              <span>100% Natural</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-5 w-5 text-secondary" />
              <span>Food Safe</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-5 w-5 text-secondary" />
              <span>Vibrant Color</span>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity:</span>
              <QuantitySelector value={quantity} onChange={setQuantity} />
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold">Ingredients</h2>
          <p className="text-muted-foreground">{details.ingredients}</p>
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold">Perfect For</h2>
          <ul className="space-y-2">
            {details.uses.map((use, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{use}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
