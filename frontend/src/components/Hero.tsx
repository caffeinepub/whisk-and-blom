import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { Sparkles } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(/assets/generated/hero-background.dim_1920x1080.png)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>100% Natural & Plant-Based</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Nature's Palette for Your Kitchen
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
            Discover vibrant, natural food colours extracted from botanical sources. 
            Safe, sustainable, and stunning for all your culinary creations.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="text-base"
              onClick={() => navigate({ to: '/products' })}
            >
              Explore Products
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-base"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
