
// Update this file to fix the missing timestamp in Order objects and add getEarnings method

import { Order } from '@/types';

class MockDataService {
  private orders: Order[] = [
    {
      id: '1',
      app: 'swiggy',
      pickupLocation: 'Pizza Hut, Navrangpura',
      dropLocation: 'Silver Heights, Maninagar',
      distance: 5.2,
      estimatedTime: 25,
      pay: 55,
      timestamp: new Date().getTime() - 1000 * 60 * 30 // 30 mins ago
    },
    {
      id: '2',
      app: 'zomato',
      pickupLocation: 'McDonald\'s, CG Road',
      dropLocation: '12 Park Society, Vastrapur',
      distance: 3.8,
      estimatedTime: 18,
      pay: 42,
      timestamp: new Date().getTime() - 1000 * 60 * 45 // 45 mins ago
    },
    {
      id: '3',
      app: 'eatsure',
      pickupLocation: 'Subway, Satellite',
      dropLocation: 'Green Meadows, Bopal',
      distance: 7.6,
      estimatedTime: 32,
      pay: 78,
      timestamp: new Date().getTime() - 1000 * 60 * 60 // 1 hour ago
    },
    {
      id: '4',
      app: 'swiggy',
      pickupLocation: 'KFC, SG Highway',
      dropLocation: 'Westside Apartments, Thaltej',
      distance: 2.5,
      estimatedTime: 15,
      pay: 38,
      timestamp: new Date().getTime() - 1000 * 60 * 90 // 1.5 hours ago
    },
    {
      id: '5',
      app: 'zomato',
      pickupLocation: 'Domino\'s Pizza, Prahladnagar',
      dropLocation: 'Shalin Apartments, Satellite',
      distance: 4.3,
      estimatedTime: 22,
      pay: 52,
      timestamp: new Date().getTime() - 1000 * 60 * 110 // 1.8 hours ago
    }
  ];
  
  private moreOrders: Order[] = [
    {
      id: '6',
      app: 'swiggy',
      pickupLocation: 'Burger King, Vastrapur',
      dropLocation: 'Royal Residency, Gurukul',
      distance: 3.1,
      estimatedTime: 17,
      pay: 45,
      timestamp: new Date().getTime()
    },
    {
      id: '7',
      app: 'zomato',
      pickupLocation: 'Starbucks, Alpha One Mall',
      dropLocation: 'Pramukh Arcade, Kudasan',
      distance: 6.4,
      estimatedTime: 28,
      pay: 67,
      timestamp: new Date().getTime() - 1000 * 60 * 5 // 5 mins ago
    },
    {
      id: '8',
      app: 'eatsure',
      pickupLocation: 'Haldiram\'s, Drive-In Road',
      dropLocation: 'Suryam Sky, Science City Road',
      distance: 8.2,
      estimatedTime: 34,
      pay: 76,
      timestamp: new Date().getTime() - 1000 * 60 * 10 // 10 mins ago
    },
    {
      id: '9',
      app: 'swiggy',
      pickupLocation: 'La Pino\'z Pizza, Navrangpura',
      dropLocation: 'Ratnam Complex, Jodhpur',
      distance: 5.8,
      estimatedTime: 25,
      pay: 60,
      timestamp: new Date().getTime() - 1000 * 60 * 15 // 15 mins ago
    },
    {
      id: '10',
      app: 'zomato',
      pickupLocation: 'Honest Restaurant, Maninagar',
      dropLocation: 'Sun-West Heights, Satellite',
      distance: 9.4,
      estimatedTime: 40,
      pay: 80,
      timestamp: new Date().getTime() - 1000 * 60 * 25 // 25 mins ago
    }
  ];

  // Mock earnings data
  private earnings = {
    total: 3250,
    weekly: 950,
    daily: 550,
    records: [
      {
        id: 'e1',
        date: new Date(new Date().getTime() - 1000 * 60 * 60 * 3),
        amount: 78,
        app: 'swiggy'
      },
      {
        id: 'e2',
        date: new Date(new Date().getTime() - 1000 * 60 * 60 * 6),
        amount: 55,
        app: 'zomato'
      },
      {
        id: 'e3',
        date: new Date(new Date().getTime() - 1000 * 60 * 60 * 7),
        amount: 42,
        app: 'eatsure'
      },
      {
        id: 'e4',
        date: new Date(new Date().getTime() - 1000 * 60 * 60 * 8),
        amount: 65,
        app: 'swiggy'
      },
      {
        id: 'e5',
        date: new Date(new Date().getTime() - 1000 * 60 * 60 * 10),
        amount: 50,
        app: 'zomato'
      },
      {
        id: 'e6',
        date: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1),
        amount: 68,
        app: 'swiggy'
      },
      {
        id: 'e7',
        date: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1.5),
        amount: 75,
        app: 'zomato'
      }
    ]
  };

  getOrders(): Order[] {
    return this.shuffleArray([...this.orders]);
  }
  
  getMoreOrders(): Order[] {
    return this.shuffleArray([...this.moreOrders]);
  }
  
  getOrderById(orderId: string): Order | null {
    const allOrders = [...this.orders, ...this.moreOrders];
    return allOrders.find(order => order.id === orderId) || null;
  }

  getEarnings() {
    return { ...this.earnings };
  }
  
  // Get coordinates for mapping - mock data
  getCoordinatesFromAddress(address: string) {
    // This is a simplified version - in reality, you would use geocoding APIs
    // Just returning mock coordinates for demo
    const hash = this.hashCode(address);
    const lat = 23.0225 + (hash % 10) * 0.01;
    const lng = 72.5714 + (hash % 8) * 0.01;
    
    return {
      lat,
      lng
    };
  }
  
  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
  
  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

export const mockDataService = new MockDataService();
