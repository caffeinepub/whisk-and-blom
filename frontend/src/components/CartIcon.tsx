import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { useCart } from '../hooks/useCart';

export default function CartIcon() {
  const navigate = useNavigate();
  const { data: cartItems, isLoading } = useCart();
  
  const itemCount = cartItems?.reduce((sum, item) => sum + Number(item.quantity), 0) || 0;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={() => navigate({ to: '/cart' })}
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
          {itemCount}
        </span>
      )}
    </Button>
  );
}
