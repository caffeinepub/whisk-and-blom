import { useState } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { useCart } from '../hooks/useCart';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ShippingForm from '../components/ShippingForm';
import OrderSummary from '../components/OrderSummary';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { data: cartItems } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    navigate({ to: '/order-confirmation' });
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => navigate({ to: '/products' })}>
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/cart' })}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Button>
        <h1 className="font-display text-4xl font-bold">Checkout</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl p-6 border">
            <h2 className="font-semibold text-xl mb-6">Shipping Information</h2>
            <ShippingForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-muted/30 rounded-xl p-6 sticky top-24">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
