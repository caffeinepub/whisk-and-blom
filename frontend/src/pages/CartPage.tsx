import { Link, useNavigate } from '@tanstack/react-router';
import { useCart, useAddToCart } from '../hooks/useCart';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CartItem from '../components/CartItem';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function CartPage() {
  const navigate = useNavigate();
  const { data: cartItems, isLoading, refetch } = useCart();
  const addToCart = useAddToCart();

  const handleUpdateQuantity = async (productId: bigint, quantity: number) => {
    try {
      await addToCart.mutateAsync({ productId, quantity: BigInt(quantity) });
      await refetch();
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemove = async (productId: bigint) => {
    // To remove, we'd need a backend method. For now, we'll show a message
    toast.info('Remove functionality requires backend support');
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const isEmpty = !cartItems || cartItems.length === 0;
  const total = cartItems?.reduce(
    (sum, item) => sum + Number(item.product.price) * Number(item.quantity),
    0
  ) || 0;

  if (isEmpty) {
    return (
      <div className="container py-24">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">
            Discover our beautiful natural food colours and start creating!
          </p>
          <Button size="lg" onClick={() => navigate({ to: '/products' })}>
            Explore Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/products' })}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Button>
        <h1 className="font-display text-4xl font-bold">Shopping Cart</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.product.id.toString()}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-muted/30 rounded-xl p-6 space-y-6 sticky top-24">
            <h2 className="font-semibold text-xl">Order Summary</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-2xl text-primary">${total}</span>
            </div>
            
            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate({ to: '/checkout' })}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
