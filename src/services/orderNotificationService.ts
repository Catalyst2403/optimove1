import { Order } from '@/types';

type OrderNotificationListener = (order: Order) => void;

class OrderNotificationService {
  private listeners: OrderNotificationListener[] = [];
  private notificationInterval: NodeJS.Timeout | null = null;
  private isPaused: boolean = false;

  subscribe(listener: OrderNotificationListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  emit(order: Order) {
    if (!this.isPaused) {
      this.listeners.forEach(listener => listener(order));
    }
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  pauseForDuration(durationMs: number) {
    this.pause();
    setTimeout(() => this.resume(), durationMs);
  }

  startRandomNotifications(getRandomOrder: () => Order) {
    this.stopRandomNotifications();
    
    const scheduleNextNotification = () => {
      // Random interval between 10-15 seconds
      const delay = Math.floor(Math.random() * 5000) + 10000;
      
      this.notificationInterval = setTimeout(() => {
        const order = getRandomOrder();
        this.emit(order);
        scheduleNextNotification();
      }, delay);
    };

    scheduleNextNotification();
  }

  stopRandomNotifications() {
    if (this.notificationInterval) {
      clearTimeout(this.notificationInterval);
      this.notificationInterval = null;
    }
  }
}

export const orderNotificationService = new OrderNotificationService();
