import { useState, useEffect } from 'react';
import { Order } from '@/types';
import { OrderCard } from './OrderCard';
import { mockDataService } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOrderNotification } from '@/hooks/useOrderNotification';
import { orderNotificationService } from '@/services/orderNotificationService';

interface OrderListProps {
  sortBy: string;
}

export const OrderList = ({ sortBy }: OrderListProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();
  const { handleAccept } = useOrderNotification();
  
  // Sort orders helper
  const sortOrders = (ordersList: Order[], sortOption: string) => {
    const sorted = [...ordersList];
    switch (sortOption) {
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
  };
  
  // Load initial empty orders
  const loadOrders = async () => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setOrders([]);
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
    
    // Start random notifications
    orderNotificationService.startRandomNotifications(() => {
      const moreOrders = mockDataService.getMoreOrders();
      return moreOrders[Math.floor(Math.random() * moreOrders.length)];
    });
    
    return () => {
      orderNotificationService.stopRandomNotifications();
    };
  }, []);
  
  // Handle accepted orders from notifications
  const handleAcceptOrder = (acceptedOrder: Order) => {
    const accepted = handleAccept(acceptedOrder);
    if (accepted) {
      setOrders(prev => {
        const sorted = sortOrders([accepted, ...prev], sortBy);
        return sorted;
      });
      navigate(`/order/${accepted.id}`);
    }
  };
  
  // Re-sort when sortBy changes
  useEffect(() => {
    if (!isLoading && orders.length > 0) {
      setOrders(prev => sortOrders(prev, sortBy));
    }
  }, [sortBy, isLoading]);
  
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
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Waiting for new orders...
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              New orders will appear as notifications
            </p>
          </div>
        ) : (
          orders.map((order) => (
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
