
export type DeliveryApp = 'swiggy' | 'zomato' | 'eatsure';

export interface Order {
  id: string;
  app: DeliveryApp;
  pickupLocation: string;
  dropLocation: string;
  distance: number; // in km
  pay: number; // in currency
  estimatedTime: number; // in minutes
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  mobile: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface EarningRecord {
  id: string;
  date: Date;
  amount: number;
  app: DeliveryApp;
  orderId: string;
}

export interface DailyEarning {
  date: string;
  amount: number;
  breakdown: {
    [key in DeliveryApp]?: number;
  };
}

export interface WeeklyEarning {
  week: string;
  amount: number;
  breakdown: {
    [key in DeliveryApp]?: number;
  };
}
