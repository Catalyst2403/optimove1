
// Update this file to fix the missing timestamp in Order objects and add getEarnings method

import { Order, DailyEarning, WeeklyEarning } from '@/types';

class MockDataService {
  private orders: Order[] = [
    {
      id: '1',
      app: 'swiggy',
      pickupLocation: 'B 22/3 Govind Marg – Jaipur Cafe',
      dropLocation: 'H-15, Shastri Nagar',
      distance: 5.2,
      estimatedTime: 25,
      pay: 55,
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 30) // 30 mins ago
    },
    {
      id: '2',
      app: 'zomato',
      pickupLocation: '98-99, Johari Bazar Rd, Bapu Bazar – Laxmi Misthan Bhandar',
      dropLocation: 'Flat 204, Tower B, Krishna Vihar',
      distance: 3.8,
      estimatedTime: 18,
      pay: 42,
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 45) // 45 mins ago
    },
    {
      id: '3',
      app: 'eatsure',
      pickupLocation: 'Kanota Bagh, Narayan Singh Rd, Rambagh – Bar Palladio',
      dropLocation: 'House No 8, Lal Kothi',
      distance: 7.6,
      estimatedTime: 32,
      pay: 78,
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 60) // 1 hour ago
    },
    {
      id: '4',
      app: 'swiggy',
      pickupLocation: 'Jacob Rd, Civil Lines – Spice Court',
      dropLocation: '12 C, Vaishali Nagar',
      distance: 2.5,
      estimatedTime: 15,
      pay: 38,
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 90) // 1.5 hours ago
    },
    {
      id: '5',
      app: 'zomato',
      pickupLocation: 'B9, Station Rd, Sindhi Camp – Rawat Misthan Bhandar',
      dropLocation: '45, Sector 9, Pratap Nagar',
      distance: 4.3,
      estimatedTime: 22,
      pay: 52,
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 110) // 1.8 hours ago
    }
  ];
  
  private moreOrders: Order[] = [
    {
      id: '6',
      app: 'swiggy',
      pickupLocation: 'Palace Road, ITC Rajputana – Peshawri',
      dropLocation: 'C-11, Mansarovar',
      distance: 3.1,
      estimatedTime: 17,
      pay: 45,
      timestamp: new Date(new Date().getTime())
    },
    {
      id: '7',
      app: 'zomato',
      pickupLocation: 'Ajmer Road, near Vidhayakpuri – Kalyan Restaurant',
      dropLocation: 'House No 27, Jagatpura Extension',
      distance: 6.4,
      estimatedTime: 28,
      pay: 67,
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 5) // 5 mins ago
    },
    {
      id: '8',
      app: 'eatsure',
      pickupLocation: '12 Miles, Tonk Road via Vatika – Chokhi Dhani',
      dropLocation: 'Villa 5, Swarn Path, Vaishali Nagar',
      distance: 8.2,
      estimatedTime: 34,
      pay: 76,
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 10) // 10 mins ago
    },
    {
      id: '9',
      app: 'swiggy',
      pickupLocation: '200-Feet Road Restaurant',
      dropLocation: 'Flat 503, Ocean Complex, Malviya Nagar',
      distance: 5.8,
      estimatedTime: 25,
      pay: 60,
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 15) // 15 mins ago
    },
    {
      id: '10',
      app: 'zomato',
      pickupLocation: 'Restaurant near JLN Marg, MI Road',
      dropLocation: '9 D, Jhalana Institutional Area',
      distance: 9.4,
      estimatedTime: 40,
      pay: 80,
      timestamp: new Date(new Date().getTime() - 1000 * 60 * 25) // 25 mins ago
    }
  ];

  // Prepare daily earnings data
  private dailyEarnings: DailyEarning[] = [
    {
      date: new Date(new Date().setHours(0, 0, 0, 0)).toISOString().split('T')[0],
      amount: 290,
      breakdown: {
        swiggy: 130,
        zomato: 110,
        eatsure: 50
      }
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0],
      amount: 320,
      breakdown: {
        swiggy: 145,
        zomato: 125,
        eatsure: 50
      }
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0],
      amount: 280,
      breakdown: {
        swiggy: 120,
        zomato: 100,
        eatsure: 60
      }
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString().split('T')[0],
      amount: 350,
      breakdown: {
        swiggy: 160,
        zomato: 130,
        eatsure: 60
      }
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString().split('T')[0],
      amount: 310,
      breakdown: {
        swiggy: 140,
        zomato: 120,
        eatsure: 50
      }
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0],
      amount: 270,
      breakdown: {
        swiggy: 130,
        zomato: 90,
        eatsure: 50
      }
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString().split('T')[0],
      amount: 330,
      breakdown: {
        swiggy: 150,
        zomato: 120,
        eatsure: 60
      }
    }
  ];

  // Prepare weekly earnings data
  private weeklyEarnings: WeeklyEarning[] = [
    {
      week: `Week ${new Date().getMonth() + 1}-${Math.ceil(new Date().getDate() / 7)}`,
      amount: 2150,
      breakdown: {
        swiggy: 975,
        zomato: 795,
        eatsure: 380
      }
    },
    {
      week: `Week ${new Date().getMonth() + 1}-${Math.ceil(new Date().getDate() / 7) - 1}`,
      amount: 1950,
      breakdown: {
        swiggy: 890,
        zomato: 710,
        eatsure: 350
      }
    }
  ];

  // Generate sample earnings records
  private earningsRecords = [
    {
      id: 'e1',
      date: new Date(new Date().getTime() - 1000 * 60 * 60 * 3),
      amount: 78,
      app: 'swiggy',
      orderId: '3'
    },
    {
      id: 'e2',
      date: new Date(new Date().getTime() - 1000 * 60 * 60 * 6),
      amount: 55,
      app: 'zomato',
      orderId: '1'
    },
    {
      id: 'e3',
      date: new Date(new Date().getTime() - 1000 * 60 * 60 * 7),
      amount: 42,
      app: 'eatsure',
      orderId: '2'
    },
    {
      id: 'e4',
      date: new Date(new Date().getTime() - 1000 * 60 * 60 * 8),
      amount: 65,
      app: 'swiggy',
      orderId: '4'
    },
    {
      id: 'e5',
      date: new Date(new Date().getTime() - 1000 * 60 * 60 * 10),
      amount: 50,
      app: 'zomato',
      orderId: '5'
    }
  ];

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
    return {
      daily: this.dailyEarnings,
      weekly: this.weeklyEarnings,
      records: this.earningsRecords,
      total: 3250,
      todayAmount: 290,
      weekAmount: 2150
    };
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
