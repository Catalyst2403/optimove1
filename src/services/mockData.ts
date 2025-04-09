
import { Order } from '@/types';

class MockDataService {
  private orders: Order[] = [
    {
      id: '1',
      app: 'swiggy',
      pickupLocation: 'Bikaneri Restaurant, Bodakdev',
      dropLocation: 'Parivar Society, Near ISKON Temple',
      distance: 3.2,
      estimatedTime: 18,
      pay: 35,
    },
    {
      id: '2',
      app: 'zomato',
      pickupLocation: 'The Belgian Waffle, CG Road',
      dropLocation: 'Indraprasth Tower, C.G. Road',
      distance: 2.1,
      estimatedTime: 12,
      pay: 45,
    },
    {
      id: '3',
      app: 'eatsure',
      pickupLocation: 'Hotel Havmor, Navrangpura',
      dropLocation: 'Sarthak Complex, Satellite',
      distance: 4.5,
      estimatedTime: 25,
      pay: 75,
    },
    {
      id: '4',
      app: 'swiggy',
      pickupLocation: 'Pizza Hut, Vastrapur',
      dropLocation: 'Prernatirth Derasar, Jodhpur',
      distance: 2.8,
      estimatedTime: 16,
      pay: 30,
    },
    {
      id: '5',
      app: 'zomato',
      pickupLocation: 'Domino\'s Pizza, Satellite',
      dropLocation: 'Indraprasth Greens, Prahlad Nagar',
      distance: 3.7,
      estimatedTime: 20,
      pay: 50,
    },
  ];
  
  private moreOrders: Order[] = [
    {
      id: '6',
      app: 'swiggy',
      pickupLocation: 'Honest Restaurant, Ashram Road',
      dropLocation: 'Ratnam Shopping Mall, C.G. Road',
      distance: 2.4,
      estimatedTime: 14,
      pay: 40,
    },
    {
      id: '7',
      app: 'zomato',
      pickupLocation: 'McDonald\'s, SG Highway',
      dropLocation: 'Acropolis Mall, Thaltej',
      distance: 1.8,
      estimatedTime: 10,
      pay: 25,
    },
    {
      id: '8',
      app: 'eatsure',
      pickupLocation: 'La Pino\'z Pizza, Navrangpura',
      dropLocation: 'Parimal Garden, Ellis Bridge',
      distance: 5.1,
      estimatedTime: 28,
      pay: 80,
    },
    {
      id: '9',
      app: 'swiggy',
      pickupLocation: 'Subway, Law Garden',
      dropLocation: 'Jodhpur Cross Roads, Satellite',
      distance: 3.5,
      estimatedTime: 19,
      pay: 45,
    },
    {
      id: '10',
      app: 'zomato',
      pickupLocation: 'The Grand Thakar, Sola',
      dropLocation: 'Alpha One Mall, Vastrapur',
      distance: 2.3,
      estimatedTime: 13,
      pay: 30,
    },
  ];
  
  // Mocked coordinates for demo
  private coordinates: Record<string, { lat: number; lng: number }> = {
    'Bikaneri Restaurant, Bodakdev': { lat: 23.0325, lng: 72.5114 },
    'Parivar Society, Near ISKON Temple': { lat: 23.0525, lng: 72.5314 },
    'The Belgian Waffle, CG Road': { lat: 23.0285, lng: 72.5464 },
    'Indraprasth Tower, C.G. Road': { lat: 23.0405, lng: 72.5504 },
    'Hotel Havmor, Navrangpura': { lat: 23.0345, lng: 72.5564 },
    'Sarthak Complex, Satellite': { lat: 23.0165, lng: 72.5164 },
    'Pizza Hut, Vastrapur': { lat: 23.0395, lng: 72.5294 },
    'Prernatirth Derasar, Jodhpur': { lat: 23.0105, lng: 72.5114 },
    'Domino\'s Pizza, Satellite': { lat: 23.0155, lng: 72.5194 },
    'Indraprasth Greens, Prahlad Nagar': { lat: 23.0175, lng: 72.5084 },
    'Honest Restaurant, Ashram Road': { lat: 23.0445, lng: 72.5704 },
    'Ratnam Shopping Mall, C.G. Road': { lat: 23.0365, lng: 72.5534 },
    'McDonald\'s, SG Highway': { lat: 23.0455, lng: 72.5014 },
    'Acropolis Mall, Thaltej': { lat: 23.0475, lng: 72.5074 },
    'La Pino\'z Pizza, Navrangpura': { lat: 23.0395, lng: 72.5594 },
    'Parimal Garden, Ellis Bridge': { lat: 23.0245, lng: 72.5594 },
    'Subway, Law Garden': { lat: 23.0265, lng: 72.5604 },
    'Jodhpur Cross Roads, Satellite': { lat: 23.0105, lng: 72.5214 },
    'The Grand Thakar, Sola': { lat: 23.0595, lng: 72.5074 },
    'Alpha One Mall, Vastrapur': { lat: 23.0375, lng: 72.5214 },
  };
  
  getOrders(): Order[] {
    return [...this.orders];
  }
  
  getMoreOrders(): Order[] {
    return [...this.moreOrders];
  }
  
  getOrderById(id: string): Order | null {
    const allOrders = [...this.orders, ...this.moreOrders];
    return allOrders.find(order => order.id === id) || null;
  }
  
  getCoordinatesFromAddress(address: string): { lat: number; lng: number } {
    // In a real app, you would use a geocoding service
    return this.coordinates[address] || { lat: 23.0225, lng: 72.5714 }; // Default to center of Ahmedabad
  }
}

export const mockDataService = new MockDataService();
