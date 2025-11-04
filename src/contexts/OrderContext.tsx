import { createContext, useContext, useState, useCallback, useRef, ReactNode, useEffect } from 'react';
import { Order } from '@/types';
import { orderNotificationService } from '@/services/orderNotificationService';
import { mockDataService } from '@/services/mockData';

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  removeOrder: (orderId: string) => void;
  clearOrders: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const orderTimersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const hasInitializedRef = useRef(false);

  const addOrder = useCallback((order: Order) => {
    setOrders(prev => {
      // Check if order already exists
      const exists = prev.some(o => o.id === order.id);
      if (exists) return prev;

      return [order, ...prev];
    });

    // Auto-remove after 1 minute
    const timer = setTimeout(() => {
      removeOrder(order.id);
    }, 60000);

    orderTimersRef.current.set(order.id, timer);
  }, []);

  const removeOrder = useCallback((orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));

    // Clear timer if exists
    const timer = orderTimersRef.current.get(orderId);
    if (timer) {
      clearTimeout(timer);
      orderTimersRef.current.delete(orderId);
    }
  }, []);

  const clearOrders = useCallback(() => {
    setOrders([]);

    // Clear all timers
    orderTimersRef.current.forEach(timer => clearTimeout(timer));
    orderTimersRef.current.clear();
  }, []);

  // Initialize notification service once
  useEffect(() => {
    if (!hasInitializedRef.current) {
      // Subscribe to new order notifications
      const unsubscribe = orderNotificationService.subscribe(addOrder);

      // Start random notifications
      orderNotificationService.startRandomNotifications(() => {
        const moreOrders = mockDataService.getMoreOrders();
        return moreOrders[Math.floor(Math.random() * moreOrders.length)];
      });

      hasInitializedRef.current = true;

      return () => {
        unsubscribe();
        orderNotificationService.stopRandomNotifications();
      };
    }
  }, [addOrder]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      orderTimersRef.current.forEach(timer => clearTimeout(timer));
      orderTimersRef.current.clear();
    };
  }, []);

  const value: OrderContextType = {
    orders,
    addOrder,
    removeOrder,
    clearOrders,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
