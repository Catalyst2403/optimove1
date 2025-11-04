import { useState, useEffect, useMemo } from 'react';
import { Order } from '@/types';
import { OrderCard } from './OrderCard';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOrderNotification } from '@/hooks/useOrderNotification';
import { useOrders } from '@/contexts/OrderContext';

interface OrderListProps {
  sortBy: string;
}

export const OrderList = ({ sortBy }: OrderListProps) => {
  const { orders } = useOrders();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();
  const { handleAccept } = useOrderNotification();
  
  // Sort orders using useMemo for performance
  const sortedOrders = useMemo(() => {
    const sorted = [...orders];
    switch (sortBy) {
      case 'highestPay':
        return sorted.sort((a, b) => b.pay - a.pay);
      case 'lowestPay':
        return sorted.sort((a, b) => a.pay - b.pay);
      case 'shortestDistance':
        return sorted.sort((a, b) => a.distance - b.distance);
      case 'shortestTime':
        return sorted.sort((a, b) => a.estimatedTime - b.estimatedTime);
      default:
        return sorted;
    }
  }, [orders, sortBy]);

  // Load initial empty orders
  const loadOrders = async () => {
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    setIsLoading(false);
  };

  // Refresh orders
  const refreshOrders = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsRefreshing(false);
  };
  
  // Initial load
  useEffect(() => {
    loadOrders();
  }, []);

  // Handle accepted orders from notifications
  const handleAcceptOrder = (acceptedOrder: Order) => {
    const accepted = handleAccept(acceptedOrder);
    if (accepted) {
      // Order is already in the list, just navigate
      navigate(`/order/${accepted.id}`);
    }
  };
  
  const handleViewDetails = (order: Order) => {
    navigate(`/order/${order.id}`);
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div 
            key={index} 
            className="order-card animate-pulse"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="h-5 w-20 bg-muted rounded"></div>
              <div className="h-5 w-12 bg-muted rounded"></div>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 bg-muted rounded-full"></div>
                <div>
                  <div className="h-4 w-16 bg-muted rounded mb-1"></div>
                  <div className="h-4 w-32 bg-muted rounded"></div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 bg-muted rounded-full"></div>
                <div>
                  <div className="h-4 w-16 bg-muted rounded mb-1"></div>
                  <div className="h-4 w-32 bg-muted rounded"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="h-4 w-16 bg-muted rounded"></div>
              <div className="h-4 w-16 bg-muted rounded"></div>
            </div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Available Orders</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={refreshOrders}
          disabled={isRefreshing}
          className="flex items-center gap-1"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
      </div>
      
      <div className="space-y-4">
        {sortedOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Waiting for new orders...
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              New orders will appear here and disappear after 1 minute
            </p>
          </div>
        ) : (
          sortedOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onAccept={handleAcceptOrder}
              onViewDetails={handleViewDetails}
            />
          ))
        )}
      </div>
    </div>
  );
};
