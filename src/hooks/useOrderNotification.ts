import { useState, useEffect, useCallback } from 'react';
import { Order } from '@/types';
import { NotificationState } from '@/types/notifications';
import { orderNotificationService } from '@/services/orderNotificationService';

const AUTO_DISMISS_DURATION = 15000; // 15 seconds

export const useOrderNotification = () => {
  const [state, setState] = useState<NotificationState>({
    currentNotification: null,
    notificationQueue: [],
    isVisible: false,
  });

  const [autoCloseTimer, setAutoCloseTimer] = useState<NodeJS.Timeout | null>(null);

  const showNextNotification = useCallback(() => {
    setState(prev => {
      if (prev.notificationQueue.length === 0) {
        return { ...prev, currentNotification: null, isVisible: false };
      }

      const [nextOrder, ...remainingQueue] = prev.notificationQueue;
      return {
        currentNotification: nextOrder,
        notificationQueue: remainingQueue,
        isVisible: true,
      };
    });
  }, []);

  const addToQueue = useCallback((order: Order) => {
    setState(prev => {
      const newQueue = [...prev.notificationQueue, order];
      
      // If no notification is currently showing, show this one immediately
      if (!prev.isVisible) {
        return {
          currentNotification: order,
          notificationQueue: [],
          isVisible: true,
        };
      }
      
      return {
        ...prev,
        notificationQueue: newQueue,
      };
    });
  }, []);

  const handleAccept = useCallback((order: Order) => {
    if (autoCloseTimer) clearTimeout(autoCloseTimer);
    setState(prev => ({ ...prev, isVisible: false }));
    
    // Show next notification after a brief delay
    setTimeout(() => {
      showNextNotification();
    }, 300);
    
    return order;
  }, [autoCloseTimer, showNextNotification]);

  const handleReject = useCallback(() => {
    if (autoCloseTimer) clearTimeout(autoCloseTimer);
    setState(prev => ({ ...prev, isVisible: false }));
    
    setTimeout(() => {
      showNextNotification();
    }, 300);
  }, [autoCloseTimer, showNextNotification]);

  const handleTimeout = useCallback(() => {
    setState(prev => ({ ...prev, isVisible: false }));
    
    setTimeout(() => {
      showNextNotification();
    }, 300);
  }, [showNextNotification]);

  // Auto-dismiss timer
  useEffect(() => {
    if (state.isVisible && state.currentNotification) {
      const timer = setTimeout(() => {
        handleTimeout();
      }, AUTO_DISMISS_DURATION);
      
      setAutoCloseTimer(timer);
      
      return () => clearTimeout(timer);
    }
  }, [state.isVisible, state.currentNotification, handleTimeout]);

  // Subscribe to new orders
  useEffect(() => {
    const unsubscribe = orderNotificationService.subscribe(addToQueue);
    return unsubscribe;
  }, [addToQueue]);

  return {
    currentNotification: state.currentNotification,
    isVisible: state.isVisible,
    handleAccept,
    handleReject,
  };
};
