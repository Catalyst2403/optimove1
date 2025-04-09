
import { useState } from 'react';
import { Clock, Navigation2, MapPin } from 'lucide-react';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface OrderCardProps {
  order: Order;
  onAccept: (order: Order) => void;
}

export const OrderCard = ({ order, onAccept }: OrderCardProps) => {
  const [isAccepting, setIsAccepting] = useState(false);
  
  const handleAccept = () => {
    setIsAccepting(true);
    
    // Simulate a delay before redirection
    setTimeout(() => {
      onAccept(order);
      setIsAccepting(false);
      toast.success(`Order accepted! Redirecting to ${order.app.charAt(0).toUpperCase() + order.app.slice(1)}`);
    }, 1000);
  };
  
  const getAppBadgeClass = (app: string): string => {
    switch (app) {
      case 'swiggy':
        return 'app-badge-swiggy';
      case 'zomato':
        return 'app-badge-zomato';
      case 'eatsure':
        return 'app-badge-eatsure';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className={`order-card ${order.pay > 100 ? 'order-card-highlight' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <Badge variant="outline" className={`app-badge ${getAppBadgeClass(order.app)}`}>
          {order.app.charAt(0).toUpperCase() + order.app.slice(1)}
        </Badge>
        <span className="text-lg font-bold text-green-600">₹{order.pay}</span>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Pickup</p>
            <p className="text-sm text-muted-foreground">{order.pickupLocation}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Drop-off</p>
            <p className="text-sm text-muted-foreground">{order.dropLocation}</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-1 text-sm">
          <Navigation2 className="h-4 w-4 text-gray-500" />
          <span>{order.distance} km</span>
        </div>
        
        <div className="flex items-center gap-1 text-sm">
          <Clock className="h-4 w-4 text-gray-500" />
          <span>{order.estimatedTime} mins</span>
        </div>
      </div>
      
      <Button 
        className="w-full"
        onClick={handleAccept}
        disabled={isAccepting}
      >
        {isAccepting ? 'Accepting...' : 'Accept Order'}
      </Button>
    </div>
  );
};
