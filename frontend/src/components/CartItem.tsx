import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import QuantitySelector from './QuantitySelector';
import type { CartItem as CartItemType } from '../backend';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: bigint, quantity: number) => void;
  onRemove: (productId: bigint) => void;
}

const productImageMap: Record<string, string> = {
  'red.png': '/assets/generated/product-red.dim_800x800.png',
  'yellow.png': '/assets/generated/product-yellow.dim_800x800.png',
  'blue.png': '/assets/generated/product-blue.dim_800x800.png',
  'green.png': '/assets/generated/product-green.dim_800x800.png',
};

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const imageUrl = productImageMap[item.product.imageUrl] || '/assets/generated/product-red.dim_800x800.png';
  const subtotal = Number(item.product.price) * Number(item.quantity);

  return (
    <div className="flex gap-4 py-4 border-b">
      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        <img
          src={imageUrl}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg">{item.product.name}</h3>
          <p className="text-sm text-muted-foreground">{item.product.description}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <QuantitySelector
            value={Number(item.quantity)}
            onChange={(newQuantity) => onUpdateQuantity(item.product.id, newQuantity)}
          />
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">${subtotal}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(item.product.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
