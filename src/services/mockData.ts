
import { DeliveryApp, Order, EarningRecord, DailyEarning, WeeklyEarning } from '../types';

// Helper to generate random orders
const generateRandomOrders = (count: number): Order[] => {
  const apps: DeliveryApp[] = ['swiggy', 'zomato', 'eatsure'];
  const locations = [
    { pickup: 'Food Plaza Mall', drop: 'Green Meadows Apartments' },
    { pickup: 'Spice Garden Restaurant', drop: 'Riverside Villa' },
    { pickup: 'Urban Bites Cafe', drop: 'Sunshine Heights' },
    { pickup: 'Royal Dragon Chinese', drop: 'Tech Park Office' },
    { pickup: 'Tandoori Junction', drop: 'Blue Ocean Resort' },
    { pickup: 'Pizza Paradise', drop: 'Golden Gate Society' },
    { pickup: 'McBurger Joint', drop: 'Silver Springs Complex' },
    { pickup: 'Healthy Bowls', drop: 'Emerald Towers' }
  ];
  
  const orders: Order[] = [];
  
  for (let i = 0; i < count; i++) {
    const location = locations[Math.floor(Math.random() * locations.length)];
    const app = apps[Math.floor(Math.random() * apps.length)];
    const distance = +(Math.random() * 8 + 1).toFixed(1);
    const pay = Math.floor(Math.random() * 150 + 50);
    const estimatedTime = Math.floor(distance * 5 + 10);
    
    orders.push({
      id: `order-${Date.now()}-${i}`,
      app,
      pickupLocation: location.pickup,
      dropLocation: location.drop,
      distance,
      pay,
      estimatedTime,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 60000))
    });
  }
  
  // Sort by highest pay first
  return orders.sort((a, b) => b.pay - a.pay);
};

// Generate mock earnings data for the past 7 days
const generateMockEarnings = (): {
  records: EarningRecord[],
  daily: DailyEarning[],
  weekly: WeeklyEarning[]
} => {
  const apps: DeliveryApp[] = ['swiggy', 'zomato', 'eatsure'];
  const records: EarningRecord[] = [];
  const daily: Record<string, DailyEarning> = {};
  
  // Generate for past 7 days
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    // Generate 5-15 orders per day
    const ordersPerDay = Math.floor(Math.random() * 10 + 5);
    
    for (let j = 0; j < ordersPerDay; j++) {
      const app = apps[Math.floor(Math.random() * apps.length)];
      const amount = Math.floor(Math.random() * 150 + 50);
      
      const record: EarningRecord = {
        id: `earning-${date.getTime()}-${j}`,
        date: new Date(date),
        amount,
        app,
        orderId: `order-${date.getTime()}-${j}`
      };
      
      records.push(record);
      
      // Add to daily summary
      if (!daily[dateString]) {
        daily[dateString] = {
          date: dateString,
          amount: 0,
          breakdown: {}
        };
      }
      
      daily[dateString].amount += amount;
      daily[dateString].breakdown[app] = (daily[dateString].breakdown[app] || 0) + amount;
    }
  }
  
  // Create weekly summary
  const currentDate = new Date();
  const weekStart = new Date(currentDate);
  weekStart.setDate(currentDate.getDate() - currentDate.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  
  const weekString = `${weekStart.toISOString().split('T')[0]} to ${weekEnd.toISOString().split('T')[0]}`;
  
  const weekly: WeeklyEarning = {
    week: weekString,
    amount: records.reduce((sum, record) => sum + record.amount, 0),
    breakdown: records.reduce((breakdown, record) => {
      breakdown[record.app] = (breakdown[record.app] || 0) + record.amount;
      return breakdown;
    }, {} as Record<DeliveryApp, number>)
  };
  
  return {
    records,
    daily: Object.values(daily).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    weekly: [weekly]
  };
};

// Data service
export const mockDataService = {
  getOrders: () => generateRandomOrders(10),
  getMoreOrders: () => generateRandomOrders(5),
  getEarnings: () => generateMockEarnings()
};
