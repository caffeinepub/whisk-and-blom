import { Outlet, Link, useNavigate } from '@tanstack/react-router';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartIcon from './CartIcon';

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/assets/generated/logo.dim_400x400.png" 
              alt="Whisk and Bloom" 
              className="h-10 w-10 rounded-full"
            />
            <span className="font-display text-2xl font-semibold text-foreground">
              Whisk & Bloom
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link 
              to="/" 
              className="transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="transition-colors hover:text-primary"
            >
              Products
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <CartIcon />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-muted/30">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/assets/generated/logo.dim_400x400.png" 
                  alt="Whisk and Bloom" 
                  className="h-8 w-8 rounded-full"
                />
                <span className="font-display text-xl font-semibold">Whisk & Bloom</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Natural food colours crafted from botanical sources. Bringing vibrant, safe colours to your culinary creations.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-muted-foreground hover:text-primary transition-colors">
                    Cart
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Our Promise</h3>
              <p className="text-sm text-muted-foreground">
                100% natural ingredients, sustainably sourced, and crafted with care for your health and the planet.
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Whisk & Bloom. Built with <Heart className="inline h-4 w-4 text-primary" /> using{' '}
              <a 
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'whisk-and-bloom')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
