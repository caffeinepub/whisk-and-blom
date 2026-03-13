import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ShippingFormData {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface ShippingFormProps {
  onSubmit: (data: ShippingFormData) => void;
  isSubmitting?: boolean;
}

export default function ShippingForm({ onSubmit, isSubmitting }: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingFormData>({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof ShippingFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={handleChange('name')}
            required
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <Label htmlFor="address">Street Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={handleChange('address')}
            required
            placeholder="123 Main Street"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={handleChange('city')}
              required
              placeholder="New York"
            />
          </div>
          
          <div>
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              value={formData.postalCode}
              onChange={handleChange('postalCode')}
              required
              placeholder="10001"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={formData.country}
            onChange={handleChange('country')}
            required
            placeholder="United States"
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Place Order'}
      </Button>
    </form>
  );
}
