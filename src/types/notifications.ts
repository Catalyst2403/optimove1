import { Order } from './index';

export interface OrderNotification {
  order: Order;
  timestamp: Date;
}

export type NotificationAction = 'accept' | 'reject' | 'timeout';

export interface NotificationState {
  currentNotification: Order | null;
  notificationQueue: Order[];
  isVisible: boolean;
}
