import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmation() {
  return (
    <div className="container py-24">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-secondary/20">
          <CheckCircle className="h-12 w-12 text-secondary" />
        </div>
        
        <div className="space-y-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Order Confirmed!
          </h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your order. We're preparing your natural food colours 
            and will ship them to you soon.
          </p>
        </div>

        <div className="bg-muted/30 rounded-xl p-8 space-y-4">
          <h2 className="font-semibold text-xl">What's Next?</h2>
          <p className="text-muted-foreground">
            You'll receive a confirmation email with your order details and tracking 
            information once your package ships. Our natural food colours are carefully 
            packaged to ensure they arrive in perfect condition.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
