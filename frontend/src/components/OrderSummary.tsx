import { Separator } from '@/components/ui/separator';
import { useCart } from '../hooks/useCart';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrderSummary() {
  const { data: cartItems, isLoading: itemsLoading } = useCart();
  const { data: total, isLoading: totalLoading } = useCart();

  if (itemsLoading || totalLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  const cartTotal = total || 0;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Order Summary</h3>
      
      <div className="space-y-2">
        {cartItems?.map((item) => (
          <div key={item.product.id.toString()} className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {item.product.name} × {item.quantity.toString()}
            </span>
            <span className="font-medium">
              ${Number(item.product.price) * Number(item.quantity)}
            </span>
          </div>
        ))}
      </div>
      
      <Separator />
      
      <div className="flex justify-between items-center">
        <span className="font-semibold text-lg">Total</span>
        <span className="font-bold text-2xl text-primary">
          ${Number(cartTotal)}
        </span>
      </div>
    </div>
  );
}
