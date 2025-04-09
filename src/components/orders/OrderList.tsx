
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order } from '@/types';
import { OrderCard } from './OrderCard';
import { mockDataService } from '@/services/mockData';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

interface OrderListProps {
  sortBy: string;
}

export const OrderList = ({ sortBy }: OrderListProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();
  
  const loadOrders = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      let newOrders = mockDataService.getOrders();
      sortOrders(newOrders, sortBy);
      setOrders(newOrders);
      setIsLoading(false);
    }, 1000);
  };
  
  const sortOrders = (ordersList: Order[], sortOption: string) => {
    switch (sortOption) {
      case 'highestPay':
        return ordersList.sort((a, b) => b.pay - a.pay);
      case 'lowestPay':
        return ordersList.sort((a, b) => a.pay - b.pay);
      case 'shortestDistance':
        return ordersList.sort((a, b) => a.distance - b.distance);
      case 'shortestTime':
        return ordersList.sort((a, b) => a.estimatedTime - b.estimatedTime);
      default:
        return ordersList;
    }
  };
  
  const refreshOrders = () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      let newOrders = mockDataService.getOrders();
      sortOrders(newOrders, sortBy);
      setOrders(newOrders);
      setIsRefreshing(false);
    }, 1000);
  };
  
  const handleAcceptOrder = (acceptedOrder: Order) => {
    navigate(`/order/${acceptedOrder.id}`);
  };
  
  const handleViewDetails = (order: Order) => {
    navigate(`/order/${order.id}`);
  };
  
  // Effect for initial load
  useEffect(() => {
    loadOrders();
    
    // Simulate new orders coming in
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new order
        const newOrders = mockDataService.getMoreOrders().slice(0, 1);
        if (newOrders.length > 0) {
          toast("New order available!", {
            description: `₹${newOrders[0].pay} - ${newOrders[0].distance}km`,
            action: {
              label: "View",
              onClick: () => navigate(`/order/${newOrders[0].id}`),
            },
          });
        }
        setOrders(prevOrders => {
          const updatedOrders = [...newOrders, ...prevOrders.slice(0, 9)];
          return sortOrders(updatedOrders, sortBy);
        });
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Effect for sorting when sortBy changes
  useEffect(() => {
    if (!isLoading && orders.length > 0) {
      setOrders(prevOrders => {
        const newOrders = [...prevOrders];
        return sortOrders(newOrders, sortBy);
      });
    }
  }, [sortBy]);
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div 
            key={index} 
            className="order-card animate-pulse-light"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="h-5 w-20 bg-gray-200 rounded"></div>
              <div className="h-5 w-12 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="h-4 w-16 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="h-4 w-16 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded"></div>
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
          <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
      </div>
      
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No orders available right now</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={refreshOrders}
            >
              Check Again
            </Button>
          </div>
        ) : (
          orders.map(order => (
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
